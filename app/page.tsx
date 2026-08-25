"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, MapPin } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getCopy } from "@/lib/accessibility/copy";
import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  loadAccessibilitySettings,
} from "@/lib/accessibility/storage";

const subscribe = () => () => {};
const getServerSnapshot = () => DEFAULT_ACCESSIBILITY_SETTINGS;

export default function Home() {
  const settings = useSyncExternalStore(subscribe, loadAccessibilitySettings, getServerSnapshot);
  const copy = getCopy(settings.language, settings.simpleLanguage);

  return (
    <main className="min-h-screen bg-[#f5f8f7] text-[#172420]">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between py-2">
          <span className="text-xl font-bold">충북이음 AI</span>
          <Link
            href="/settings"
            className="inline-flex min-h-12 items-center text-base font-bold text-[#146c43] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b]"
          >
            {copy.settings}
          </Link>
        </header>

        <section className="flex flex-1 flex-col justify-center py-12 sm:py-16">
          <p className="mb-4 flex items-center gap-2 text-base font-semibold text-[#146c43]">
            <MapPin aria-hidden="true" size={20} />
            {copy.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {copy.titleFirst}
            <br />
            {copy.titleSecond}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4e6159]">
            {copy.description}
          </p>

          <div className="mt-10 max-w-xl">
            <Link
              href="/analyze"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#146c43] px-6 text-lg font-bold text-white transition-colors hover:bg-[#0e5836] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b] sm:w-auto"
            >
              <FileText aria-hidden="true" size={24} />
              {copy.start}
              <ArrowRight aria-hidden="true" size={22} />
            </Link>
          </div>
        </section>

        <section className="grid gap-3 border-t border-[#cbd8d1] py-6 sm:grid-cols-3" aria-label="주요 기능">
          <div className="flex gap-3">
            <FileText className="mt-0.5 shrink-0 text-[#146c43]" aria-hidden="true" size={24} />
            <div>
              <h2 className="text-lg font-bold">{copy.firstStepTitle}</h2>
              <p className="mt-1 text-base text-[#4e6159]">{copy.firstStepDescription}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 shrink-0 text-[#146c43]" aria-hidden="true" size={24} />
            <div>
              <h2 className="text-lg font-bold">{copy.secondStepTitle}</h2>
              <p className="mt-1 text-base text-[#4e6159]">{copy.secondStepDescription}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 shrink-0 text-[#146c43]" aria-hidden="true" size={24} />
            <div>
              <h2 className="text-lg font-bold">{copy.thirdStepTitle}</h2>
              <p className="mt-1 text-base text-[#4e6159]">{copy.thirdStepDescription}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
