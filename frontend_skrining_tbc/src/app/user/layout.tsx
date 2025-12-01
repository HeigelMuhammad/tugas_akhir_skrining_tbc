import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer05Page from "@/components/footer-05/footer-05";
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-public";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TB Screening App",
  description: "Aplikasi Skrining TB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar02/>
        <main>{children}</main>
        <Footer05Page />
      </body>
    </html>
  );
}
