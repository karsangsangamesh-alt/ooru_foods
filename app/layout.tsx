import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ooru Chutneypudi - Authentic South Indian Flavors",
  description: "Experience the rich culinary heritage with our traditional chutneys and spicy delicacies crafted with authentic recipes passed down through generations.",
  keywords: ["South Indian", "chutney", "spices", "authentic", "traditional", "cuisine"],
  authors: [{ name: "Ooru Chutneypudi" }],
  openGraph: {
    title: "Ooru Chutneypudi - Authentic South Indian Flavors",
    description: "Experience the rich culinary heritage with our traditional chutneys and spicy delicacies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-light-50 text-dark-800`}
      >
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
