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

  it("충북에서 많이 쓰는 언어의 시작 버튼 문구를 제공한다", () => {
    expect(getCopy("zh-CN", true).start).toBe("粘贴公告");
    expect(getCopy("vi", true).start).toBe("Dán thông báo");
    expect(getCopy("fil", true).start).toBe("Idikit ang paunawa");
    expect(getCopy("ja", true).start).toBe("お知らせを貼り付ける");
    expect(getCopy("ru", true).start).toBe("Вставить объявление");
  });

  it("어린이용 화면은 더 쉬운 시작 문구를 제공한다", () => {
    expect(getCopy("ko", true, true).start).toBe("공지 글 같이 보기");
  });
});
