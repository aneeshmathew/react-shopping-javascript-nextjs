import { Geist } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/client/providers/AppProviders";
import NavBar from "@/components/client/nav/NavBar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata = {
  title: "ShopNext — Modern Shopping",
  description: "A sample shopping cart application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} antialiased min-h-screen`}>
        <AppProviders>
          <NavBar />
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
