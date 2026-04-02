# 얼마줄까 (Eolma-Julkka) - 외국인 전용 USIM/eSIM 다국어 플랫폼

외국인 유학생, 근로자들을 위해 투명한 요금 체계와 신뢰 중심의 UI를 제공하는 다국어 알뜰폰(MVNO) 가입 플랫폼입니다. 

---

## 🌟 핵심 UX: 5단계 고전환 신청 프로세스

사용자 이탈률을 최소화하기 위해 행동 경제학 원칙을 적용한 5단계 신청 플로우를 제공합니다.

1.  **Step 1: 요금제 확인** - 선택한 요금제의 혜택과 가격을 최종 확인. (미선택 시 요금제 페이지 유도)
2.  **Step 2: 개통 방식 선택** - ARC(외국인등록증) 또는 Passport(여권) 중 선택.
3.  **Step 3: 신분증 정보 입력** - 안전한 본인 인증을 위한 정보 입력 및 서류 업로드.
4.  **Step 4: 수령 방법 선택** - eSIM(즉시 발급) 또는 실물 USIM(택배 배송) 선택. 카카오 우편번호 서비스를 통한 정확한 주소 입력 및 상세 주소 필드 지원.
5.  **Step 5: 접수 완료** - 공식 서류 접수 완료 및 개통 안내 메시지 제공.

---

## 🛠️ 주요 기능 및 업데이트 (Major Updates)

- **어드민 대시보드 UI 고도화**: 레퍼런스 디자인을 기반으로 모달 내 상세 정보를 2컬럼 테이블 레이아웃으로 전면 재설계했습니다. (신분증 번호/여권번호 라벨 오류 수정 포함)
- **카카오 우편주소 API 연동**: 배송 주소 입력 시 정확성을 높이기 위해 Daum 우편번호 서비스를 통합하고 상세 주소 필드를 분리했습니다.
- **반응형 디자인 최적화**: 모든 기기에서 여백 잘림 없이 쾌적하게 정보를 확인할 수 있도록 UI/UX를 개선했습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 | 상세 |
| :--- | :--- | :--- |
| **Frontend** | Next.js 16 (App Router) | React 19 기반 최신 프레임워크 |
| **Styling** | Tailwind CSS v4, CSS Modules | 유연하고 빠른 스타일링 |
| **Database** | Neon DB (PostgreSQL) | Serverless PostgreSQL |
| **ORM** | Prisma v5.18.0 | 타입 안전한 DB 상호작용 |
| **i18n** | next-intl | 한국어, 영어, 중국어, 베트남어 지원 |
| **Deployment** | Netlify | CI/CD 및 자동 배포 인프라 |

---

## 🚀 로컬 빌드 및 배포 가이드

### 1. 환경 설정 (.env.local)
```bash
# Neon DB 연결 주소 (Netlify 연동 규칙 준수)
NETLIFY_DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]/neondb?sslmode=require"
```

### 2. 패키지 설치 및 빌드
```bash
npm ci
npx prisma generate
npm run build
```

---

## ⚠️ 배포 및 개발 주의사항

- **Prisma 버전**: 플랫폼 호환성을 위해 `prisma@^5.18.0` 버전을 엄격히 준수합니다.
- **빌드 명령**: Netlify 빌드 시 `npm ci && npm run build`를 사용해야 의존성 충돌을 방지합니다.
- **데이터 보안**: 마이그레이션 시 `DROP TABLE` 등 데이터 손실을 유발하는 쿼리가 있는지 `.sql` 파일을 반드시 수동 검토하십시오.
