import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./contexts/CartContext";

// Root layout.js: Next.js App Router root layout
// - Applies to ALL pages automatically
// - Defines HTML structure (<html>, <head>, <body>)
// - Sets up metadata and fonts globally

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
    icon: "/lightyear/images/light-year-logo.png",
    shortcut: "/lightyear/images/light-year-logo.png",
    apple: "/lightyear/images/light-year-logo.png",
  },
};

// When a user visits / (home page), Next.js renders internally:
// <RootLayout>  {/* Your layout.js */}
//     <Page />    {/* Your page.js */}
// </RootLayout>
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children} {/* This is where root page.js content goes */}
        </CartProvider>
      </body>
    </html>
  );
}
