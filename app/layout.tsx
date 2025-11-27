import type React from "react"
import type { Metadata } from "next"
// <CHANGE> Added Noto Sans KR for Korean language support
import { Noto_Sans_KR, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
})
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  // <CHANGE> Updated metadata for TripCarShare landing page
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://trip-car-share-landing-page-final.vercel.app"
  ),
  title: "트립카셰어 - 여행 중, 내 차가 누군가의 발이 된다",
  description:
    "출발하는 여행자는 차량을 맡기고, 도착하는 여행자는 바로 이용하세요. 렌트카보다 합리적으로, 공유보다 간편하게.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "트립카셰어 - 여행 중, 내 차가 누군가의 발이 된다",
    description:
      "출발하는 여행자는 차량을 맡기고, 도착하는 여행자는 바로 이용하세요. 렌트카보다 합리적으로, 공유보다 간편하게.",
    images: [
      {
        url: "/sharecar.jpg",
        width: 1200,
        height: 630,
        alt: "트립카셰어 - 여행 중 차량 공유 서비스",
      },
    ],
    type: "website",
    locale: "ko_KR",
    siteName: "트립카셰어",
  },
  twitter: {
    card: "summary_large_image",
    title: "트립카셰어 - 여행 중, 내 차가 누군가의 발이 된다",
    description:
      "출발하는 여행자는 차량을 맡기고, 도착하는 여행자는 바로 이용하세요. 렌트카보다 합리적으로, 공유보다 간편하게.",
    images: ["/sharecar.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
