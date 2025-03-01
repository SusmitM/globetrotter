import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { StateProvider } from "@/context/StateProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Globetrotter",
  description: "Globetrotter: The Ultimate Travel Guessing Game",
  icons: {
    icon: '/map-pin-blue.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <StateProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Toaster/>
            {children}
          </body>
        </StateProvider>
      </AuthProvider>
    </html>
  );
}
