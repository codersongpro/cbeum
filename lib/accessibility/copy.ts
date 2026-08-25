import type { AccessibilitySettings } from "@/lib/accessibility/storage";

type HomeCopy = {
  settings: string;
  eyebrow: string;
  titleFirst: string;
  titleSecond: string;
  description: string;
  start: string;
  firstStepTitle: string;
  firstStepDescription: string;
  secondStepTitle: string;
  secondStepDescription: string;
  thirdStepTitle: string;
  thirdStepDescription: string;
};

const KOREAN_SIMPLE: HomeCopy = {
  settings: "글자와 언어",
  eyebrow: "공지 글 정리",
  titleFirst: "공지 글에서",
  titleSecond: "중요한 것만 보세요",
  description: "공지 글을 붙여 넣으면 날짜, 전화번호, 할 일을 보여 드립니다.",
  start: "공지 글 붙여 넣기",
  firstStepTitle: "1. 글 붙여 넣기",
  firstStepDescription: "공지 글을 그대로 넣으세요.",
  secondStepTitle: "2. 중요한 내용 보기",
  secondStepDescription: "날짜, 전화번호, 할 일을 봅니다.",
  thirdStepTitle: "누구나 사용 가능",
  thirdStepDescription: "어려운 공지 글을 짧게 정리해 봅니다.",
};

const KOREAN_STANDARD: HomeCopy = {
  ...KOREAN_SIMPLE,
  description: "공지 글을 붙여 넣으면 마감 날짜, 문의 전화번호, 필요한 행동을 차례대로 정리해 보여 드립니다.",
  firstStepDescription: "공지 글 전체를 복사해 입력 칸에 붙여 넣으세요.",
  secondStepDescription: "정리된 날짜, 전화 문의, 해야 할 일을 확인합니다.",
};

const ENGLISH: HomeCopy = {
  settings: "Text and language",
  eyebrow: "Notice helper",
  titleFirst: "Find the important parts",
  titleSecond: "of a notice",
  description: "Paste a notice to see dates, phone numbers, and things to do.",
  start: "Paste a notice",
  firstStepTitle: "1. Paste the notice",
  firstStepDescription: "Copy the notice and paste it here.",
  secondStepTitle: "2. See key information",
  secondStepDescription: "Check dates, phone numbers, and tasks.",
  thirdStepTitle: "Made for everyone",
  thirdStepDescription: "Read long notices in a shorter form.",
};

export function getCopy(
  language: AccessibilitySettings["language"],
  simpleLanguage = true,
): HomeCopy {
  if (language === "en") return ENGLISH;
  return simpleLanguage ? KOREAN_SIMPLE : KOREAN_STANDARD;
}
