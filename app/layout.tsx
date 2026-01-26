import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${neueHaas.variable}`}>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            window.pixelId = "696f8b549a741977dffb6b76";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
