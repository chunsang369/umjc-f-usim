'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  Check,
  CreditCard as CreditCardIcon,
  Truck,
  Smartphone,
  Upload,
  Camera,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronRight,
  Wifi,
  Phone,
  MessageSquare,
} from 'lucide-react';
import styles from './apply.module.css';

type VerificationType = 'arc' | 'passport' | null;
type DeliveryType = 'esim' | 'physical' | null;

/* ── 요금제 데이터 (PopularPlans와 동기화) ── */
interface PlanInfo {
  id: string;
  promoName: string;
  dataSpec: string;
  voiceDetail: string;
  msgDetail: string;
  networkDetail: string;
  monthlyPrice: string;
  basePrice: string;
  returnPriceMsg: string;
}

const allPlans: PlanInfo[] = [
  { id: 'p-1', promoName: '[외국인 단독특가] 0 청년 37', dataSpec: '월 6GB + 400Kbps', voiceDetail: '무제한', msgDetail: '기본제공', networkDetail: '5G', monthlyPrice: '11,000', basePrice: '37,000', returnPriceMsg: '12개월 간 특가 적용' },
  { id: 'p-2', promoName: '[외국인 단독특가] 5G 컴팩트', dataSpec: '월 6GB + 400Kbps', voiceDetail: '무제한', msgDetail: '기본제공', networkDetail: '5G', monthlyPrice: '12,500', basePrice: '39,000', returnPriceMsg: '12개월 간 특가 적용' },
  { id: 'p-3', promoName: '[외국인 단독특가] 0 청년 49', dataSpec: '월 15GB + 400Kbps', voiceDetail: '무제한', msgDetail: '기본제공', networkDetail: '5G', monthlyPrice: '20,000', basePrice: '49,000', returnPriceMsg: '12개월 간 특가 적용' },
  { id: 'p-4', promoName: '[외국인 단독특가] 5G 베이직', dataSpec: '월 11GB + 400Kbps', voiceDetail: '무제한', msgDetail: '기본제공', networkDetail: '5G', monthlyPrice: '20,000', basePrice: '49,000', returnPriceMsg: '12개월 간 특가 적용' },
  { id: 'p-5', promoName: '[외국인 단독특가] 0 청년 59', dataSpec: '월 36GB + 1Mbps', voiceDetail: '무제한', msgDetail: '기본제공', networkDetail: '5G', monthlyPrice: '27,500', basePrice: '59,000', returnPriceMsg: '12개월 간 특가 적용' },
  { id: 'p-6', promoName: '[외국인 단독특가] 5G 베이직 플러스', dataSpec: '월 24GB + 1Mbps', voiceDetail: '무제한', msgDetail: '기본제공', networkDetail: '5G', monthlyPrice: '27,500', basePrice: '59,000', returnPriceMsg: '12개월 간 특가 적용' },
  { id: 'p-7', promoName: '[외국인 단독특가] 0 청년 69', dataSpec: '월 160GB + 5Mbps', voiceDetail: '무제한', msgDetail: '기본제공', networkDetail: '5G', monthlyPrice: '35,000', basePrice: '69,000', returnPriceMsg: '12개월 간 특가 적용' },
  { id: 'p-8', promoName: '[외국인 단독특가] 5GX 레귤러', dataSpec: '월 110GB + 5Mbps', voiceDetail: '무제한', msgDetail: '기본제공', networkDetail: '5G', monthlyPrice: '35,000', basePrice: '69,000', returnPriceMsg: '12개월 간 특가 적용' },
  { id: 'p-9', promoName: '[외국인 단독특가] 5GX 레귤러플러스', dataSpec: '월 250GB + 5Mbps', voiceDetail: '무제한', msgDetail: '기본제공', networkDetail: '5G', monthlyPrice: '42,500', basePrice: '79,000', returnPriceMsg: '12개월 간 특가 적용' },
];

function ApplyPageContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = pathname?.split('/')[1] || 'ko';

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Step 1: 요금제
  const [selectedPlan, setSelectedPlan] = useState<PlanInfo | null>(null);

  // Step 2: 개통 방식
  const [verificationType, setVerificationType] = useState<VerificationType>(null);

  // Step 3: 신분증 정보
  const [arcName, setArcName] = useState('');
  const [arcNumber, setArcNumber] = useState('');
  const [passportName, setPassportName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [visaType, setVisaType] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  // Step 4: 수령 방법
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryType>(null);
  const [phoneModel, setPhoneModel] = useState('');
  const [imei1, setImei1] = useState('');
  const [imei2, setImei2] = useState('');
  const [eid, setEid] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');

  const steps = ['요금제 확인', '개통 방식', '신분증 정보', '수령 방법', '접수 완료'];

  // URL 쿼리에서 요금제 자동 감지
  useEffect(() => {
    const planId = searchParams?.get('plan');
    if (planId) {
      const found = allPlans.find((p) => p.id === planId);
      if (found) setSelectedPlan(found);
    }
  }, [searchParams]);

  const visaOptions = [
    { value: 'D-2', label: 'D-2 (유학)' },
    { value: 'D-4', label: 'D-4 (일반연수)' },
    { value: 'E-7', label: 'E-7 (특정활동)' },
    { value: 'E-9', label: 'E-9 (비전문취업)' },
    { value: 'F-2', label: 'F-2 (거주)' },
    { value: 'F-4', label: 'F-4 (재외동포)' },
    { value: 'F-5', label: 'F-5 (영주)' },
    { value: 'F-6', label: 'F-6 (결혼이민)' },
    { value: 'H-2', label: 'H-2 (방문취업)' },
    { value: 'other', label: '기타 (Other)' },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedPlan !== null;
      case 2:
        return verificationType !== null;
      case 3:
        if (verificationType === 'arc') return arcName.trim() !== '' && arcNumber.trim() !== '';
        if (verificationType === 'passport')
          return passportName.trim() !== '' && passportNumber.trim() !== '' && visaType !== '' && contactNumber.trim() !== '';
        return false;
      case 4:
        if (deliveryMethod === 'esim') return phoneModel.trim() !== '' && imei1.trim() !== '' && eid.trim() !== '';
        if (deliveryMethod === 'physical') return deliveryAddress.trim() !== '' && deliveryPhone.trim() !== '';
        return false;
      default:
        return true;
    }
  };

  const goToPlansPage = () => {
    router.push(`/${locale}/plans`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.pageTitle}>SKT 공식인증 가입 신청</h1>
        <p className={styles.pageSubtitle}>
          외국인 전용 USIM · 간편 신청 후 빠른 개통
        </p>

        {/* Step Indicator */}
        {currentStep < 5 && (
          <div className={styles.stepIndicator}>
            <div className={styles.stepLine}>
              <div
                className={styles.stepLineProgress}
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
            {steps.map((step, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;
              return (
                <div key={idx} className={styles.stepItem}>
                  <div
                    className={`${styles.stepCircle} ${
                      isActive
                        ? styles.stepCircleActive
                        : isCompleted
                        ? styles.stepCircleCompleted
                        : styles.stepCircleDefault
                    }`}
                  >
                    {isCompleted ? <Check size={18} /> : stepNum}
                  </div>
                  <span
                    className={`${styles.stepLabel} ${
                      isActive
                        ? styles.stepLabelActive
                        : isCompleted
                        ? styles.stepLabelCompleted
                        : styles.stepLabelDefault
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Form Card */}
        <div className={styles.formCard}>
          {/* ============================================ */}
          {/* STEP 1: 요금제 확인 */}
          {/* ============================================ */}
          {currentStep === 1 && (
            <div>
              <div className={styles.stepTag}>STEP 1</div>
              <h2 className={styles.stepTitle}>요금제를 선택하세요</h2>
              <p className={styles.stepDesc}>
                신청하실 요금제를 확인하세요. 요금제 변경은 요금제 페이지에서 가능합니다.
              </p>

              {selectedPlan ? (
                <>
                  {/* 선택된 요금제 정보 표시 */}
                  <div className={styles.selectedPlanCard}>
                    <div className={styles.selectedPlanBadge}>
                      <Check size={14} /> 선택된 요금제
                    </div>
                    <h3 className={styles.selectedPlanName}>{selectedPlan.promoName}</h3>

                    <div className={styles.selectedPlanSpecs}>
                      <div className={styles.selectedPlanSpecItem}>
                        <Wifi size={16} />
                        <span className={styles.selectedPlanSpecLabel}>데이터</span>
                        <span className={styles.selectedPlanSpecValue}>{selectedPlan.dataSpec}</span>
                      </div>
                      <div className={styles.selectedPlanSpecItem}>
                        <Phone size={16} />
                        <span className={styles.selectedPlanSpecLabel}>통화</span>
                        <span className={styles.selectedPlanSpecValue}>{selectedPlan.voiceDetail}</span>
                      </div>
                      <div className={styles.selectedPlanSpecItem}>
                        <MessageSquare size={16} />
                        <span className={styles.selectedPlanSpecLabel}>문자</span>
                        <span className={styles.selectedPlanSpecValue}>{selectedPlan.msgDetail}</span>
                      </div>
                    </div>

                    <div className={styles.selectedPlanPriceArea}>
                      <div className={styles.selectedPlanPriceRow}>
                        <span className={styles.selectedPlanPriceLabel}>기본 요금</span>
                        <span className={styles.selectedPlanBasePrice}>₩{selectedPlan.basePrice}</span>
                      </div>
                      <div className={styles.selectedPlanPriceRow}>
                        <span className={styles.selectedPlanPriceLabel}>월 실납부액</span>
                        <span className={styles.selectedPlanFinalPrice}>₩{selectedPlan.monthlyPrice}</span>
                      </div>
                      <p className={styles.selectedPlanPriceNote}>{selectedPlan.returnPriceMsg}</p>
                    </div>

                    <button
                      type="button"
                      onClick={goToPlansPage}
                      className={styles.changePlanBtn}
                    >
                      다른 요금제 선택하기 <ChevronRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                /* 요금제 미선택 시 */
                <div className={styles.noPlanContainer}>
                  <div className={styles.noPlanIcon}>
                    <Wifi size={48} />
                  </div>
                  <h3 className={styles.noPlanTitle}>선택된 요금제가 없습니다</h3>
                  <p className={styles.noPlanDesc}>
                    요금제 페이지에서 원하시는 요금제를 선택한 뒤 신청해 주세요.
                  </p>
                  <button
                    type="button"
                    onClick={goToPlansPage}
                    className={styles.goToPlanBtn}
                  >
                    요금제 선택하러 가기 <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ============================================ */}
          {/* STEP 2: 개통 방식 선택 */}
          {/* ============================================ */}
          {currentStep === 2 && (
            <div>
              <div className={styles.stepTag}>STEP 2</div>
              <h2 className={styles.stepTitle}>개통 방식을 선택하세요</h2>
              <p className={styles.stepDesc}>
                보유하고 계신 신분증에 따라 개통 방식이 다릅니다.
              </p>

              <div className={styles.verifyGrid}>
                {/* ARC 개통 */}
                <div
                  onClick={() => setVerificationType('arc')}
                  className={`${styles.verifyCard} ${
                    verificationType === 'arc' ? styles.verifyCardSelected : ''
                  }`}
                >
                  <div className={`${styles.verifyIcon} ${styles.verifyIconArc}`}>
                    <CreditCardIcon size={32} />
                  </div>
                  <h3 className={styles.verifyCardTitle}>외국인등록증 개통</h3>
                  <p className={styles.verifyCardDesc}>
                    외국인등록증(ARC)을 소지하고 있는 경우
                  </p>
                  <ul className={styles.verifyCardList}>
                    <li>모든 체류자격(비자) 가능</li>
                    <li>가장 빠른 개통</li>
                    <li>명의변경 불필요</li>
                  </ul>
                  {verificationType === 'arc' && (
                    <div className={styles.selectedBadge}>
                      <Check size={14} /> 선택됨
                    </div>
                  )}
                </div>

                {/* Passport 개통 */}
                <div
                  onClick={() => setVerificationType('passport')}
                  className={`${styles.verifyCard} ${
                    verificationType === 'passport' ? styles.verifyCardSelected : ''
                  }`}
                >
                  <div className={`${styles.verifyIcon} ${styles.verifyIconPassport}`}>
                    <FileText size={32} />
                  </div>
                  <h3 className={styles.verifyCardTitle}>여권 개통</h3>
                  <p className={styles.verifyCardDesc}>
                    아직 외국인등록증이 없는 경우 (D2/D4/E7/E9 등)
                  </p>
                  <ul className={styles.verifyCardList}>
                    <li>여권만으로 개통 가능</li>
                    <li>체류기간확인서 필요</li>
                    <li>3개월 내 ARC 전환 필수</li>
                  </ul>
                  {verificationType === 'passport' && (
                    <div className={styles.selectedBadge}>
                      <Check size={14} /> 선택됨
                    </div>
                  )}
                </div>
              </div>

              {/* 여권 개통 유의사항 */}
              {verificationType === 'passport' && (
                <div className={styles.warningBox}>
                  <AlertTriangle size={18} className={styles.warningIcon} />
                  <div>
                    <strong>여권 개통 유의사항</strong>
                    <ul className={styles.warningList}>
                      <li>개통 후 3개월 이내 외국인등록증으로 명의변경 필수</li>
                      <li>미변경 시 자진 해지 처리됩니다</li>
                      <li>조기 해지 시 1일 10원 차감 (구매비서 D+20일 기준)</li>
                      <li>체류기간확인서: <a href="https://www.hikorea.go.kr" target="_blank" rel="noopener noreferrer" className={styles.warningLink}>하이코리아 (hikorea.go.kr)</a>에서 발급</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================ */}
          {/* STEP 3: 신분증 정보 입력 */}
          {/* ============================================ */}
          {currentStep === 3 && (
            <div>
              <div className={styles.stepTag}>STEP 3</div>
              <h2 className={styles.stepTitle}>
                {verificationType === 'arc' ? '외국인등록증 정보' : '여권 정보'}
              </h2>

              {/* 필요 서류 안내 */}
              <div className={styles.infoBox}>
                <Info size={18} className={styles.infoIcon} />
                <div>
                  <strong>필요 서류 안내</strong>
                  {verificationType === 'arc' ? (
                    <ol className={styles.infoList}>
                      <li>SKT 공식인증 가입신청서 (고객 서명 필수)</li>
                      <li>외국인 등록증 사본 앞면 (사진본/복사본/스캔본 모두 가능)</li>
                      <li>머그샷 참조 사진 (얼굴 + 외국인등록증 동시 확인 가능한 사진)</li>
                    </ol>
                  ) : (
                    <ol className={styles.infoList}>
                      <li>SKT 공식인증 가입신청서 (고객 서명 필수)</li>
                      <li>여권 사본 (사진본/복사본/스캔본 모두 가능)</li>
                      <li>여권 명의인 연락 가능한 전화번호</li>
                      <li>체류기간확인서 (하이코리아 발급)</li>
                    </ol>
                  )}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                {verificationType === 'arc' ? (
                  <>
                    <div>
                      <label className={styles.fieldLabel}>
                        영문 성명 (Name on ARC) <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={arcName}
                        onChange={(e) => setArcName(e.target.value)}
                        className={styles.fieldInput}
                        placeholder="HONG GILDONG"
                      />
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>
                        외국인 등록번호 (ARC Number) <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={arcNumber}
                        onChange={(e) => setArcNumber(e.target.value)}
                        maxLength={14}
                        className={`${styles.fieldInput} ${styles.fieldInputMono}`}
                        placeholder="000000-0000000"
                      />
                    </div>

                    {/* 서류 업로드 */}
                    <div className={styles.uploadSection}>
                      <label className={styles.fieldLabel}>외국인등록증 앞면 사본</label>
                      <div className={styles.uploadBox}>
                        <Upload size={24} />
                        <span>사진본/복사본/스캔본 업로드</span>
                        <span className={styles.uploadHint}>JPG, PNG, PDF (최대 10MB)</span>
                      </div>
                    </div>

                    <div className={styles.uploadSection}>
                      <label className={styles.fieldLabel}>머그샷 사진 (얼굴 + 등록증 동시 촬영)</label>
                      <div className={styles.uploadBox}>
                        <Camera size={24} />
                        <span>본인확인용 사진 업로드</span>
                        <span className={styles.uploadHint}>얼굴과 외국인등록증이 함께 보여야 합니다</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className={styles.fieldLabel}>
                        영문 성명 (Name on Passport) <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={passportName}
                        onChange={(e) => setPassportName(e.target.value)}
                        className={styles.fieldInput}
                        placeholder="HONG GILDONG"
                      />
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>
                        여권번호 (Passport Number) <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        className={`${styles.fieldInput} ${styles.fieldInputMono}`}
                        placeholder="M12345678"
                      />
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>
                        체류자격 (Visa Type) <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.selectWrapper}>
                        <select
                          value={visaType}
                          onChange={(e) => setVisaType(e.target.value)}
                          className={styles.fieldSelect}
                        >
                          <option value="">체류자격을 선택하세요</option>
                          {visaOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={18} className={styles.selectArrow} />
                      </div>
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>
                        연락 가능한 전화번호 <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="tel"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className={styles.fieldInput}
                        placeholder="010-0000-0000 또는 해외번호"
                      />
                    </div>

                    {/* 서류 업로드 */}
                    <div className={styles.uploadSection}>
                      <label className={styles.fieldLabel}>여권 사본 (사진면)</label>
                      <div className={styles.uploadBox}>
                        <Upload size={24} />
                        <span>사진본/복사본/스캔본 업로드</span>
                        <span className={styles.uploadHint}>JPG, PNG, PDF (최대 10MB)</span>
                      </div>
                    </div>

                    <div className={styles.uploadSection}>
                      <label className={styles.fieldLabel}>체류기간확인서</label>
                      <div className={styles.uploadBox}>
                        <FileText size={24} />
                        <span>체류기간확인서 업로드</span>
                        <span className={styles.uploadHint}>
                          <a href="https://www.hikorea.go.kr" target="_blank" rel="noopener noreferrer" className={styles.uploadLink}>
                            하이코리아(hikorea.go.kr)
                          </a>
                          에서 발급
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* STEP 4: 수령 방법 + 최종 확인 */}
          {/* ============================================ */}
          {currentStep === 4 && (
            <div>
              <div className={styles.stepTag}>STEP 4</div>
              <h2 className={styles.stepTitle}>수령 방법 선택</h2>

              <div className={styles.deliveryGrid}>
                <div
                  onClick={() => setDeliveryMethod('esim')}
                  className={`${styles.deliveryCard} ${
                    deliveryMethod === 'esim' ? styles.deliveryCardSelected : ''
                  }`}
                >
                  <Smartphone
                    size={36}
                    className={`${styles.deliveryIcon} ${
                      deliveryMethod === 'esim' ? styles.deliveryIconSelected : ''
                    }`}
                  />
                  <h3 className={styles.deliveryTitle}>eSIM 발급</h3>
                  <p className={styles.deliveryDesc}>QR코드 즉시 발급 · 대기 없음</p>
                </div>
                <div
                  onClick={() => setDeliveryMethod('physical')}
                  className={`${styles.deliveryCard} ${
                    deliveryMethod === 'physical' ? styles.deliveryCardSelected : ''
                  }`}
                >
                  <Truck
                    size={36}
                    className={`${styles.deliveryIcon} ${
                      deliveryMethod === 'physical' ? styles.deliveryIconSelected : ''
                    }`}
                  />
                  <h3 className={styles.deliveryTitle}>실물 USIM 택배</h3>
                  <p className={styles.deliveryDesc}>우체국 택배 · 1~2일 소요</p>
                </div>
              </div>

              {/* eSIM 추가 정보 */}
              {deliveryMethod === 'esim' && (
                <div className={styles.deliveryForm}>
                  <div className={styles.infoBox}>
                    <Info size={18} className={styles.infoIcon} />
                    <div>
                      <strong>eSIM 개통에 필요한 정보</strong>
                      <p className={styles.infoText}>
                        설정 &gt; 일반 &gt; 정보에서 확인하거나, 전화 앱에서 *#06# 입력
                      </p>
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <div>
                      <label className={styles.fieldLabel}>
                        휴대폰 모델명 <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={phoneModel}
                        onChange={(e) => setPhoneModel(e.target.value)}
                        className={styles.fieldInput}
                        placeholder="예: iPhone 15 Pro, Galaxy S24"
                      />
                    </div>
                    <div className={styles.fieldRow}>
                      <div className={styles.fieldHalf}>
                        <label className={styles.fieldLabel}>
                          IMEI (1) <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="text"
                          value={imei1}
                          onChange={(e) => setImei1(e.target.value)}
                          maxLength={15}
                          className={`${styles.fieldInput} ${styles.fieldInputMono}`}
                          placeholder="15자리 숫자"
                        />
                      </div>
                      <div className={styles.fieldHalf}>
                        <label className={styles.fieldLabel}>IMEI (2)</label>
                        <input
                          type="text"
                          value={imei2}
                          onChange={(e) => setImei2(e.target.value)}
                          maxLength={15}
                          className={`${styles.fieldInput} ${styles.fieldInputMono}`}
                          placeholder="15자리 숫자 (선택)"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>
                        EID <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={eid}
                        onChange={(e) => setEid(e.target.value)}
                        maxLength={32}
                        className={`${styles.fieldInput} ${styles.fieldInputMono}`}
                        placeholder="32자리 숫자"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 실물 USIM 배송 정보 */}
              {deliveryMethod === 'physical' && (
                <div className={styles.deliveryForm}>
                  <div className={styles.fieldGroup}>
                    <div>
                      <label className={styles.fieldLabel}>
                        배송 주소 <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className={styles.fieldInput}
                        placeholder="서울시 강남구 테헤란로 123 ○○오피스텔 101호"
                      />
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>
                        수령인 연락처 <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="tel"
                        value={deliveryPhone}
                        onChange={(e) => setDeliveryPhone(e.target.value)}
                        className={styles.fieldInput}
                        placeholder="010-0000-0000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 최종 요약 */}
              {deliveryMethod && selectedPlan && (
                <div className={styles.summaryCard}>
                  <h4 className={styles.summaryTitle}>신청 요약</h4>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>요금제</span>
                    <span className={styles.summaryValue}>{selectedPlan.promoName}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>개통 방식</span>
                    <span className={styles.summaryValue}>
                      {verificationType === 'arc' ? '외국인등록증 개통' : '여권 개통'}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>신청자</span>
                    <span className={styles.summaryValue}>
                      {verificationType === 'arc' ? arcName : passportName}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>수령 방법</span>
                    <span className={styles.summaryValue}>
                      {deliveryMethod === 'esim' ? 'eSIM 즉시 발급' : '실물 USIM 택배'}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>가입비 / USIM비</span>
                    <span className={styles.summaryValue}>₩0 (무료)</span>
                  </div>
                  <div className={styles.summaryTotal}>
                    <span className={styles.summaryTotalLabel}>월 청구금액</span>
                    <span className={styles.summaryTotalValue}>
                      ₩{selectedPlan.monthlyPrice}
                    </span>
                  </div>
                  <div className={styles.paymentNotice}>
                    <CreditCardIcon size={20} className={styles.paymentNoticeIcon} />
                    <p className={styles.paymentNoticeText}>
                      결제는 <strong>개통 완료 후 통신사 청구서</strong>로 부과됩니다. 선결제 없음.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================ */}
          {/* STEP 5: 접수 완료 */}
          {/* ============================================ */}
          {currentStep === 5 && (
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>
                <ShieldCheck size={44} />
              </div>
              <h2 className={styles.successTitle}>신청이 접수되었습니다!</h2>
              <p className={styles.successDesc}>
                SKT 공식인증 가입신청서가 정상적으로 접수되었습니다.
                <br />
                담당자 확인 후 카카오톡 또는 입력하신 연락처로 개통 안내를 드립니다.
              </p>
              <div className={styles.successInfo}>
                <div className={styles.successInfoRow}>
                  <span>예상 처리 시간</span>
                  <strong>영업일 기준 1~2시간 이내</strong>
                </div>
                <div className={styles.successInfoRow}>
                  <span>개통 문의</span>
                  <strong>카카오톡 @얼마줄까</strong>
                </div>
              </div>
              <a href={`/${locale}`} className={styles.successLink}>
                메인으로 돌아가기
              </a>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className={styles.navButtons}>
              {currentStep > 1 && (
                <button type="button" onClick={handlePrev} className={styles.btnPrev}>
                  이전
                </button>
              )}
              {/* Step 1에서 요금제 미선택 시 버튼 숨김 */}
              {!(currentStep === 1 && !selectedPlan) && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`${styles.btnNext} ${currentStep === 1 ? styles.btnNextFull : ''}`}
                >
                  {currentStep === 4 ? '동의 및 신청하기' : '다음 단계'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>불러오는 중...</div>}>
      <ApplyPageContent />
    </Suspense>
  );
}
