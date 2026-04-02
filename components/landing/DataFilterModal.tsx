'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { FiRefreshCw } from 'react-icons/fi';
import styles from './DataFilterModal.module.css';

interface DataFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedData: string | null) => void;
}

const presets = [
  { id: '400kbps', icon: '💬', data: '400Kbps', desc: '메세지는 되지만 사진은 느려요' },
  { id: '1mbps', icon: '🖼️', data: '1Mbps', desc: '720P 화질 동영상을 무리없이 볼 수 있어요.' },
  { id: '5mbps', icon: '🚀', data: '5Mbps', desc: '사용하는데 어떤 무리도 없어요' },
];

export default function DataFilterModal({ isOpen, onClose, onApply }: DataFilterModalProps) {
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setSelectedSpec(null);
  };

  const handleApply = () => {
    onApply(selectedSpec);
    onClose();
  };

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
            <h2 className={styles.title}>데이터 속도 설명</h2>
            <p className={styles.subtitle}>원하는 데이터 속도를 기준으로 요금제를 확인해보세요</p>
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
            <FiRefreshCw size={16} /> 초기화
          </button>
          <button className={styles.submitButton} onClick={handleApply}>
            {selectedSpec ? `${resultCount}개 결과 보기` : '9개 결과 보기'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
