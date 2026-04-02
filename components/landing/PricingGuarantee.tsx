'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageCircle, Smartphone, Wifi, Star } from 'lucide-react';
import styles from './PricingGuarantee.module.css';

export default function PricingGuarantee() {
  const t = useTranslations('guarantee');

  const features = [
    { 
      key: 'feature1', 
      icon: <MessageCircle size={28} strokeWidth={2.5} />, 
      bgClass: styles.iconBg1 
    },
    { 
      key: 'feature2', 
      icon: <Smartphone size={28} strokeWidth={2.5} />, 
      bgClass: styles.iconBg2 
    },
    { 
      key: 'feature3', 
      icon: <Wifi size={28} strokeWidth={2.5} />, 
      bgClass: styles.iconBg3 
    },
    { 
      key: 'feature4', 
      icon: <Star size={28} strokeWidth={2.5} fill="currentColor" />, 
      bgClass: styles.iconBg4 
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className={styles.title}>
            {t('title')}
            <div className={styles.highlight}>{t('highlight')}</div>
          </h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </motion.div>

        {/* 4대 특징 Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.key}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <div className={`${styles.iconWrapper} ${feature.bgClass}`}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{t(`${feature.key}_title`)}</h3>
              <p className={styles.featureDesc}>{t(`${feature.key}_desc`)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className={styles.footnote}>{t('footnote')}</p>
          <button className={styles.actionButton}>
            {t('button')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
