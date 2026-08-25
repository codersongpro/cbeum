export type NoticeAnalysis = {
  title: string;
  deadline: string | null;
  contact: string | null;
  actions: string[];
  warnings: string[];
};

const DATE_PATTERN = /\d{4}[.\-/\s]\s*\d{1,2}[.\-/\s]\s*\d{1,2}\.?|\d{1,2}월\s*\d{1,2}일/g;
const PHONE_PATTERN = /0\d{1,2}-?\d{3,4}-\d{4}/;
const ACTION_PATTERN = /신청|제출|접수|방문|문의/;

function toLines(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function findDeadline(lines: string[]) {
  const deadlineLine = lines.find((line) => /신청\s*기간|접수\s*기간|마감|까지/.test(line));
  const dates = deadlineLine?.match(DATE_PATTERN) ?? [];

  return dates.at(-1) ?? null;
}

function findContact(lines: string[]) {
  return lines
    .map((line) => line.match(PHONE_PATTERN)?.[0] ?? null)
    .find(Boolean) ?? null;
}

function findActions(lines: string[]) {
  return lines
    .filter((line) => ACTION_PATTERN.test(line))
    .filter((line) => !/신청\s*기간|접수\s*기간/.test(line))
    .filter((line) => !PHONE_PATTERN.test(line))
    .slice(0, 3);
}

export function analyzeNotice(text: string): NoticeAnalysis {
  const lines = toLines(text);
  const deadline = findDeadline(lines);
  const contact = findContact(lines);
  const actions = findActions(lines);
  const warnings: string[] = [];

  if (!deadline) {
    warnings.push("마감일은 원문 확인이 필요합니다.");
  }

  if (!contact) {
    warnings.push("문의처는 원문 확인이 필요합니다.");
  }

  if (actions.length === 0) {
    warnings.push("해야 할 일은 원문 확인이 필요합니다.");
  }

  return {
    title: lines[0] ?? "공지문",
    deadline,
    contact,
    actions,
    warnings,
  };
}
