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
  title: "// POSTHOG",
  description: "do more weird.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${vt323.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
