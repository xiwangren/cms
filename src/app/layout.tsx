import "../styles/globals.css";

import { Inter, Libre_Baskerville } from "next/font/google";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Default Title',
  description: 'Default Description',
};


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--libre-baskerville",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
