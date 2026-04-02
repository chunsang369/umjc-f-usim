import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "얼마줄까 — EOLMA JULKKA",
  description: "외국인 전용 USIM/알뜰폰 판매 홈페이지",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
