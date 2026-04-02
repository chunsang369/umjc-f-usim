'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Globe, MessageCircle, Menu, X, ChevronDown } from 'lucide-react';
import { locales, type Locale } from '@/i18n/routing';
import styles from './Header.module.css';

const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  zh: '中文',
  vi: 'Tiếng Việt',
};

const localeFlags: Record<Locale, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  zh: '🇨🇳',
  vi: '🇻🇳',
};

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLocale = (pathname.split('/')[1] || 'en') as Locale;

  const switchLocale = (locale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
    setIsLangOpen(false);
  };

  const navLinks = [
    { href: `/${currentLocale}/plans?filter=open`, label: t('plans') },
    { href: `/${currentLocale}/apply`, label: t('apply') },
    { href: `/${currentLocale}/#support`, label: t('support') },
    { href: `/${currentLocale}/#reviews`, label: t('reviews') },
    { href: `/${currentLocale}/#about`, label: t('about') },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <a href={`/${currentLocale}`} className={styles.logo}>
          <span className={styles.logoIcon}>📱</span>
          <span className={styles.logoText}>얼마줄까</span>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          {/* Language Switcher */}
          <div className={styles.langSwitcher}>
            <button
              className={styles.langButton}
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-label="Switch language"
            >
              <Globe size={18} />
              <span>{localeFlags[currentLocale]} {localeNames[currentLocale]}</span>
              <ChevronDown size={14} className={isLangOpen ? styles.rotated : ''} />
            </button>
            {isLangOpen && (
              <div className={styles.langDropdown}>
                {locales.map((locale) => (
                  <button
                    key={locale}
                    className={`${styles.langOption} ${locale === currentLocale ? styles.langActive : ''}`}
                    onClick={() => switchLocale(locale)}
                  >
                    <span>{localeFlags[locale]}</span>
                    <span>{localeNames[locale]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat Button */}
          <button className={styles.chatButton} aria-label={t('chat')}>
            <MessageCircle size={18} />
            <span className={styles.chatLabel}>{t('chat')}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
