import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()

    // TODO: Before going live, get the webhook secret from PaymentOptions dashboard
    // and add signature verification here using PAYMENTOPTIONS_WEBHOOK_SECRET

    console.log('[GameSensei Webhook] Event received:', JSON.stringify(payload, null, 2))

    const ref = payload.transaction_details?.merchant_txn_ref
    const txnId = payload.transaction_details?.id
    const success = payload.success === true

    if (ref) {
      if (success) {
        console.log(`[GameSensei Webhook] PAID — order ${ref}, transaction ${txnId}`)
        // TODO: Mark order as paid in your database
      } else {
        console.log(`[GameSensei Webhook] FAILED — order ${ref}, transaction ${txnId}`)
        // TODO: Mark order as failed in your database
      }
    }

    // Always return 200 so PaymentOptions stops retrying
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error('[GameSensei Webhook] Processing error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
