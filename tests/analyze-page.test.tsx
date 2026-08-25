import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AnalyzePage from "@/app/analyze/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("공지문 입력 화면", () => {
  it("빈 공지문은 분석하지 않고 입력 안내를 보여 준다", async () => {
    const user = userEvent.setup();
    render(<AnalyzePage />);

    expect(screen.getByRole("textbox", { name: "공지 글" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "중요한 내용 보기" }));

    expect(screen.getByText("공지 글을 붙여 넣어 주세요.")).toBeInTheDocument();
  });

  it("청주시 예시를 입력 영역에 불러온다", async () => {
    const user = userEvent.setup();
    render(<AnalyzePage />);

    await user.click(screen.getByRole("button", { name: "예시 글 보기" }));

    expect(
      (screen.getByRole("textbox", { name: "공지 글" }) as HTMLTextAreaElement).value,
    ).toContain("청주시");
  });
});
