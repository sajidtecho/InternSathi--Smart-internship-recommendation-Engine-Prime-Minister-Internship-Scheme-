import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { TranslationProvider } from "@/lib/translation-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "InternSetu - Ministry of Corporate Affairs | Government of India",
  description: "InternSetu - Official PM Internship Scheme portal by Ministry of Corporate Affairs, Government of India. 12-month paid internships with top companies across India.",
  generator: "v0.app",
  icons: {
    icon: "/Icons/logo.ico",
    shortcut: "/favicon.ico",
    apple: "/Icons/logo.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TranslationProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </TranslationProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
