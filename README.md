# 얼마줄까 (Eolma-Julkka) - 외국인 USIM 다국어 플랫폼

외국인 유학생, 근로자 등을 대상으로 투명하고 신뢰성 있는 USIM/eSIM 및 모바일 요금제 가입 서비스를 제공하는 다국어 웹 애플리케이션 플랫폼입니다. 

## 프로젝트 주요 기능
- **다국어 지원 (i18n)**: 한국어(ko), 영어(en), 중국어(zh), 베트남어(vi) 시스템 설계.
- **5단계 직관적 신청 플로우**: `ARC 인증` ➔ `요금제 선택` ➔ `방식 및 배송` ➔ `약관 및 결제` ➔ `완료`.
- **안심정찰제 및 보증제도 UI**: 외국인 사용자들을 위한 다국어 신뢰(행동 경제학) 기반 UX/UI 적용. 

## 기술 스택
- **프레임워크**: Next.js 16 (App Router), React 19
- **스타일링**: Tailwind CSS v4, CSS Module, Radix UI, Framer Motion
- **글로벌 상태/다국어**: `next-intl`
- **데이터베이스/ORM**: Neon DB (PostgreSQL), Prisma v5.18.0
- **배포 인프라**: Netlify

## 로컬 개발 및 실행 방법

1. 패키지 설치
```bash
npm install
```

2. 데이터베이스 설정 및 Prisma 초기화
루트 디렉토리의 `.env.local` 또는 `.env` 파일에 `NETLIFY_DATABASE_URL` 변수를 설정해야 합니다.
```bash
NETLIFY_DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]/[DB_NAME]"
```
```bash
npx prisma generate
```

3. 로컬 서버 실행
```bash
npm run dev
```
접속: [http://localhost:3000](http://localhost:3000)

## 배포 규칙 (Netlify)
- 반드시 Netlify Build 명령은 `npm ci && npm run build` 구조를 준수해야 합니다 (`netlify.toml` 참조).
- 배포 컨테이너 내 캐싱 문제로 인해 `postinstall` 스크립트를 통해 `prisma generate`가 자동 실행되도록 설정되어 있습니다.

> **주의(Warning)**: Prisma Migration 진행 전 `drop table` 또는 `drop column`이 포함되어 있지 않은지 `.sql` 마이그레이션 파일을 반드시 수동으로 검증해 주세요. (데이터 손실 방지 정책)
