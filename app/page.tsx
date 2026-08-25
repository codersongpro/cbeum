import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, MapPin } from "lucide-react";

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
            청주시 공지 글 정리
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            공지 글에서
            <br />
            중요한 것만 보세요
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4e6159]">
            공지 글을 붙여 넣으면 언제까지 해야 하는지, 어디에 전화해야 하는지,
            무엇을 해야 하는지 보여 드립니다.
          </p>

          <div className="mt-10 max-w-xl">
            <Link
              href="/analyze"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#146c43] px-6 text-lg font-bold text-white transition-colors hover:bg-[#0e5836] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2b84b] sm:w-auto"
            >
              <FileText aria-hidden="true" size={24} />
              공지 글 붙여 넣기
              <ArrowRight aria-hidden="true" size={22} />
            </Link>
          </div>
        </section>

        <section className="grid gap-3 border-t border-[#cbd8d1] py-6 sm:grid-cols-3" aria-label="주요 기능">
          <div className="flex gap-3">
            <FileText className="mt-0.5 shrink-0 text-[#146c43]" aria-hidden="true" size={24} />
            <div>
              <h2 className="text-lg font-bold">1. 글 붙여 넣기</h2>
              <p className="mt-1 text-base text-[#4e6159]">공지 글을 그대로 넣으세요.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 shrink-0 text-[#146c43]" aria-hidden="true" size={24} />
            <div>
              <h2 className="text-lg font-bold">2. 중요한 내용 보기</h2>
              <p className="mt-1 text-base text-[#4e6159]">날짜, 전화번호, 할 일을 봅니다.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 shrink-0 text-[#146c43]" aria-hidden="true" size={24} />
            <div>
              <h2 className="text-lg font-bold">청주시부터 시작</h2>
              <p className="mt-1 text-base text-[#4e6159]">다른 지역도 차례로 늘려 갑니다.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
