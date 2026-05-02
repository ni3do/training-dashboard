import type { Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "./components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Training Dashboard",
  description: "Self-hosted training plan and metrics dashboard for endurance athletes",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
              {children}
            </main>
            <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-sm text-slate-600 dark:text-slate-400">
              <p>Training Dashboard &copy; 2026 | Self-hosted for endurance athletes</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
