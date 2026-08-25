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

    expect(screen.getByRole("textbox", { name: "공지문 내용" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "핵심 정보 찾기" }));

    expect(screen.getByText("공지문 내용을 입력해 주세요.")).toBeInTheDocument();
  });

  it("청주시 예시를 입력 영역에 불러온다", async () => {
    const user = userEvent.setup();
    render(<AnalyzePage />);

    await user.click(screen.getByRole("button", { name: "청주시 예시 불러오기" }));

    expect(
      (screen.getByRole("textbox", { name: "공지문 내용" }) as HTMLTextAreaElement).value,
    ).toContain("청주시");
  });
});
