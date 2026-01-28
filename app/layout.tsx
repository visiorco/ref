import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" />
        <Script id="pixel-id">
          {`window.pixelId = "696f8b549a741977dffb6b76";`}
        </Script>
        <Script
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          async
          defer
        />
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
        />
      </head>
      <body className={`${neueHaas.variable} ${inter.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
