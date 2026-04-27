import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals-print.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B.S Evaluation - تقييم الوضع الراهن للمنشآت",
  description: "تقييم الوضع الراهن القائم للمنشآت الخرسانية المسلحة وفق اشتراطات ومعطيات الكود العربي السوري نسخة 2024 - Evaluation of RC Structures",
  keywords: ["B.S Evaluation", "تقييم إنشائي", "Structural Evaluation", "الكود العربي السوري", "RC Structures", "Reinforced Concrete", "Syrian Arab Code"],
  authors: [{ name: "المهندس الاستشاري: بشار السليمان" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "B.S Evaluation - تقييم الوضع الراهن للمنشآت",
    description: "تقييم الوضع الراهن القائم للمنشآت الخرسانية المسلحة",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#059669" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
