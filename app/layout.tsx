import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "충북이음 AI | 청주시 생활정보 도우미",
  description: "청주시 공지문을 쉬운 말과 해야 할 일로 정리해 주는 생활정보 도우미입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
