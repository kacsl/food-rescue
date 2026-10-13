import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { env } from "@/lib/env";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  // Figma token is SemiBold 600; Google Lato has no 600 cut, so 700 is the loaded face.
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: env.appName,
  description: "Evolve 2.0 design system — Figma tokens and published UI components.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lato.variable}>
      <body className={lato.className}>{children}</body>
    </html>
  );
}
