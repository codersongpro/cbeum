import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NoticeResult } from "@/components/notice-result";

describe("공지문 분석 결과", () => {
  it("찾은 정보와 원문 확인 안내를 보여 준다", () => {
    render(
      <NoticeResult
        analysis={{
          title: "청주시 어르신 문화교실 참여자 모집",
          deadline: "2026. 9. 30.",
          contact: "043-201-1234",
          actions: ["주민센터에 신청서를 제출하세요."],
          warnings: ["자격 조건은 원문 확인이 필요합니다."],
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "청주시 어르신 문화교실 참여자 모집" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2026. 9. 30.")).toBeInTheDocument();
    expect(screen.getByText("043-201-1234")).toBeInTheDocument();
    expect(screen.getByText("주민센터에 신청서를 제출하세요.")).toBeInTheDocument();
    expect(screen.getByText("자격 조건은 원문 확인이 필요합니다.")).toBeInTheDocument();
  });
});
