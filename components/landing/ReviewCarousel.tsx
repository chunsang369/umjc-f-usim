'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import styles from './ReviewCarousel.module.css';

const reviewsData = [
  {
    name: 'Linh Nguyen',
    flag: '🇻🇳',
    nationality: 'Vietnam',
    visa: 'D-4',
    rating: 5,
    text: 'Đăng ký rất dễ dàng, giá rõ ràng không phát sinh thêm. Gọi về Việt Nam rất tiện!',
    textEn: 'Very easy to sign up, clear pricing with no surprises. Calling back to Vietnam is super convenient!',
  },
  {
    name: 'James Wilson',
    flag: '🇺🇸',
    nationality: 'USA',
    visa: 'E-2',
    rating: 5,
    text: 'Finally a service that speaks my language. The whole process took less than 3 minutes. Highly recommend!',
    textEn: 'Finally a service that speaks my language. The whole process took less than 3 minutes. Highly recommend!',
  },
  {
    name: '张伟',
    flag: '🇨🇳',
    nationality: 'China',
    visa: 'D-2',
    rating: 5,
    text: '价格透明，没有隐藏费用。在韩国留学用这个SIM卡非常方便，推荐给中国留学生！',
    textEn: 'Transparent pricing, no hidden fees. Very convenient for studying in Korea. Recommended for Chinese students!',
  },
  {
    name: 'Alisher Karimov',
    flag: '🇺🇿',
    nationality: 'Uzbekistan',
    visa: 'E-9',
    rating: 4,
    text: 'Коллега помог найти этот сайт. Всё понятно, цена фиксированная. Доволен сервисом!',
    textEn: 'A colleague helped me find this site. Everything is clear, fixed price. Happy with the service!',
  },
  {
    name: 'Somchai P.',
    flag: '🇹🇭',
    nationality: 'Thailand',
    visa: 'E-9',
    rating: 5,
    text: 'บริการดีมาก ราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง สมัครง่ายมากครับ!',
    textEn: 'Great service, clear pricing, no hidden costs. Very easy to apply!',
  },
];

export default function ReviewCarousel() {
  const t = useTranslations('reviews');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [current, setCurrent] = useState(0);

  const visibleCount = 3;
  const maxIndex = reviewsData.length - visibleCount;

  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="section-title">{t('sectionTitle')}</h2>
          <div className={styles.headerStats}>
            <div className={styles.ratingDisplay}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#FDCB6E" color="#FDCB6E" />
                ))}
              </div>
              <span className={styles.ratingNumber}>4.9</span>
              <span className={styles.ratingCount}>({reviewsData.length * 120}+)</span>
            </div>
          </div>
        </div>

        <div className={styles.carouselWrapper}>
          <button className={styles.navBtn} onClick={prev} disabled={current === 0}>
            <ChevronLeft size={20} />
          </button>

          <div className={styles.track}>
            <motion.div
              className={styles.slider}
              animate={{ x: `${-current * (100 / visibleCount)}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {reviewsData.map((review, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewFlag}>{review.flag}</span>
                    <div>
                      <p className={styles.reviewName}>{review.name}</p>
                      <p className={styles.reviewMeta}>{review.nationality} · {review.visa}</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={14} fill="#FDCB6E" color="#FDCB6E" />
                    ))}
                  </div>
                  <p className={styles.reviewText}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <button className={styles.navBtn} onClick={next} disabled={current >= maxIndex}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.viewAll}>
          <a href={`/${locale}/reviews`} className="btn-secondary">
            {t('viewAll')}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
