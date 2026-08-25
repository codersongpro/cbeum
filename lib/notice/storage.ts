import type { NoticeAnalysis } from "@/lib/notice/analyze";

const STORAGE_KEY = "cbeum.notice-analysis.v1";

function isNoticeAnalysis(value: unknown): value is NoticeAnalysis {
  if (!value || typeof value !== "object") {
    return false;
  }

  const analysis = value as NoticeAnalysis;

  return (
    typeof analysis.title === "string" &&
    (typeof analysis.deadline === "string" || analysis.deadline === null) &&
    (typeof analysis.contact === "string" || analysis.contact === null) &&
    Array.isArray(analysis.actions) &&
    Array.isArray(analysis.warnings)
  );
}

export function saveAnalysis(analysis: NoticeAnalysis) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(analysis));
}

export function loadAnalysis(): NoticeAnalysis | null {
  const stored = sessionStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(stored);
    return isNoticeAnalysis(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearAnalysis() {
  sessionStorage.removeItem(STORAGE_KEY);
}
