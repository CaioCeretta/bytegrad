import { Header } from "@/components/Header";
import localFont from "next/font/local";
import { constructMetadata } from "../lib/utils";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-full flex flex-col">
          <div className="flex h-full flex-1 flex-col">
            {children}
          </div>
        </main>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
