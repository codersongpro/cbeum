import { afterEach, describe, expect, it } from "vitest";
import type { NoticeAnalysis } from "@/lib/notice/analyze";
import { clearAnalysis, loadAnalysis, saveAnalysis } from "@/lib/notice/storage";

const analysis: NoticeAnalysis = {
  title: "청주시 안내",
  deadline: "2026. 9. 30.",
  contact: "043-201-1234",
  actions: ["신청서를 제출하세요."],
  warnings: [],
};

afterEach(() => {
  sessionStorage.clear();
});

describe("공지문 분석 결과 보관", () => {
  it("현재 브라우저 탭에서만 분석 결과를 다시 읽는다", () => {
    saveAnalysis(analysis);

    expect(loadAnalysis()).toEqual(analysis);
  });

  it("깨진 저장값은 분석 결과로 사용하지 않는다", () => {
    sessionStorage.setItem("cbeum.notice-analysis.v1", "not-json");

    expect(loadAnalysis()).toBeNull();
  });

  it("결과를 지우면 더 이상 읽을 수 없다", () => {
    saveAnalysis(analysis);
    clearAnalysis();

    expect(loadAnalysis()).toBeNull();
  });
});
