import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "valere-DS/styles.css";
import "@/styles/tokens.css";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kari",
  description: "Built with the Valere design system and Kari tokens.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={dmSans.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
