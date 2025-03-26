import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Next.js App</title>
        <meta name="description" content="A powerful Next.js application" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans bg-gray-50`}>
        <Navbar />
        <div className="container mx-auto px-4">{children}</div>
      </body>
    </html>
  );
}
