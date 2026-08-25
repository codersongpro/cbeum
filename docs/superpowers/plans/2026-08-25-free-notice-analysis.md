# Free Notice Analysis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 청주시 공지문 텍스트에서 핵심 정보를 무료로 찾아 보여 주는 입력과 결과 흐름을 만든다.

**Architecture:** 순수 TypeScript 함수가 공지문에서 날짜, 전화번호, 행동 문장을 추출한다. 클라이언트 입력 화면이 결과를 `sessionStorage`에만 저장하고, 결과 화면이 이를 읽어 표시한다. 서버 API와 데이터베이스는 사용하지 않는다.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-08-25-free-notice-analysis-design.md`

## Global Constraints

- 유료 API, 서버 저장, 데이터베이스를 사용하지 않는다.
- 공지문 원문과 결과는 브라우저 `sessionStorage`에만 저장한다.
- 날짜, 전화번호, 행동 문장은 규칙으로 찾고 찾지 못하면 추측하지 않는다.
- 입력 화면의 주요 조작 요소는 최소 48px 높이를 유지한다.
- 개인정보와 계좌번호 입력 금지 안내를 표시한다.

---

### Task 1: 공지문 핵심 정보 추출기

**Files:**
- Create: `lib/notice/analyze.ts`
- Create: `tests/notice-analyze.test.ts`

**Interfaces:**
- Produces: `analyzeNotice(text: string): NoticeAnalysis`
- Produces: `NoticeAnalysis` with `title`, `deadline`, `contact`, `actions`, `warnings`

- [ ] **Step 1: 날짜, 전화번호, 행동 문장 추출 실패 테스트를 작성한다.**

```ts
const result = analyzeNotice("2026. 9. 30.까지 신청서를 제출하세요. 문의: 043-201-1234");
expect(result.deadline).toBe("2026. 9. 30.");
expect(result.contact).toBe("043-201-1234");
expect(result.actions).toEqual(["2026. 9. 30.까지 신청서를 제출하세요."]);
```

- [ ] **Step 2: 테스트가 모듈 없음으로 실패하는지 확인한다.**

Run: `npm.cmd run test -- tests/notice-analyze.test.ts`

- [ ] **Step 3: 빈 줄을 제거하고 문장 단위로 나누는 최소 추출기를 작성한다.**

```ts
export function analyzeNotice(text: string): NoticeAnalysis {
  const lines = text.split(/\n|(?<=[.!?])\s+/).map((line) => line.trim()).filter(Boolean);
  return { title: lines[0] ?? "공지문", deadline: null, contact: null, actions: [], warnings: [] };
}
```

- [ ] **Step 4: 정규식으로 날짜, 전화번호, 행동 문장을 추가하고 테스트를 통과시킨다.**

Run: `npm.cmd run test -- tests/notice-analyze.test.ts`

- [ ] **Step 5: 커밋한다.**

```powershell
git add lib/notice/analyze.ts tests/notice-analyze.test.ts
git commit -m "feat: extract notice details without paid AI"
```

### Task 2: 브라우저 전용 분석 결과 보관

**Files:**
- Create: `lib/notice/storage.ts`
- Create: `tests/notice-storage.test.ts`

**Interfaces:**
- Consumes: `NoticeAnalysis`
- Produces: `saveAnalysis(result)`, `loadAnalysis()`, `clearAnalysis()`

- [ ] **Step 1: 분석 결과를 저장하고 다시 읽는 실패 테스트를 작성한다.**

```ts
saveAnalysis({ title: "청주시 안내", deadline: null, contact: null, actions: [], warnings: [] });
expect(loadAnalysis()?.title).toBe("청주시 안내");
```

- [ ] **Step 2: 테스트가 모듈 없음으로 실패하는지 확인한다.**

Run: `npm.cmd run test -- tests/notice-storage.test.ts`

- [ ] **Step 3: `cbeum.notice-analysis.v1` 키로 sessionStorage 보관 함수를 작성한다.**

```ts
const STORAGE_KEY = "cbeum.notice-analysis.v1";
```

- [ ] **Step 4: 깨진 저장값은 `null`을 반환하도록 하고 테스트를 통과시킨다.**

Run: `npm.cmd run test -- tests/notice-storage.test.ts`

- [ ] **Step 5: 커밋한다.**

```powershell
git add lib/notice/storage.ts tests/notice-storage.test.ts
git commit -m "feat: keep notice results in session storage"
```

### Task 3: 입력과 결과 화면

**Files:**
- Create: `app/analyze/page.tsx`
- Create: `app/analyze/result/page.tsx`
- Create: `components/notice-result.tsx`
- Create: `tests/analyze-page.test.tsx`
- Create: `tests/notice-result.test.tsx`

**Interfaces:**
- Consumes: `analyzeNotice`, `saveAnalysis`, `loadAnalysis`
- Produces: `/analyze` and `/analyze/result` user journeys

- [ ] **Step 1: 입력 화면의 텍스트 영역, 예시 버튼, 빈 입력 안내 실패 테스트를 작성한다.**

```tsx
render(<AnalyzePage />);
expect(screen.getByRole("textbox", { name: "공지문 내용" })).toBeInTheDocument();
await user.click(screen.getByRole("button", { name: "핵심 정보 찾기" }));
expect(screen.getByText("공지문 내용을 입력해 주세요.")).toBeInTheDocument();
```

- [ ] **Step 2: 결과 영역이 마감일과 원문 확인 안내를 보여 주는 실패 테스트를 작성한다.**

```tsx
render(<NoticeResult analysis={{ title: "청주시 안내", deadline: "2026. 9. 30.", contact: null, actions: [], warnings: ["문의처는 원문 확인이 필요합니다."] }} />);
expect(screen.getByText("2026. 9. 30.")).toBeInTheDocument();
expect(screen.getByText("문의처는 원문 확인이 필요합니다.")).toBeInTheDocument();
```

- [ ] **Step 3: 입력 화면에서 분석 후 결과 화면으로 이동하는 클라이언트 컴포넌트를 작성한다.**

- [ ] **Step 4: 결과 화면에서 sessionStorage 값을 읽고, 값이 없으면 입력 화면으로 돌아가는 처리를 작성한다.**

- [ ] **Step 5: 화면 테스트를 통과시킨다.**

Run: `npm.cmd run test -- tests/analyze-page.test.tsx tests/notice-result.test.tsx`

- [ ] **Step 6: 커밋한다.**

```powershell
git add app/analyze components/notice-result.tsx tests/analyze-page.test.tsx tests/notice-result.test.tsx
git commit -m "feat: add free notice analysis journey"
```

### Task 4: 전체 검증과 배포

**Files:**
- Modify: `README.md`

- [ ] **Step 1: README에 무료 텍스트 분석 기능과 한계를 적는다.**

- [ ] **Step 2: 전체 테스트, 린트, 빌드를 실행한다.**

Run:

```powershell
npm.cmd run test
npm.cmd run lint
npm.cmd run build
```

- [ ] **Step 3: 커밋하고 GitHub에 푸시한다.**

```powershell
git add README.md app components lib tests
git commit -m "feat: complete free notice analysis phase"
git push origin main
```
