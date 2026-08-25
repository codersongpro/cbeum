type TextSize = "default" | "large" | "extraLarge";
type Language = "ko" | "en" | "zh-CN" | "vi" | "fil" | "ja" | "ru";

export type AccessibilitySettings = {
  textSize: TextSize;
  simpleLanguage: boolean;
  language: Language;
  childMode: boolean;
};

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  textSize: "default",
  simpleLanguage: true,
  language: "ko",
  childMode: false,
};

const STORAGE_KEY = "cbeum.accessibility.v1";

function isTextSize(value: unknown): value is TextSize {
  return value === "default" || value === "large" || value === "extraLarge";
}

function isLanguage(value: unknown): value is Language {
  return (
    value === "ko" ||
    value === "en" ||
    value === "zh-CN" ||
    value === "vi" ||
    value === "fil" ||
    value === "ja" ||
    value === "ru"
  );
}

function parseAccessibilitySettings(value: unknown): AccessibilitySettings | null {
  if (!value || typeof value !== "object") return null;

  const settings = value as Record<string, unknown>;
  if (!isTextSize(settings.textSize) || typeof settings.simpleLanguage !== "boolean" || !isLanguage(settings.language)) {
    return null;
  }

  return {
    textSize: settings.textSize,
    simpleLanguage: settings.simpleLanguage,
    language: settings.language,
    childMode: settings.childMode === true,
  };
}

export function saveAccessibilitySettings(settings: AccessibilitySettings) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function loadAccessibilitySettings(): AccessibilitySettings {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return DEFAULT_ACCESSIBILITY_SETTINGS;

    const parsed: unknown = JSON.parse(value);
    return parseAccessibilitySettings(parsed) ?? DEFAULT_ACCESSIBILITY_SETTINGS;
  } catch {
    return DEFAULT_ACCESSIBILITY_SETTINGS;
  }
}
