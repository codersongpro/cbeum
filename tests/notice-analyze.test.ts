import { describe, expect, it } from "vitest";
import { analyzeNotice } from "@/lib/notice/analyze";

describe("공지문 핵심 정보 추출", () => {
  it("마감일, 문의처, 해야 할 일을 찾는다", () => {
    const result = analyzeNotice(`청주시 어르신 문화교실 참여자 모집
신청 기간: 2026. 9. 1. ~ 2026. 9. 30.
참여를 원하는 분은 주민센터에 신청서를 제출하세요.
문의: 청주시 복지정책과 043-201-1234`);

    expect(result.title).toBe("청주시 어르신 문화교실 참여자 모집");
    expect(result.deadline).toBe("2026. 9. 30.");
    expect(result.contact).toBe("043-201-1234");
    expect(result.actions).toEqual([
      "참여를 원하는 분은 주민센터에 신청서를 제출하세요.",
    ]);
  });

  it("찾지 못한 정보는 원문 확인 안내를 남긴다", () => {
    const result = analyzeNotice("청주시 도서관 휴관 안내\n내부 정비를 위해 휴관합니다.");

    expect(result.deadline).toBeNull();
    expect(result.contact).toBeNull();
    expect(result.warnings).toContain("마감일은 원문 확인이 필요합니다.");
    expect(result.warnings).toContain("문의처는 원문 확인이 필요합니다.");
  });
});
