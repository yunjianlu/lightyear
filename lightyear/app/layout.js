import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import styles from "./styles.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lightyear",
  description: "Lightyear - Your Star Wars merchandise store",
  icons: {
    icon: "/images/light-year-logo.png",
    shortcut: "/images/light-year-logo.png",
    apple: "/images/light-year-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/light-year-logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
