import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"]
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Maison INVITE — Թվային հարսանեկան հրավիրատոմսեր",
    template: "%s | Maison INVITE",
  },
  description:
    "Maison INVITE — Ձեր պատմությունը՝ հրավիրատոմսի մեջ։ Էլեգանտ, անհատականացված թվային հրավիրատոմսեր՝ ստեղծված ձեր հատուկ օրվա համար։",
  keywords: [
    "Maison INVITE",
    "թվային հրավիրատոմսեր",
    "հարսանեկան հրավիրատոմսեր",
    "օնլայն հրավիրատոմսեր",
    "հարսանեկան հրավիրատոմս",
    "digital wedding invitations",
    "wedding invitations",
  ],
  openGraph: {
    title: "Maison INVITE — Թվային հրավիրատոմսեր",
    description: "Էլեգանտ թվային հրավիրատոմսեր Ձեր հատուկ օրվա համար։",
    type: "website",
    locale: "hy_AM",
    siteName: "Maison INVITE",
    images: [
      {
        url: "https://maisoninvite.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maison INVITE",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
