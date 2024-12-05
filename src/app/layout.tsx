import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from 'sonner'
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gamer Galaxy",
  description: "Loja de jogos e tecnologias, situada em Pelotas - RS",
  keywords: ['loja', 'jogos', 'computador', 'pecas', 'tecnologia', 'pelotas']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
      </head>
      <body className="bg-colorOffbranco flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
          <Toaster position="top-right" /> 
        </main>
        <Footer />
      </body>
    </html>
  );
}
