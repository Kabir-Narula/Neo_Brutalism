import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CustomCursor } from "@/components/CustomCursor";
import { BackgroundManager } from "@/components/BackgroundManager";
import { CommandMenu } from "@/components/CommandMenu";
import { ChaosManager } from "@/components/ChaosManager";
import { LayoutProvider } from "@/context/LayoutContext";
import { OnboardingTooltip } from "@/components/OnboardingTooltip";
import { SecretCodePanel } from "@/components/SecretCodePanel";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
  fallback: ["Courier New", "monospace"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Kabir Narula - Software Developer Portfolio",
    template: "%s | Kabir Narula",
  },
  description: "Data-focused Software Development student with experience using Python and SQL to build, validate, and debug data-centric backend services and pipelines.",
  keywords: ["Software Developer", "Python", "SQL", "Backend Developer", "Data Engineering", "Portfolio"],
  authors: [{ name: "Kabir Narula" }],
  creator: "Kabir Narula",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Kabir-Narula",
    title: "Kabir Narula - Software Developer Portfolio",
    description: "Data-focused Software Development student specializing in Python, SQL, and backend services.",
    siteName: "Kabir Narula Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabir Narula - Software Developer Portfolio",
    description: "Data-focused Software Development student specializing in Python, SQL, and backend services.",
    creator: "@kabirnarula",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-cream font-mono antialiased",
          syne.variable,
          jetbrainsMono.variable
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-neo-lime focus:text-neo-black focus:px-4 focus:py-2 focus:border-3 focus:border-neo-black focus:font-bold"
        >
          SKIP_TO_MAIN_CONTENT
        </a>
        <LayoutProvider>
          {children}
          <BackgroundManager />
          <CustomCursor />
          <CommandMenu />
          <ChaosManager />
          <OnboardingTooltip />
          <SecretCodePanel />
        </LayoutProvider>
      </body>
    </html>
  );
}
