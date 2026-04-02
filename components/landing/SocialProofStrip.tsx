'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, TrendingUp } from 'lucide-react';
import styles from './SocialProofStrip.module.css';

/* 날짜 기반 시드 랜덤 (1~30) — 매일 달라짐 */
function getDailyRandom(min: number, max: number): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const x = Math.sin(seed) * 10000;
  const rand = x - Math.floor(x); // 0~1
  return Math.floor(rand * (max - min + 1)) + min;
}

/* 카운트업 훅 */
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(ease * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
}

/* 주요 국기 50개 — ISO 3166-1 alpha-2 코드 (flagcdn.com 사용) */
const FLAG_CODES = [
  'vn', 'cn', 'us', 'uz', 'th', 'id', 'in', 'ru', 'ph', 'mm',
  'np', 'kh', 'bd', 'pk', 'mn', 'jp', 'gb', 'de', 'fr', 'br',
  'mx', 'au', 'ca', 'es', 'it', 'tr', 'sa', 'ae', 'eg', 'ng',
  'za', 'ke', 'ar', 'co', 'pe', 'cl', 'pl', 'nl', 'be', 'se',
  'no', 'dk', 'fi', 'cz', 'hu', 'ro', 'ua', 'my', 'sg', 'lk',
];

function getFlagUrl(code: string) {
  return `https://flagcdn.com/w80/${code}.png`;
}

export default function SocialProofStrip() {
  const todayCount = useMemo(() => getDailyRandom(1, 30), []);

  const counter1 = useCountUp(todayCount, 800);
  const counter2 = useCountUp(12500, 1600);
  const counter3 = useCountUp(30, 1000);

  return (
    <section className={styles.strip}>
      <div className={styles.container}>

        {/* 상단 숫자 스탯 */}
        <motion.div
          className={styles.items}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => {
            counter1.start();
            counter2.start();
            counter3.start();
          }}
        >
          <div className={`${styles.item} ${styles.primary}`}>
            <TrendingUp size={18} />
            <span>오늘 <strong>{counter1.count}</strong>명 가입</span>
          </div>
          <div className={`${styles.item} ${styles.secondary}`}>
            <Users size={18} />
            <span>누적 <strong>{counter2.count.toLocaleString()}</strong>+ 가입자</span>
          </div>
          <div className={`${styles.item} ${styles.accent}`}>
            <Globe size={18} />
            <span><strong>{counter3.count}</strong>+ 국가</span>
          </div>
        </motion.div>

        {/* 국기 롤링 마퀴 */}
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeTrack}>
            {/* 2번 반복하여 무한 루프 효과 */}
            {[...FLAG_CODES, ...FLAG_CODES].map((code, i) => (
              <img
                key={i}
                src={getFlagUrl(code)}
                alt={code.toUpperCase()}
                className={styles.flag}
                loading="lazy"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
