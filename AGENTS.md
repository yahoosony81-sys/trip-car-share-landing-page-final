# 프로젝트 코드베이스 분석 문서

## 프로젝트 개요

**프로젝트명**: TripCarShare Landing Page  
**프로젝트 타입**: Next.js 기반 랜딩 페이지  
**언어**: TypeScript  
**스타일링**: Tailwind CSS  
**패키지 매니저**: pnpm

---

## 폴더 구조

```
trip-car-share-landing-page-final/
├── app/                          # Next.js App Router 디렉토리
│   ├── api/                      # API 라우트
│   │   └── waitlist/
│   │       └── route.ts         # 웨이팅 리스트 등록 API 엔드포인트
│   ├── layout.tsx                # 루트 레이아웃 컴포넌트
│   ├── page.tsx                  # 메인 페이지 컴포넌트
│   └── globals.css               # 글로벌 스타일시트
├── components/                   # React 컴포넌트
│   ├── ui/                       # 재사용 가능한 UI 컴포넌트 (Radix UI 기반)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ... (50개 이상의 UI 컴포넌트)
│   ├── demo-preview.tsx          # 데모 미리보기 섹션
│   ├── footer.tsx                # 푸터 컴포넌트
│   ├── hero-section.tsx          # 히어로 섹션 (메인 배너)
│   ├── service-summary.tsx       # 서비스 요약 섹션
│   ├── theme-provider.tsx        # 테마 프로바이더 (다크/라이트 모드)
│   ├── use-case-scenarios.tsx   # 사용 사례 시나리오 섹션
│   └── waitlist-modal.tsx       # 웨이팅 리스트 등록 모달
├── hooks/                        # 커스텀 React 훅
│   ├── use-mobile.ts            # 모바일 디바이스 감지 훅
│   └── use-toast.ts             # 토스트 알림 훅
├── lib/                          # 유틸리티 함수
│   └── utils.ts                 # 클래스명 병합 유틸리티 (cn 함수)
├── public/                       # 정적 파일
│   ├── icon-*.png               # 파비콘 파일들
│   ├── *.jpg                    # 이미지 파일들
│   └── *.svg                    # SVG 아이콘 파일들
├── styles/                       # 스타일 파일
│   └── globals.css              # 글로벌 스타일 (중복?)
├── .cursor/                      # Cursor IDE 설정
│   └── rules/
│       └── myrule.mdc           # 프로젝트 규칙 파일
├── components.json               # 컴포넌트 설정 파일
├── next.config.mjs              # Next.js 설정 파일
├── package.json                 # 프로젝트 의존성 및 스크립트
├── pnpm-lock.yaml               # pnpm 잠금 파일
├── postcss.config.mjs           # PostCSS 설정 파일
└── tsconfig.json                # TypeScript 설정 파일
```

---

## 애플리케이션 시작점

### 1. 진입점 (Entry Point)

**`app/layout.tsx`** - 루트 레이아웃 컴포넌트
- Next.js App Router의 최상위 레이아웃
- 메타데이터 설정 (제목, 설명, 아이콘)
- 폰트 설정 (Noto Sans KR - 한글 지원)
- Vercel Analytics 통합
- HTML 구조 및 기본 스타일 적용

**`app/page.tsx`** - 메인 페이지 컴포넌트
- 랜딩 페이지의 메인 진입점
- 다음 섹션들을 순차적으로 렌더링:
  1. `HeroSection` - 메인 히어로 배너
  2. `ServiceSummary` - 서비스 요약
  3. `UseCaseScenarios` - 사용 사례 시나리오
  4. `DemoPreview` - 데모 미리보기
  5. `Footer` - 푸터

### 2. 개발 서버 실행

```bash
pnpm run dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

### 3. 빌드 및 프로덕션 실행

```bash
# 프로덕션 빌드
pnpm run build

# 프로덕션 서버 실행
pnpm run start
```

---

## 상태 관리

### 1. 로컬 상태 관리 (Local State)

프로젝트는 **복잡한 전역 상태 관리 라이브러리 없이** React의 기본 `useState` 훅을 사용합니다.

**주요 사용 예시:**

- **`components/hero-section.tsx`**
  ```typescript
  const [isModalOpen, setIsModalOpen] = useState(false)
  ```
  - 모달 열림/닫힘 상태 관리

- **`components/waitlist-modal.tsx`**
  ```typescript
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  ```
  - 폼 입력값, 로딩 상태, 성공/에러 상태 관리

### 2. Toast 알림 시스템

**`hooks/use-toast.ts`** - 토스트 알림을 위한 커스텀 훅
- **Reducer 패턴** 사용 (단순한 전역 상태 관리)
- 메모리 기반 상태 관리 (Context API 없이)
- 리스너 패턴으로 상태 변경 알림
- 자동 제거 타이머 기능

**사용 방법:**
```typescript
import { useToast } from "@/hooks/use-toast"

const { toast } = useToast()
toast({ title: "알림", description: "메시지 내용" })
```

### 3. 서버 상태 관리

**API Route** (`app/api/waitlist/route.ts`)
- Next.js의 Route Handler 사용
- 서버 사이드에서 Notion API와 통신
- 클라이언트는 `fetch` API로 호출

**데이터 흐름:**
```
클라이언트 컴포넌트 (waitlist-modal.tsx)
  ↓ fetch API 호출
서버 API Route (app/api/waitlist/route.ts)
  ↓ Notion API 호출
