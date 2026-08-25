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

const KOREAN_CHILD: HomeCopy = {
  settings: "글자와 언어",
  eyebrow: "공지 글 같이 보기",
  titleFirst: "공지 글에서",
  titleSecond: "중요한 것 찾기",
  description: "글을 넣으면 날짜, 전화번호, 할 일을 알려 줘요.",
  start: "공지 글 같이 보기",
  firstStepTitle: "1. 글 넣기",
  firstStepDescription: "공지 글을 복사해서 넣어요.",
  secondStepTitle: "2. 중요한 것 보기",
  secondStepDescription: "언제까지, 누구에게 전화할지 봐요.",
  thirdStepTitle: "천천히 같이 보기",
  thirdStepDescription: "모르는 말은 어른과 함께 확인해요.",
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

const CHINESE_SIMPLIFIED: HomeCopy = {
  settings: "文字和语言",
  eyebrow: "公告整理",
  titleFirst: "查看公告中的",
  titleSecond: "重要内容",
  description: "粘贴公告后，可以查看日期、电话号码和要做的事。",
  start: "粘贴公告",
  firstStepTitle: "1. 粘贴公告",
  firstStepDescription: "复制公告并粘贴到这里。",
  secondStepTitle: "2. 查看重要内容",
  secondStepDescription: "查看日期、电话号码和要做的事。",
  thirdStepTitle: "所有人都能使用",
  thirdStepDescription: "把较长的公告整理得更简短。",
};

const VIETNAMESE: HomeCopy = {
  settings: "Cỡ chữ và ngôn ngữ",
  eyebrow: "Tóm tắt thông báo",
  titleFirst: "Xem phần quan trọng",
  titleSecond: "trong thông báo",
  description: "Dán thông báo để xem ngày, số điện thoại và việc cần làm.",
  start: "Dán thông báo",
  firstStepTitle: "1. Dán thông báo",
  firstStepDescription: "Sao chép thông báo và dán vào đây.",
  secondStepTitle: "2. Xem thông tin chính",
  secondStepDescription: "Kiểm tra ngày, số điện thoại và việc cần làm.",
  thirdStepTitle: "Dành cho mọi người",
  thirdStepDescription: "Đọc thông báo dài bằng nội dung ngắn hơn.",
};

const FILIPINO: HomeCopy = {
  settings: "Teksto at wika",
  eyebrow: "Buod ng paunawa",
  titleFirst: "Tingnan ang mahalagang bahagi",
  titleSecond: "ng paunawa",
  description: "Idikit ang paunawa para makita ang petsa, numero ng telepono, at gagawin.",
  start: "Idikit ang paunawa",
  firstStepTitle: "1. Idikit ang paunawa",
  firstStepDescription: "Kopyahin ang paunawa at idikit ito rito.",
  secondStepTitle: "2. Tingnan ang mahalagang impormasyon",
  secondStepDescription: "Tingnan ang petsa, numero ng telepono, at gagawin.",
  thirdStepTitle: "Para sa lahat",
  thirdStepDescription: "Basahin ang mahabang paunawa sa mas maikling anyo.",
};

const JAPANESE: HomeCopy = {
  settings: "文字と言語",
  eyebrow: "お知らせの整理",
  titleFirst: "お知らせの大切な部分を",
  titleSecond: "確認しましょう",
  description: "お知らせを貼り付けると、日付、電話番号、することを確認できます。",
  start: "お知らせを貼り付ける",
  firstStepTitle: "1. お知らせを貼り付ける",
  firstStepDescription: "お知らせをコピーして、ここに貼り付けます。",
  secondStepTitle: "2. 大切な情報を見る",
  secondStepDescription: "日付、電話番号、することを確認します。",
  thirdStepTitle: "だれでも使えます",
  thirdStepDescription: "長いお知らせを短く整理して読みます。",
};

const RUSSIAN: HomeCopy = {
  settings: "Текст и язык",
  eyebrow: "Кратко об объявлении",
  titleFirst: "Посмотрите важное",
  titleSecond: "в объявлении",
  description: "Вставьте объявление, чтобы увидеть дату, номер телефона и список дел.",
  start: "Вставить объявление",
  firstStepTitle: "1. Вставьте объявление",
  firstStepDescription: "Скопируйте объявление и вставьте его сюда.",
  secondStepTitle: "2. Посмотрите важную информацию",
  secondStepDescription: "Проверьте дату, номер телефона и список дел.",
  thirdStepTitle: "Для всех",
  thirdStepDescription: "Читайте длинные объявления в короткой форме.",
};

export function getCopy(
  language: AccessibilitySettings["language"],
  simpleLanguage = true,
  childMode = false,
): HomeCopy {
  if (language === "ko" && childMode) return KOREAN_CHILD;
  if (language === "en") return ENGLISH;
  if (language === "zh-CN") return CHINESE_SIMPLIFIED;
  if (language === "vi") return VIETNAMESE;
  if (language === "fil") return FILIPINO;
  if (language === "ja") return JAPANESE;
  if (language === "ru") return RUSSIAN;
  return simpleLanguage ? KOREAN_SIMPLE : KOREAN_STANDARD;
}
