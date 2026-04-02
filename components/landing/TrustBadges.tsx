'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck, RotateCcw, Globe, Lock, CreditCard } from 'lucide-react';
import styles from './TrustBadges.module.css';

export default function TrustBadges() {
  const t = useTranslations('trust');

  const badges = [
    { icon: <ShieldCheck size={28} />, label: t('registered'), color: 'primary' },
    { icon: <RotateCcw size={28} />, label: t('refundGuarantee'), color: 'success' },
    { icon: <Globe size={28} />, label: t('multilingual'), color: 'secondary' },
    { icon: <Lock size={28} />, label: t('secure'), color: 'accent' },
    { icon: <CreditCard size={28} />, label: t('directBilling'), color: 'warm' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className="section-title">{t('sectionTitle')}</h2>

        <div className={styles.grid}>
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              className={`${styles.badge} ${styles[badge.color]}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.iconBox}>{badge.icon}</div>
              <span className={styles.label}>{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
