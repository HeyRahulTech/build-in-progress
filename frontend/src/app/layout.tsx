import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buildr - Professional Construction Services",
  description: "Connect with verified Masons, Carpenters, Plumbers, and Electricians.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="max-w-md mx-auto min-h-screen bg-slate-50 relative shadow-2xl overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
