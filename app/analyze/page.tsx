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
      setError("공지문 내용을 입력해 주세요.");
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
            청주시 공지문 읽기
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            공지문을 붙여 넣어 주세요.
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#4e6159]">
            날짜, 문의처, 해야 할 일을 찾아 드립니다. 찾지 못한 정보는 추측하지 않고 원문 확인이 필요하다고 알려드립니다.
          </p>
        </section>

        <form className="mt-8" onSubmit={handleSubmit} noValidate>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="notice" className="text-lg font-bold">
              공지문 내용
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
            placeholder="청주시 공지문 내용을 여기에 붙여 넣으세요."
          />
          <p id="notice-help" className="mt-3 text-base leading-6 text-[#4e6159]">
            주민등록번호, 계좌번호, 상세 건강정보 같은 개인정보는 입력하지 마세요. 입력한 내용은 이 브라우저 탭에서만 처리됩니다.
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
              핵심 정보 찾기
            </button>
            <button
              type="button"
              onClick={loadExample}
              className="min-h-14 rounded-lg border-2 border-[#146c43] bg-white px-6 text-lg font-bold text-[#146c43] transition-colors hover:bg-[#edf7f0] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b]"
            >
              청주시 예시 불러오기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
