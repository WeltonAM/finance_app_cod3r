import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MensagemProvider } from "@/data/contexts/MensagemContext";
import { ProvedorAutenticacao } from "@/data/contexts/ContextoAutenticacao";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance App Cod3r",
  description: "Web App Made with Cod3r Training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MensagemProvider>
        <ProvedorAutenticacao>
          <body>
            {children}
          </body>
        </ProvedorAutenticacao>
      </MensagemProvider>
    </html>
  );
}
