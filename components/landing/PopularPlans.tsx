'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaPhoneAlt, FaEnvelope, FaChevronDown, FaChevronUp, FaChevronRight } from 'react-icons/fa';
import { MdSignalCellularAlt, MdTune, MdSwapVert, MdList } from 'react-icons/md';
import { useTranslations } from 'next-intl';
import styles from './PopularPlans.module.css';

interface PlanDetail {
  basePrice: string;
  promoDiscount: string;
  contractDiscount: string;
}

interface PlanBaseData {
  id: string;
  partnerName: string;
  rating: string;
  tags: { text: string; variant: 'green' | 'blue' | 'red' }[];
  promoName: string;
  dataSpec: string;
  voiceDetail: string;
  msgDetail: string;
  networkDetail: string;
  monthlyPrice: string;
  returnPriceMsg: string;
  detail: PlanDetail;
}

const dummyPlans: PlanBaseData[] = [
  {
    id: 'p-1',
    partnerName: 'SK텔레콤',
    rating: '5.0',
    tags: [{ text: '외국인 단독', variant: 'blue' }, { text: '만 34세 이하', variant: 'red' }, { text: '추천', variant: 'green' }],
    promoName: '[외국인 단독특가] 0 청년 37',
    dataSpec: '월 6GB + 400Kbps',
    voiceDetail: '기본제공(무제한)',
    msgDetail: '기본제공',
    networkDetail: '5G',
    monthlyPrice: '11,000',
    returnPriceMsg: '12개월 간 특가 적용 (기본 37,000원)',
    detail: { basePrice: '37,000', promoDiscount: '-16,750', contractDiscount: '-9,250' }
  },
  {
    id: 'p-2',
    partnerName: 'SK텔레콤',
    rating: '4.8',
    tags: [{ text: '외국인 단독', variant: 'blue' }],
    promoName: '[외국인 단독특가] 5G 컴팩트',
    dataSpec: '월 6GB + 400Kbps',
    voiceDetail: '기본제공(무제한)',
    msgDetail: '기본제공',
    networkDetail: '5G',
    monthlyPrice: '12,500',
    returnPriceMsg: '12개월 간 특가 적용 (기본 39,000원)',
    detail: { basePrice: '39,000', promoDiscount: '-16,750', contractDiscount: '-9,750' }
  },
  {
    id: 'p-3',
    partnerName: 'SK텔레콤',
    rating: '4.9',
    tags: [{ text: '외국인 단독', variant: 'blue' }, { text: '만 34세 이하', variant: 'red' }],
    promoName: '[외국인 단독특가] 0 청년 49',
    dataSpec: '월 15GB + 400Kbps',
    voiceDetail: '기본제공(무제한)',
    msgDetail: '기본제공',
    networkDetail: '5G',
    monthlyPrice: '20,000',
    returnPriceMsg: '12개월 간 특가 적용 (기본 49,000원)',
    detail: { basePrice: '49,000', promoDiscount: '-16,750', contractDiscount: '-12,250' }
  },
  {
    id: 'p-4',
    partnerName: 'SK텔레콤',
    rating: '4.8',
    tags: [{ text: '외국인 단독', variant: 'blue' }],
    promoName: '[외국인 단독특가] 5G 베이직',
    dataSpec: '월 11GB + 400Kbps',
    voiceDetail: '기본제공(무제한)',
    msgDetail: '기본제공',
    networkDetail: '5G',
    monthlyPrice: '20,000',
    returnPriceMsg: '12개월 간 특가 적용 (기본 49,000원)',
    detail: { basePrice: '49,000', promoDiscount: '-16,750', contractDiscount: '-12,250' }
  },
  {
    id: 'p-5',
    partnerName: 'SK텔레콤',
    rating: '4.9',
    tags: [{ text: '외국인 단독', variant: 'blue' }, { text: '만 34세 이하', variant: 'red' }, { text: '추천', variant: 'green' }],
    promoName: '[외국인 단독특가] 0 청년 59',
    dataSpec: '월 36GB + 1Mbps',
    voiceDetail: '기본제공(무제한)',
    msgDetail: '기본제공',
    networkDetail: '5G',
    monthlyPrice: '27,500',
    returnPriceMsg: '12개월 간 특가 적용 (기본 59,000원)',
    detail: { basePrice: '59,000', promoDiscount: '-16,750', contractDiscount: '-14,750' }
  },
  {
    id: 'p-6',
    partnerName: 'SK텔레콤',
    rating: '4.9',
    tags: [{ text: '외국인 단독', variant: 'blue' }, { text: '데이터넉넉', variant: 'green' }],
    promoName: '[외국인 단독특가] 5G 베이직 플러스',
    dataSpec: '월 24GB + 1Mbps',
    voiceDetail: '기본제공(무제한)',
    msgDetail: '기본제공',
    networkDetail: '5G',
    monthlyPrice: '27,500',
    returnPriceMsg: '12개월 간 특가 적용 (기본 59,000원)',
    detail: { basePrice: '59,000', promoDiscount: '-16,750', contractDiscount: '-14,750' }
  },
  {
    id: 'p-7',
    partnerName: 'SK텔레콤',
    rating: '5.0',
    tags: [{ text: '외국인 단독', variant: 'blue' }, { text: '만 34세 이하', variant: 'red' }, { text: '추천', variant: 'green' }],
    promoName: '[외국인 단독특가] 0 청년 69',
    dataSpec: '월 160GB + 5Mbps',
    voiceDetail: '기본제공(무제한)',
    msgDetail: '기본제공',
    networkDetail: '5G',
    monthlyPrice: '35,000',
    returnPriceMsg: '12개월 간 특가 적용 (기본 69,000원)',
    detail: { basePrice: '69,000', promoDiscount: '-16,750', contractDiscount: '-17,250' }
  },
  {
    id: 'p-8',
    partnerName: 'SK텔레콤',
    rating: '4.8',
    tags: [{ text: '외국인 단독', variant: 'blue' }],
    promoName: '[외국인 단독특가] 5GX 레귤러',
    dataSpec: '월 110GB + 5Mbps',
    voiceDetail: '기본제공(무제한)',
    msgDetail: '기본제공',
    networkDetail: '5G',
    monthlyPrice: '35,000',
    returnPriceMsg: '12개월 간 특가 적용 (기본 69,000원)',
    detail: { basePrice: '69,000', promoDiscount: '-16,750', contractDiscount: '-17,250' }
  },
  {
    id: 'p-9',
    partnerName: 'SK텔레콤',
    rating: '5.0',
    tags: [{ text: '외국인 단독', variant: 'blue' }, { text: '무제한급', variant: 'green' }],
    promoName: '[외국인 단독특가] 5GX 레귤러플러스',
    dataSpec: '월 250GB + 5Mbps',
    voiceDetail: '기본제공(무제한)',
    msgDetail: '기본제공',
    networkDetail: '5G',
    monthlyPrice: '42,500',
    returnPriceMsg: '12개월 간 특가 적용 (기본 79,000원)',
    detail: { basePrice: '79,000', promoDiscount: '-16,750', contractDiscount: '-19,750' }
  },
];

