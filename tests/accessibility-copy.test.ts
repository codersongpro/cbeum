import { describe, expect, it } from "vitest";
import { getCopy } from "@/lib/accessibility/copy";

describe("화면 고정 문구", () => {
  it("한국어와 영어의 시작 버튼 문구를 제공한다", () => {
    expect(getCopy("ko", true).start).toBe("공지 글 붙여 넣기");
    expect(getCopy("en", true).start).toBe("Paste a notice");
  });

  it("쉬운 말을 끄면 설명을 더 자세히 보여 준다", () => {
    expect(getCopy("ko", true).description).not.toBe(getCopy("ko", false).description);
  });
});
