import Link from "next/link";
import { ArrowRight, FileText, MapPin, Volume2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f8f7] text-[#172420]">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between py-2">
          <span className="text-xl font-bold">충북이음 AI</span>
          <span className="rounded-full bg-[#dff1e7] px-3 py-1 text-sm font-semibold text-[#146c43]">
            청주시
          </span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-12 sm:py-16">
          <p className="mb-4 flex items-center gap-2 text-base font-semibold text-[#146c43]">
            <MapPin aria-hidden="true" size={20} />
            청주시 생활정보, 쉽게 확인하세요
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            어렵게 쓰인 공지문을
            <br />
            내 일처럼 풀어드립니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4e6159]">
            사진이나 PDF를 올리면 필요한 일, 마감일, 준비할 것과 문의처를
            쉬운 말로 정리해 드립니다.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/analyze"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-[#146c43] px-6 text-lg font-bold text-white transition-colors hover:bg-[#0e5836] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b]"
            >
              <FileText aria-hidden="true" size={24} />
              공지문 읽기
              <ArrowRight aria-hidden="true" size={22} />
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border-2 border-[#146c43] bg-white px-6 text-lg font-bold text-[#146c43] transition-colors hover:bg-[#edf7f0] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b]"
            >
              내 지역과 글자 설정
            </Link>
          </div>
        </section>

        <section className="grid gap-3 border-t border-[#cbd8d1] py-6 sm:grid-cols-3" aria-label="주요 기능">
          <div className="flex gap-3">
            <FileText className="mt-0.5 shrink-0 text-[#146c43]" aria-hidden="true" size={24} />
            <div>
              <h2 className="text-lg font-bold">한눈에 정리</h2>
              <p className="mt-1 text-base text-[#4e6159]">할 일과 마감일을 먼저 보여드립니다.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Volume2 className="mt-0.5 shrink-0 text-[#146c43]" aria-hidden="true" size={24} />
            <div>
              <h2 className="text-lg font-bold">소리로 듣기</h2>
              <p className="mt-1 text-base text-[#4e6159]">정리된 내용을 천천히 읽어드립니다.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 shrink-0 text-[#146c43]" aria-hidden="true" size={24} />
            <div>
              <h2 className="text-lg font-bold">청주시부터</h2>
              <p className="mt-1 text-base text-[#4e6159]">첫 적용 지역은 청주시입니다.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
