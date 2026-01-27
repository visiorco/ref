import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";
import Script from "next/script";

const neueHaas = localFont({
  src: [
    {
      path: "../public/font/NeueHaasDisplayRoman.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/NeueHaasDisplayMediu.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/NeueHaasDisplayBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Academia Lendária",
  description: "Ecossistema de Educação & Inovação com IA",
  icons: {
    icon: "/FAV-Icon.png",
    shortcut: "/FAV-Icon.png",
    apple: "/FAV-Icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} ${neueHaas.variable} ${inter.variable}`}>
        <Script id="pixel-id" strategy="lazyOnload">
          {`window.pixelId = "696f8b549a741977dffb6b76";`}
        </Script>
        <Script
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          strategy="lazyOnload"
          async
          defer
        />
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="lazyOnload"
          async
          defer
        />

        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
