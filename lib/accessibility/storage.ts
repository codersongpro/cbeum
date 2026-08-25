export type AccessibilitySettings = {
  textSize: "default" | "large";
  simpleLanguage: boolean;
  language: "ko" | "en";
};

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  textSize: "default",
  simpleLanguage: true,
  language: "ko",
};

const STORAGE_KEY = "cbeum.accessibility.v1";

function isAccessibilitySettings(value: unknown): value is AccessibilitySettings {
  if (!value || typeof value !== "object") return false;

  const settings = value as Record<string, unknown>;
  return (
    (settings.textSize === "default" || settings.textSize === "large") &&
    typeof settings.simpleLanguage === "boolean" &&
    (settings.language === "ko" || settings.language === "en")
  );
}

export function saveAccessibilitySettings(settings: AccessibilitySettings) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function loadAccessibilitySettings(): AccessibilitySettings {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return DEFAULT_ACCESSIBILITY_SETTINGS;

    const parsed: unknown = JSON.parse(value);
    return isAccessibilitySettings(parsed) ? parsed : DEFAULT_ACCESSIBILITY_SETTINGS;
  } catch {
    return DEFAULT_ACCESSIBILITY_SETTINGS;
  }
}
