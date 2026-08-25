import { beforeEach, describe, expect, it } from "vitest";
import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  loadAccessibilitySettings,
  saveAccessibilitySettings,
} from "@/lib/accessibility/storage";

describe("접근성 설정 저장", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("글자 크기, 쉬운 말, 화면 언어를 저장하고 다시 읽는다", () => {
    saveAccessibilitySettings({
      textSize: "large",
      simpleLanguage: true,
      language: "en",
      childMode: false,
    });

    expect(loadAccessibilitySettings()).toEqual({
      textSize: "large",
      simpleLanguage: true,
      language: "en",
      childMode: false,
    });
  });

  it("깨진 저장값은 기본 설정으로 되돌린다", () => {
    window.localStorage.setItem("cbeum.accessibility.v1", "not-json");

    expect(loadAccessibilitySettings()).toEqual(DEFAULT_ACCESSIBILITY_SETTINGS);
  });

  it("추가한 화면 언어를 저장한다", () => {
    saveAccessibilitySettings({
      textSize: "default",
      simpleLanguage: true,
      language: "vi",
      childMode: false,
    });

    expect(loadAccessibilitySettings().language).toBe("vi");
  });

  it("아주 큰 글자와 어린이용 화면 설정을 저장한다", () => {
    saveAccessibilitySettings({
      textSize: "extraLarge",
      simpleLanguage: true,
      language: "ko",
      childMode: true,
    });

    expect(loadAccessibilitySettings()).toMatchObject({
      textSize: "extraLarge",
      childMode: true,
    });
  });
});
