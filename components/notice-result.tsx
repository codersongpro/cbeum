import { CalendarDays, CircleAlert, ListChecks, Phone } from "lucide-react";
import type { NoticeAnalysis } from "@/lib/notice/analyze";

type NoticeResultProps = {
  analysis: NoticeAnalysis;
};

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
}) {
  return (
    <div className="border-b border-[#d5e0da] py-5 last:border-b-0">
      <div className="flex items-center gap-2 text-base font-bold text-[#146c43]">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-2 text-lg leading-7 text-[#172420]">
        {value ?? "찾지 못했습니다. 공지 글에서 다시 확인해 주세요."}
      </p>
    </div>
  );
}

export function NoticeResult({ analysis }: NoticeResultProps) {
  return (
    <section aria-label="공지 글 정리 결과">
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{analysis.title}</h1>
      <p className="mt-3 text-lg text-[#4e6159]">아래 내용부터 확인하세요.</p>

      <div className="mt-7 border-y border-[#b9cbbf]">
        <InfoRow
          icon={<CalendarDays aria-hidden="true" size={22} />}
          label="언제까지"
          value={analysis.deadline}
        />
        <InfoRow
          icon={<Phone aria-hidden="true" size={22} />}
          label="전화 문의"
          value={analysis.contact}
        />
        <div className="py-5">
          <div className="flex items-center gap-2 text-base font-bold text-[#146c43]">
            <ListChecks aria-hidden="true" size={22} />
            <span>할 일</span>
          </div>
          {analysis.actions.length > 0 ? (
            <ol className="mt-3 space-y-2 text-lg leading-7">
              {analysis.actions.map((action) => (
                <li key={action} className="flex gap-3">
                  <span aria-hidden="true" className="font-bold text-[#146c43]">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-2 text-lg leading-7">찾지 못했습니다. 공지 글에서 다시 확인해 주세요.</p>
          )}
        </div>
      </div>

      {analysis.warnings.length > 0 && (
        <aside className="mt-6 border-l-4 border-[#f2b84b] bg-[#fff8e8] p-4" aria-label="다시 확인할 내용">
          <div className="flex gap-2">
            <CircleAlert className="mt-0.5 shrink-0 text-[#8a5b00]" aria-hidden="true" size={22} />
            <div>
              <h2 className="text-lg font-bold">공지 글에서 다시 확인해 주세요</h2>
              <ul className="mt-2 space-y-1 text-base leading-6">
                {analysis.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
}
