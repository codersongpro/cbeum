import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import SettingsPage from "@/app/settings/page";

describe("글자와 언어 설정 화면", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("큰 글자를 고르고 저장할 수 있다", async () => {
    const user = userEvent.setup();
    render(<SettingsPage />);

    await user.click(screen.getByRole("radio", { name: "큰 글자" }));
    await user.click(screen.getByRole("button", { name: "저장하기" }));

    expect(screen.getByText("저장했습니다.")).toBeInTheDocument();
  });
});