Notion 데이터베이스
```

### 4. 테마 상태 관리

**`components/theme-provider.tsx`**
- `next-themes` 라이브러리 사용
- 다크/라이트 모드 전환
- 시스템 설정 감지 지원

---

## 주요 기술 스택

### 프레임워크 및 라이브러리

- **Next.js 16.0.3** - React 프레임워크 (App Router)
- **React 19.2.0** - UI 라이브러리
- **TypeScript 5** - 타입 안정성
- **Tailwind CSS 4.1.9** - 유틸리티 기반 CSS 프레임워크

### UI 컴포넌트 라이브러리

- **Radix UI** - 접근성 있는 헤드리스 UI 컴포넌트
  - Dialog, Button, Input, Select 등 50개 이상의 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **next-themes** - 테마 관리

### 유틸리티 라이브러리

- **clsx** - 조건부 클래스명 병합
- **tailwind-merge** - Tailwind 클래스명 충돌 해결
- **class-variance-authority** - 컴포넌트 변형 관리

### 폼 관리

- **react-hook-form** - 폼 상태 관리
- **zod** - 스키마 검증
- **@hookform/resolvers** - Zod와 react-hook-form 통합

### 기타

- **@vercel/analytics** - 웹사이트 분석
- **date-fns** - 날짜 처리
- **recharts** - 차트 라이브러리

---

## 주요 기능

### 1. 랜딩 페이지 섹션

- **Hero Section**: 메인 배너 및 CTA 버튼
- **Service Summary**: 서비스 핵심 가치 제안
- **Use Case Scenarios**: 실제 사용 사례 시나리오
- **Demo Preview**: 앱 데모 미리보기
- **Footer**: 푸터 정보

### 2. 웨이팅 리스트 등록

- 모달 기반 등록 폼
- 이름 및 이메일 입력
- Notion 데이터베이스 연동
- 성공/에러 상태 처리

### 3. 반응형 디자인

- 모바일/데스크톱 대응
- `use-mobile` 훅으로 디바이스 감지
- Tailwind CSS 반응형 유틸리티 사용

### 4. 다크/라이트 모드

- `next-themes`로 테마 전환
- 시스템 설정 자동 감지
- 테마별 아이콘 지원

---

## 환경 변수

프로젝트에서 사용하는 환경 변수:

- `NOTION_DATABASE_ID` - Notion 데이터베이스 ID
- `NOTION_API_KEY` - Notion API 키

`.env.local` 파일에 설정해야 합니다:
```
NOTION_DATABASE_ID=your_database_id
NOTION_API_KEY=your_api_key
```

---

## 코드 스타일 및 규칙

프로젝트의 주요 코딩 규칙 (`.cursor/rules/myrule.mdc` 참조):

1. **컴포넌트 구조**
   - Next.js 페이지는 단일 파일로 작성 (불필요한 분리 최소화)
   - 기능에 의해 분리가 불가피한 경우만 분리

2. **API 및 서버 액션**
   - 모든 API 호출은 Next.js 서버 액션 활용
   - Notion API 관련 로직은 서버 액션 한 개로 제한

3. **스타일링**
   - Tailwind CSS만 사용
   - 별도의 컴포넌트 분리 없이 클래스명으로 처리

4. **상태 관리**
   - 변수 선언 및 상태 관리 최소화
   - 복잡한 상태 관리 (useReducer 등) 사용 자제
   - 단순한 useState 훅 사용 권장

5. **타입 정의**
   - 복잡한 인터페이스보다 간단한 타입 사용
   - 단순 인터페이스만 사용

6. **패키지 매니저**
   - pnpm 사용 (npm 대신)

---

## 빌드 설정

### Next.js 설정 (`next.config.mjs`)

```javascript
{
  typescript: {
    ignoreBuildErrors: true  // 빌드 시 TypeScript 에러 무시
  },
  images: {
    unoptimized: true  // 이미지 최적화 비활성화
  }
}
```

### TypeScript 설정 (`tsconfig.json`)

- 타겟: ES6
- 모듈: ESNext
- JSX: preserve
- 경로 별칭: `@/*` → `./*`

---

## 데이터 흐름

### 웨이팅 리스트 등록 플로우

```
1. 사용자가 "웨이팅 리스트 등록하기" 버튼 클릭
   ↓
2. HeroSection에서 isModalOpen 상태를 true로 변경
   ↓
3. WaitlistModal 컴포넌트 렌더링
   ↓
4. 사용자가 이름/이메일 입력 후 제출
   ↓
5. fetch API로 /api/waitlist 엔드포인트 호출
   ↓
6. 서버에서 입력값 검증 (이름, 이메일 형식)
   ↓
7. Notion API로 데이터베이스에 페이지 생성
   ↓
8. 성공/실패 응답 반환
   ↓
9. 클라이언트에서 성공/에러 상태 표시
```

---

## 향후 개선 사항 제안

1. **상태 관리**
   - 전역 상태가 필요해지면 Context API 또는 Zustand 고려
   - 현재는 로컬 상태로 충분하지만, 확장 시 고려 필요

2. **에러 처리**
   - 전역 에러 바운더리 추가
   - API 에러 처리 개선

3. **성능 최적화**
   - 이미지 최적화 활성화 (Next.js Image 컴포넌트 사용)
   - 코드 스플리팅 고려

4. **테스트**
   - 단위 테스트 추가 (Jest, React Testing Library)
   - E2E 테스트 추가 (Playwright, Cypress)

5. **접근성**
   - ARIA 레이블 추가
   - 키보드 네비게이션 개선

---

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Radix UI 공식 문서](https://www.radix-ui.com/)
- [Notion API 문서](https://developers.notion.com/)

---

**문서 생성일**: 2024년  
**프로젝트 버전**: 0.1.0

