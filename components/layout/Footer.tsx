'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Shield, Phone, Globe, Lock } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const quickLinks = [
    { href: `/${currentLocale}/plans`, label: tNav('plans') },
    { href: `/${currentLocale}/apply`, label: tNav('apply') },
    { href: `/${currentLocale}/support`, label: tNav('support') },
    { href: `/${currentLocale}/reviews`, label: tNav('reviews') },
    { href: `/${currentLocale}/about`, label: tNav('about') },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>📱</span>
              <span className={styles.logoText}>{t('company')}</span>
            </div>
            <p className={styles.desc}>{t('companyDesc')}</p>
            <div className={styles.certifications}>
              <div className={styles.cert}>
                <Shield size={14} />
                <span>통신판매업 등록</span>
              </div>
              <div className={styles.cert}>
                <Lock size={14} />
                <span>SSL 보안</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>{t('links')}</h4>
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>{t('legal')}</h4>
            <a href={`/${currentLocale}/privacy`} className={styles.link}>{t('privacy')}</a>
            <a href={`/${currentLocale}/terms`} className={styles.link}>{t('terms')}</a>
          </div>

          {/* Support Channels */}
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>{tNav('support')}</h4>
            <div className={styles.channels}>
              <div className={styles.channel}>
                <Phone size={14} />
                <span>KakaoTalk</span>
              </div>
              <div className={styles.channel}>
                <Globe size={14} />
                <span>WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
