import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3 BOW • Dịch vụ chạy quảng cáo",
};

const noFlashScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && m)) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-950">
        {children}
      </body>
    </html>
  );
}
