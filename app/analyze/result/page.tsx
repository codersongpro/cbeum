"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowLeft } from "lucide-react";
import { NoticeResult } from "@/components/notice-result";
import type { NoticeAnalysis } from "@/lib/notice/analyze";
import { loadAnalysis } from "@/lib/notice/storage";

const subscribe = () => () => {};
const getServerSnapshot = () => null;

export default function AnalyzeResultPage() {
  const analysis = useSyncExternalStore<NoticeAnalysis | null>(
    subscribe,
    loadAnalysis,
    getServerSnapshot,
  );

  return (
    <main className="min-h-screen bg-[#f5f8f7] text-[#172420]">
      <div className="mx-auto w-full max-w-3xl px-5 py-6 sm:px-8 sm:py-10">
        <Link
          href="/analyze"
          className="inline-flex min-h-12 items-center gap-2 text-base font-bold text-[#146c43] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b]"
        >
          <ArrowLeft aria-hidden="true" size={20} />
          다른 글 넣기
        </Link>

        <div className="mt-10">
          {analysis ? (
            <NoticeResult analysis={analysis} />
          ) : (
            <section aria-label="정리한 글 없음">
              <h1 className="text-3xl font-bold">아직 넣은 글이 없습니다.</h1>
              <p className="mt-4 text-lg leading-8 text-[#4e6159]">
                공지 글을 넣으면 중요한 내용을 볼 수 있습니다.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
