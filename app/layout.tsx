import "../app/globals.css";
import { Space_Grotesk } from "next/font/google";
import type React from "react";
import { LanguageProvider } from "@/contexts/language-context";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "Halal Pepe - The First Halal-Certified Memecoin",
  description: "The first Halal-certified memecoin on Solana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={spaceGrotesk.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
