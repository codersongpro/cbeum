# Accessibility Settings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 사용자가 글자 크기, 쉬운 말, 한국어와 영어 화면 언어를 이 기기에 저장해 더 편하게 공지 글을 읽게 한다.

**Architecture:** 설정값은 브라우저 `localStorage`의 `cbeum.accessibility.v1` 키에만 저장한다. 설정 모듈은 저장값 검증과 기본값 복구를 담당하고, 설정 화면은 값을 고르기만 한다. 화면 문구는 고정 문구 사전으로 관리하며, 공지 원문은 번역하거나 서버로 보내지 않는다.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, Testing Library

**Spec:** 사용자 승인 대화: 글자 크기, 쉬운 말, 한국어·영어 설정을 무료·브라우저 전용으로 제공

## Global Constraints

- 유료 API, 로그인, 서버 저장, 데이터베이스를 사용하지 않는다.
- 공지 원문과 개인정보를 번역하거나 외부 서비스로 보내지 않는다.
- 주요 조작 요소는 최소 48px 높이를 유지한다.
- 기본 문구는 짧고 쉬운 한국어를 사용한다.
- 영어는 화면의 고정 문구에만 적용한다.

---

### Task 1: 접근성 설정 저장

**Files:**
- Create: `lib/accessibility/storage.ts`
- Create: `tests/accessibility-storage.test.ts`

**Interfaces:**
- Produces: `AccessibilitySettings`, `loadAccessibilitySettings()`, `saveAccessibilitySettings()`

- [ ] **Step 1: 설정 저장 실패 테스트를 작성한다.**

```ts
saveAccessibilitySettings({ textSize: "large", simpleLanguage: true, language: "en" });
expect(loadAccessibilitySettings()).toEqual({ textSize: "large", simpleLanguage: true, language: "en" });
```

- [ ] **Step 2: 테스트가 모듈 없음으로 실패하는지 확인한다.**

Run: `npm.cmd run test -- tests/accessibility-storage.test.ts`

- [ ] **Step 3: 기본값과 저장값 검증을 구현한다.**

```ts
export type AccessibilitySettings = {
  textSize: "default" | "large";
  simpleLanguage: boolean;
  language: "ko" | "en";
};

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  textSize: "default",
  simpleLanguage: true,
  language: "ko",
};
```

- [ ] **Step 4: 저장과 깨진 값 복구 테스트를 통과시킨다.**

Run: `npm.cmd run test -- tests/accessibility-storage.test.ts`

### Task 2: 설정 화면과 글자 크기 적용

**Files:**
- Create: `app/settings/page.tsx`
- Modify: `app/globals.css`
- Modify: `app/page.tsx`
- Test: `tests/settings-page.test.tsx`

**Interfaces:**
- Consumes: `AccessibilitySettings`, `loadAccessibilitySettings()`, `saveAccessibilitySettings()`
- Produces: `/settings` 화면과 `data-text-size` 속성

- [ ] **Step 1: 설정 화면의 큰 글자 선택과 저장 안내 실패 테스트를 작성한다.**

```tsx
render(<SettingsPage />);
await user.click(screen.getByRole("radio", { name: "큰 글자" }));
await user.click(screen.getByRole("button", { name: "저장하기" }));
expect(screen.getByText("저장했습니다.")).toBeInTheDocument();
```

- [ ] **Step 2: 설정 화면을 구현한다.**

`보통 글자`, `큰 글자`, `쉬운 말로 보기`, `한국어`, `English`을 라디오 버튼과 체크 상자로 제공한다. 저장 뒤 홈으로 돌아가는 링크를 제공한다.

- [ ] **Step 3: 큰 글자 CSS 변수를 구현한다.**

```css
[data-text-size="large"] {
  font-size: 112.5%;
}
```

- [ ] **Step 4: 설정 화면 테스트와 린트를 통과시킨다.**

Run:

```powershell
npm.cmd run test -- tests/settings-page.test.tsx
npm.cmd run lint
```

### Task 3: 고정 문구 영어 전환

**Files:**
- Create: `lib/accessibility/copy.ts`
- Modify: `app/settings/page.tsx`
- Modify: `app/page.tsx`
- Test: `tests/accessibility-copy.test.ts`

**Interfaces:**
- Produces: `getCopy(language)`

- [ ] **Step 1: 한국어와 영어의 홈 버튼 문구 테스트를 작성한다.**

```ts
expect(getCopy("ko").start).toBe("공지 글 붙여 넣기");
expect(getCopy("en").start).toBe("Paste a notice");
```

- [ ] **Step 2: 화면 고정 문구 사전을 구현한다.**

공지 원문, 분석 결과, 사용자가 넣은 내용은 번역하지 않는다.

- [ ] **Step 3: 저장된 언어를 홈에서 읽어 버튼·제목을 바꾼다.**

- [ ] **Step 4: 전체 테스트, 린트, 빌드를 통과시킨다.**

Run:

```powershell
npm.cmd run test
npm.cmd run lint
npm.cmd run build
```

- [ ] **Step 5: GitHub와 Vercel에 반영한다.**

```powershell
git add app lib tests docs
git commit -m "feat: add accessible display settings"
git push origin main
```
