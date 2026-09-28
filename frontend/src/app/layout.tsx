import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "./CartContext";

export const metadata: Metadata = {
  title: "Buildr",
  description: "Connect with verified Masons, Carpenters, Plumbers, and Electricians.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Buildr",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F8F9FA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-200">
        <main className="max-w-md mx-auto min-h-screen bg-[#F8F9FA] relative shadow-2xl overflow-x-hidden border-x border-slate-300">
          <CartProvider>
            {children}
          </CartProvider>
        </main>
      </body>
    </html>
  );
}
