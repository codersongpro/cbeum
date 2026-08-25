"use client";

import Link from "next/link";
import { ArrowLeft, Check, Languages, Type } from "lucide-react";
import { useState } from "react";
import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  type AccessibilitySettings,
  loadAccessibilitySettings,
  saveAccessibilitySettings,
} from "@/lib/accessibility/storage";

export default function SettingsPage() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === "undefined") return DEFAULT_ACCESSIBILITY_SETTINGS;
    return loadAccessibilitySettings();
  });
  const [saved, setSaved] = useState(false);

  function updateSettings(next: Partial<AccessibilitySettings>) {
    setSettings((current) => ({ ...current, ...next }));
    setSaved(false);
  }

  function saveSettings() {
    saveAccessibilitySettings(settings);
    document.documentElement.dataset.textSize = settings.textSize;
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-[#f5f8f7] text-[#172420]">
      <div className="mx-auto w-full max-w-3xl px-5 py-6 sm:px-8 sm:py-10">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center gap-2 text-base font-bold text-[#146c43] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b]"
        >
          <ArrowLeft aria-hidden="true" size={20} />
          처음으로
        </Link>

        <section className="mt-10">
          <p className="flex items-center gap-2 text-base font-bold text-[#146c43]">
            <Type aria-hidden="true" size={22} />
            글자와 언어
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">보기 편하게 바꾸세요</h1>
          <p className="mt-4 text-lg leading-8 text-[#4e6159]">
            이 설정은 지금 쓰는 기기에만 저장됩니다.
          </p>
        </section>

        <form className="mt-8 space-y-9" onSubmit={(event) => { event.preventDefault(); saveSettings(); }}>
          <fieldset>
            <legend className="text-xl font-bold">글자 크기</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="flex min-h-16 cursor-pointer items-center gap-3 rounded-lg border-2 border-[#8aa096] bg-white px-4 text-lg font-bold has-[:checked]:border-[#146c43] has-[:checked]:bg-[#edf7f0]">
                <input
                  type="radio"
                  name="text-size"
                  checked={settings.textSize === "default"}
                  onChange={() => updateSettings({ textSize: "default" })}
                />
                보통 글자
              </label>
              <label className="flex min-h-16 cursor-pointer items-center gap-3 rounded-lg border-2 border-[#8aa096] bg-white px-4 text-xl font-bold has-[:checked]:border-[#146c43] has-[:checked]:bg-[#edf7f0]">
                <input
                  type="radio"
                  name="text-size"
                  checked={settings.textSize === "large"}
                  onChange={() => updateSettings({ textSize: "large" })}
                />
                큰 글자
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xl font-bold">읽는 방법</legend>
            <label className="mt-4 flex min-h-16 cursor-pointer items-center gap-3 rounded-lg border-2 border-[#8aa096] bg-white px-4 text-lg font-bold has-[:checked]:border-[#146c43] has-[:checked]:bg-[#edf7f0]">
              <input
                type="checkbox"
                checked={settings.simpleLanguage}
                onChange={(event) => updateSettings({ simpleLanguage: event.target.checked })}
              />
              쉬운 말로 보기
            </label>
          </fieldset>

          <fieldset>
            <legend className="flex items-center gap-2 text-xl font-bold">
              <Languages aria-hidden="true" size={22} />
              화면 언어
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="flex min-h-16 cursor-pointer items-center gap-3 rounded-lg border-2 border-[#8aa096] bg-white px-4 text-lg font-bold has-[:checked]:border-[#146c43] has-[:checked]:bg-[#edf7f0]">
                <input
                  type="radio"
                  name="language"
                  checked={settings.language === "ko"}
                  onChange={() => updateSettings({ language: "ko" })}
                />
                한국어
              </label>
              <label className="flex min-h-16 cursor-pointer items-center gap-3 rounded-lg border-2 border-[#8aa096] bg-white px-4 text-lg font-bold has-[:checked]:border-[#146c43] has-[:checked]:bg-[#edf7f0]">
                <input
                  type="radio"
                  name="language"
                  checked={settings.language === "en"}
                  onChange={() => updateSettings({ language: "en" })}
                />
                English
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#146c43] px-6 text-lg font-bold text-white transition-colors hover:bg-[#0e5836] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b] sm:w-auto"
          >
            <Check aria-hidden="true" size={22} />
            저장하기
          </button>
          {saved && <p className="text-lg font-bold text-[#146c43]" role="status">저장했습니다.</p>}
        </form>
      </div>
    </main>
  );
}
