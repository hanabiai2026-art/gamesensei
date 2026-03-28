'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language';
import { games } from '@/lib/data';
import PaymentMethods from './PaymentMethods';

const DBA = 'GameSensei';

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/gamesensei' },
  { name: 'Facebook', url: 'https://facebook.com/gamesensei' },
  { name: 'X', url: 'https://x.com/gamesensei' },
  { name: 'YouTube', url: 'https://youtube.com/@gamesensei' },
  { name: 'TikTok', url: 'https://tiktok.com/@gamesensei' },
];

export default function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();
  const midpoint = Math.ceil(games.length / 2);
  const gamesCol1 = games.slice(0, midpoint);
  const gamesCol2 = games.slice(midpoint);

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-text-primary font-bold text-sm mb-4">{t.footer.company}</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.aboutUs}</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.contactUs}</Link></li>
              <li><a href="/coming-soon/blog" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.blog}</a></li>
              <li><a href="/coming-soon/careers" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.workWithUs}</a></li>
              <li><a href="/coming-soon/guarantees" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.guarantees}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-text-primary font-bold text-sm mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li><Link href="/policy/terms" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.terms}</Link></li>
              <li><Link href="/policy/privacy" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.privacy}</Link></li>
              <li><Link href="/policy/delivery" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.delivery}</Link></li>
              <li><Link href="/policy/refund" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.refund}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-text-primary font-bold text-sm mb-4">{t.footer.customerService}</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.contactUs}</Link></li>
              <li><Link href="/#how-it-works" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.howItWorks}</Link></li>
              <li><Link href="/faq" className="text-text-secondary hover:text-accent text-sm transition-colors">{t.footer.faq}</Link></li>
            </ul>
          </div>

          {/* Games Column 1 */}
          <div>
            <h3 className="text-text-primary font-bold text-sm mb-4">{t.header.games}</h3>
            <ul className="space-y-2">
              {gamesCol1.map(game => (
                <li key={game.id}>
                  <Link href={`/${game.slug}`} className="text-text-secondary hover:text-accent text-sm transition-colors">
                    {language === 'ja' ? game.nameJa : game.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Games Column 2 */}
          {gamesCol2.length > 0 && (
            <div>
              <h3 className="text-text-primary font-bold text-sm mb-4">&nbsp;</h3>
              <ul className="space-y-2">
                {gamesCol2.map(game => (
                  <li key={game.id}>
                    <Link href={`/${game.slug}`} className="text-text-secondary hover:text-accent text-sm transition-colors">
                      {language === 'ja' ? game.nameJa : game.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent text-sm transition-colors">
                {s.name}
              </a>
            ))}
          </div>
          <PaymentMethods />
        </div>

        {/* Disclaimer + Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-text-muted text-xs mb-2">
            {t.footer.disclaimer.replace('{dba}', DBA)}
          </p>
          <p className="text-text-muted text-xs">
            {t.footer.copyright.replace('{dba}', DBA).replace('{year}', String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}
