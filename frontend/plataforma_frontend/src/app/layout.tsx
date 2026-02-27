import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../auth/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waiwa Host",
  description: "Plataforma de gestión de reservas de inmuebles",
  keywords: ["Waiwa Host", "Plataforma de gestión", "Reservas de inmuebles"],
  authors: [{ name: "Waiwa Host" }],
  creator: "Waiwa Host",
  publisher: "Waiwa Host",
  icons: {
    icon: "/img/Waiwa Host_Logo (11).png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
