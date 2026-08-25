import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AccessibilityLoader } from "@/components/accessibility-loader";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "충북이음 AI | 공지 글 정리",
  description: "공지 글에서 날짜, 전화번호, 할 일을 찾아 주는 쉬운 안내 도구입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={geist.variable}>
      <body>
        <AccessibilityLoader />
        {children}
      </body>
    </html>
  );
}