import DataFilterModal from './DataFilterModal';

export default function PopularPlans() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isPlansPage = pathname?.includes('/plans');
  const t = useTranslations('plans');

  const translateTag = (text: string) => {
    if (text === '외국인 단독') return t('tagForeignerOnly');
    if (text === '만 34세 이하') return t('tagUnder34');
    if (text === '추천') return t('tagRecommended');
    if (text === '데이터넉넉') return t('tagPlentyData');
    if (text === '무제한급') return t('tagUnlimitedLevel');
    return text;
  };

  const translatePromo = (name: string) => name.replace('[외국인 단독특가]', t('promoNamePrefix'));
  const translateData = (spec: string) => spec.replace('월 ', t('monthPrefix'));
  const translateVoice = (voice: string) => voice.replace('기본제공(무제한)', t('unlimited')).replace('기본제공', t('included'));

  const [showAll, setShowAll] = useState(isPlansPage || false);
  const [selectedPlan, setSelectedPlan] = useState<PlanBaseData | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'none' | 'recommended'>('none');
  
  useEffect(() => {
    const filterOpen = searchParams?.get('filter') === 'open';
    if (filterOpen) {
      setIsFilterModalOpen(true);
    }
  }, [searchParams]);

  const handleCloseFilter = () => {
    setIsFilterModalOpen(false);
    if (searchParams?.get('filter') === 'open') {
      router.replace(pathname || '/', { scroll: false });
    }
  };

  const filteredPlans = selectedSpeed 
    ? dummyPlans.filter(plan => plan.dataSpec.toLowerCase().includes(selectedSpeed.toLowerCase()))
    : dummyPlans;

  const sortedPlans = sortBy === 'recommended'
    ? [...filteredPlans].sort((a, b) => {
        const aRec = a.tags.some(t => t.text === '추천');
        const bRec = b.tags.some(t => t.text === '추천');
        if (aRec && !bRec) return -1;
        if (!aRec && bRec) return 1;
        return 0;
      })
    : filteredPlans;

  const displayedPlans = (showAll || !!selectedSpeed || sortBy !== 'none') ? sortedPlans : sortedPlans.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* 섹션 헤더 */}
        <div className={styles.sectionHeader}>
          <div className={styles.titleArea}>
            <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
            <p className={styles.sectionDesc}>{t('sectionDesc')}</p>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={styles.actionBtn} 
              onClick={() => {
                setSelectedSpeed(null);
                setShowAll(true);
              }}
            >
              <MdList size={18} /> {t('viewAllPlans')}
            </button>
            <button 
              className={styles.actionBtn} 
              onClick={() => setIsFilterModalOpen(true)}
            >
              <MdTune size={18} /> {t('filter')}
            </button>
            <button 
              className={`${styles.actionBtn} ${sortBy === 'recommended' ? styles.actionBtnActive : ''}`}
              onClick={() => setSortBy(prev => prev === 'recommended' ? 'none' : 'recommended')}
            >
              <MdSwapVert size={18} /> {t('sortByRecommended')}
            </button>
          </div>
        </div>



        {/* 카드 리스트 */}
        <div className={styles.cardList}>
          <AnimatePresence>
            {displayedPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
                className={styles.card}
                onClick={() => setSelectedPlan(plan)}
                style={{ cursor: 'pointer' }}
              >
                {/* ROW 1: 파트너 정보 + 태그 */}
                <div className={styles.cardHeader}>
                  <div className={styles.partnerInfo}>
                    <div className={styles.partnerLogo}>
                      {plan.partnerName.charAt(0)}
                    </div>
                    <span className={styles.partnerName}>{plan.partnerName}</span>
                    <span className={styles.rating}>
                      <FaStar className={styles.starIcon} />
                      {plan.rating}
                    </span>
                  </div>
                  <div className={styles.tagGroup}>
                    {plan.tags.map((tag, i) => (
                      <span key={i} className={`${styles.tag} ${styles[`tag_${tag.variant}`]}`}>
                        {translateTag(tag.text)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ROW 2: 프로모션 */}
                <p className={styles.promoText}>{translatePromo(plan.promoName)}</p>

                {/* ROW 3: 데이터 스펙 + 가격 */}
                <div className={styles.specPriceRow}>
                  <div className={styles.specArea}>
                    <h3 className={styles.dataSpec}>{translateData(plan.dataSpec)}</h3>
                    <div className={styles.featureIcons}>
                      <span className={styles.featureItem}>
                        <FaPhoneAlt size={13} /> {translateVoice(plan.voiceDetail)}
                      </span>
                      <span className={styles.featureItem}>
                        <FaEnvelope size={13} /> {translateVoice(plan.msgDetail)}
                      </span>
                      <span className={styles.featureItem}>
                        <MdSignalCellularAlt size={16} /> {plan.networkDetail}
                      </span>
                    </div>
                  </div>
                  <div className={styles.priceArea}>
                    <div className={styles.priceMain}>
                      <span className={styles.priceLabel}>{t('month')}</span>
                      <span className={styles.priceValue}>{plan.monthlyPrice}</span>
                      <span className={styles.priceUnit}>{t('won')}</span>
                    </div>
                    {/* fallback or strip Korean specifics if translating dynamically or just hide if complex */}
                    <p className={styles.priceNote}>{/* plan.returnPriceMsg */} {t('note1')}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 하단 CTA */}
        <div className={styles.ctaWrap}>
          {!showAll && (
            <button 
              onClick={() => {
                if (isPlansPage) {
                  setShowAll(true);
                } else {
                  const locale = pathname?.split('/')[1] || 'ko';
                  router.push(`/${locale}/plans?filter=open`);
                }
              }}
              className={styles.ctaButton}
              style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
            >
              모든 요금제 비교하기 <FaChevronDown size={14} />
            </button>
          )}
          {showAll && !isPlansPage && (
            <button 
              onClick={() => setShowAll(false)}
              className={styles.ctaButton}
              style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
            >
              요금제 접기 <FaChevronUp size={14} />
            </button>
          )}
        </div>

        {/* 필터 모달 */}
        <DataFilterModal
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilter}
          onApply={(spec) => {
            setSelectedSpeed(spec); // spec will be '400kbps', '1mbps', etc.
            setShowAll(true);
            handleCloseFilter();
          }}
        />

        {/* 상세 모달 (Detail Modal) */}
        <AnimatePresence>
          {selectedPlan && (
            <motion.div 
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
            >
              <motion.div 
                className={styles.modalContent}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <button className={styles.closeButton} onClick={() => setSelectedPlan(null)}>
                  &times;
                </button>
                
                <h2 className={styles.modalTitle}>{translatePromo(selectedPlan.promoName)}</h2>

                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>기본 제공 (Basic Features)</h3>
                  <table className={styles.modalTable}>
                    <tbody>
                      <tr>
                        <th>데이터 (Data)</th>
                        <td>{translateData(selectedPlan.dataSpec)}</td>
                      </tr>
                      <tr>
                        <th>통화 (Voice)</th>
                        <td>{translateVoice(selectedPlan.voiceDetail)}</td>
                      </tr>
                      <tr>
                        <th>문자 (SMS)</th>
                        <td>{translateVoice(selectedPlan.msgDetail)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>{t('priceDetails')}</h3>
                  <table className={styles.modalTable}>
                    <tbody>
                      <tr>
                        <th>{t('basePriceLabel')}</th>
                        <td>{selectedPlan.detail.basePrice} {t('won')}</td>
                      </tr>
                      <tr className={styles.discountRow}>
                        <th>{t('promoDiscountLabel')}</th>
                        <td>{selectedPlan.detail.promoDiscount} {t('won')}</td>
                      </tr>
                      <tr className={styles.discountRow}>
                        <th>{t('contractDiscountLabel')}</th>
                        <td>{selectedPlan.detail.contractDiscount} {t('won')}</td>
                      </tr>
                      <tr className={styles.finalPriceRow}>
                        <th>{t('finalMonthlyPrice')}</th>
                        <td>{selectedPlan.monthlyPrice} {t('won')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>{t('importantNotes')}</h3>
                  <ul style={{ fontSize: '13px', color: '#64748b', paddingLeft: '20px', margin: 0, lineHeight: 1.6 }}>
                    <li>{t('note1')}</li>
                    <li>{t('note2')}</li>
                    <li>{t('note3')}</li>
                  </ul>
                </div>

                <div className={styles.ctaWrap} style={{ marginTop: '32px' }}>
                  <a href={`/${pathname?.split('/')[1] || 'ko'}/apply?plan=${selectedPlan.id}`} className={styles.ctaButton} style={{ width: '100%', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {t('applyThisPlan')} <FaChevronRight size={14} style={{ marginLeft: '6px' }} />
                  </a>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
