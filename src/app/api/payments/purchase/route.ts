import { NextRequest, NextResponse } from 'next/server'

const API_BASE = 'https://api-dev.paymentoptions.com'

function getAuthHeaders() {
  const apiKey = process.env.PAYMENTOPTIONS_API_KEY!
  const encoded = Buffer.from(apiKey).toString('base64')
  return {
    'Authorization': `Basic ${encoded}`,
    'x-api-key': apiKey,
    'Content-Type': 'application/json',
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, cardNumber, expiry, cvv, country, amountUSD } = await req.json()

    if (!name || !email || !cardNumber || !expiry || !cvv || !amountUSD) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const host = req.headers.get('host') ?? 'localhost:3000'
    const protocol = host.startsWith('localhost') ? 'http' : 'https'
    const baseUrl = `${protocol}://${host}`

    // Parse MM/YY → separate month and full year
    const parts = expiry.replace(/\s/g, '').split('/')
    const expiryMonth = parts[0]
    const expiryYearRaw = parts[1] ?? ''
    const expiryYear = expiryYearRaw.length === 2 ? `20${expiryYearRaw}` : expiryYearRaw

    const txnRef = 'GS-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase()

    // Amount in cents (smallest unit) as string — e.g. $68.97 → "6897"
    const amountCents = String(Math.round(amountUSD * 100))

    const payload = {
      merchant_id: process.env.PAYMENTOPTIONS_MERCHANT_ID!,
      merchant_txn_ref: txnRef,
      currency: 'USD',
      amount: amountCents,
      card: {
        cvc: cvv,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        name: name,
        number: cardNumber.replace(/\s/g, ''),
      },
      payment_method: {
        type: 'scheme',
        store_payment_method: false,
      },
      return_url: {
        webhook_url: `${baseUrl}/api/payments/webhook`,
        success_url: `${baseUrl}/payment/success?ref=${txnRef}`,
        decline_url: `${baseUrl}/payment/decline?ref=${txnRef}`,
      },
      billing_address: {
        country: country || 'US',
        email: email,
        phone_number: '0000000000',
        address1: 'N/A',
        city: 'N/A',
        state: 'N/A',
        postal_code: '00000',
      },
    }

    const response = await fetch(
      `${API_BASE}/api/v1/server-to-server-interface/paymentv2`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      }
    )

    const data = await response.json()

    console.log('[GameSensei Purchase] API response:', JSON.stringify(data))

    // 3DS redirect — check BEFORE success since 3DS responses can also have success:true
    if (data.redirect_url) {
      return NextResponse.json({ redirect: data.redirect_url, ref: txnRef })
    }

    // Payment approved (non-3DS frictionless success)
    if (data.success === true) {
      return NextResponse.json({
        success: true,
        ref: txnRef,
        transactionId: data.transaction_details?.id,
      })
    }

    // Declined or error
    const message = data.gateway_response?.message
      || data.message
      || data.error
      || 'Payment declined'

    console.error('[GameSensei Purchase] Declined/error:', JSON.stringify(data))

    return NextResponse.json(
      { success: false, ref: txnRef, message },
      { status: 400 }
    )
  } catch (err) {
    console.error('[GameSensei Purchase] Server error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
