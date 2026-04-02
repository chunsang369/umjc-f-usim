'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { FiRefreshCw } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import styles from './DataFilterModal.module.css';

interface DataFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedData: string | null) => void;
}

export default function DataFilterModal({ isOpen, onClose, onApply }: DataFilterModalProps) {
  const t = useTranslations('plans');
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setSelectedSpec(null);
  };

  const handleApply = () => {
    onApply(selectedSpec);
    onClose();
  };

  const presets = [
    { id: '400kbps', icon: '💬', data: '400Kbps', desc: t('speed400Desc') },
    { id: '1mbps', icon: '🖼️', data: '1Mbps', desc: t('speed1mbpsDesc') },
    { id: '5mbps', icon: '🚀', data: '5Mbps', desc: t('speed5mbpsDesc') },
  ];

  // We have 9 plans in total right now.
  const counts: Record<string, number> = {
    '400kbps': 4,
    '1mbps': 2,
    '5mbps': 3,
  };
  const resultCount = selectedSpec ? counts[selectedSpec] : 9;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <motion.div
        className={styles.modal}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h2 className={styles.title}>{t('filterModalTitle')}</h2>
            <p className={styles.subtitle}>{t('filterModalSubtitle')}</p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <div className={styles.scrollArea}>
          <div className={styles.presetsContainer}>
            {presets.map((preset) => {
              const isActive = selectedSpec === preset.id;
              return (
                <div 
                  key={preset.id}
                  className={`${styles.presetCard} ${isActive ? styles.presetCardActive : ''}`}
                  onClick={() => setSelectedSpec(preset.id)}
                >
                  <div className={styles.presetIcon}>{preset.icon}</div>
                  <div className={styles.presetData}>{preset.data}</div>
                  <div className={styles.presetDesc}>{preset.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.resetButton} onClick={handleReset}>
            <FiRefreshCw size={16} /> {t('reset')}
          </button>
          <button className={styles.submitButton} onClick={handleApply}>
            {t('viewResults', { count: resultCount })}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
