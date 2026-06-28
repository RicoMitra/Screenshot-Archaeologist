import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Screenshot Archaeologist",
  description: "Local-first screenshot OCR triage with deterministic receipts.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
