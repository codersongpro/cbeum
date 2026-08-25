# Senior and Child Modes Implementation Plan

**Goal:** 노인은 더 크게 보고, 어린이는 쉬운 말로 공지 글 정리 기능을 시작할 수 있게 한다.

**Architecture:** 기존 브라우저 설정 객체에 `extraLarge` 글자 크기와 `childMode`를 추가한다. CSS는 HTML의 `data-text-size` 속성으로 전체 화면 크기를 조절하고, 첫 화면은 저장된 `childMode`에 따라 짧은 한국어 안내 문구만 바꾼다.

## Tasks

1. `AccessibilitySettings`와 저장 테스트에 `extraLarge`, `childMode`를 추가한다.
2. 설정 화면에 `아주 큰 글자`, `어린이용 화면` 선택지를 추가한다.
3. 큰 화면 CSS와 어린이용 첫 화면 문구를 구현한다.
4. 전체 테스트, 린트, 빌드, 공개 배포를 확인한다.
