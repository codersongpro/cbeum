import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("첫 화면", () => {
  it("청주시 생활이음의 시작 행동을 보여준다", () => {
    render(<Home />);

    expect(screen.getByText("충북이음 AI")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /공지문 읽기/ }),
    ).toHaveAttribute("href", "/analyze");
  });
});
