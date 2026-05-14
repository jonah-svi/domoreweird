import type { Metadata } from "next"
import { VT323, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://domoreweird.org"),
  title: "// POSTHOG — Do More Weird.",
  description: "PostHog is weird. We do not forgive boring. We do not forget.",
  openGraph: {
    title: "// POSTHOG — Do More Weird.",
    description: "PostHog is weird. We do not forgive boring. We do not forget.",
    url: "https://domoreweird.org",
    siteName: "PostHog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PostHog — Do More Weird.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "// POSTHOG — Do More Weird.",
    description: "PostHog is weird. We do not forgive boring. We do not forget.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "PostHog" }],
  keywords: ["PostHog", "do more weird", "demo more weird", "product analytics"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${vt323.variable} ${jetbrainsMono.variable}`} data-theme="dark">
      <body>{children}</body>
    </html>
  )
}
