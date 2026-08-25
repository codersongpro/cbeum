"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, FileText, Search } from "lucide-react";
import { analyzeNotice } from "@/lib/notice/analyze";
import { saveAnalysis } from "@/lib/notice/storage";

const EXAMPLE_NOTICE = `청주시 어르신 문화교실 참여자 모집
신청 기간: 2026. 9. 1. ~ 2026. 9. 30.
참여를 원하는 분은 주민센터에 신청서를 제출하세요.
문의: 청주시 복지정책과 043-201-1234`;

export default function AnalyzePage() {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedNotice = notice.trim();

    if (!trimmedNotice) {
      setError("공지 글을 붙여 넣어 주세요.");
      return;
    }

    saveAnalysis(analyzeNotice(trimmedNotice));
    router.push("/analyze/result");
  }

  function loadExample() {
    setNotice(EXAMPLE_NOTICE);
    setError("");
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
            <FileText aria-hidden="true" size={22} />
            청주시 공지 글 정리
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            공지 글을 여기에 넣으세요
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#4e6159]">
            <span className="font-bold text-[#172420]">1.</span> 공지 글을 붙여 넣고
            <span className="font-bold text-[#172420]"> 2.</span> 중요한 내용을 확인하세요.
          </p>
        </section>

        <form className="mt-8" onSubmit={handleSubmit} noValidate>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="notice" className="text-lg font-bold">
              공지 글
            </label>
            <span className="text-sm text-[#4e6159]" aria-live="polite">
              {notice.length.toLocaleString()}자
            </span>
          </div>
          <textarea
            id="notice"
            name="notice"
            value={notice}
            onChange={(event) => {
              setNotice(event.target.value);
              if (error) setError("");
            }}
            aria-describedby="notice-help notice-error"
            className="mt-3 min-h-72 w-full resize-y rounded-lg border-2 border-[#8aa096] bg-white p-4 text-lg leading-8 outline-none focus:border-[#146c43] focus:ring-4 focus:ring-[#dff1e7]"
            placeholder="공지 글을 복사해서 여기에 붙여 넣으세요."
          />
          <p id="notice-help" className="mt-3 text-base leading-6 text-[#4e6159]">
            이름, 주소, 계좌번호, 건강 이야기는 넣지 마세요. 글은 지금 보고 있는 화면에서만 정리합니다.
          </p>
          {error && (
            <p id="notice-error" className="mt-3 text-base font-bold text-[#b42318]" role="alert">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-lg bg-[#146c43] px-6 text-lg font-bold text-white transition-colors hover:bg-[#0e5836] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b]"
            >
              <Search aria-hidden="true" size={22} />
              중요한 내용 보기
            </button>
            <button
              type="button"
              onClick={loadExample}
              className="min-h-14 rounded-lg border-2 border-[#146c43] bg-white px-6 text-lg font-bold text-[#146c43] transition-colors hover:bg-[#edf7f0] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b]"
            >
              예시 글 보기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
