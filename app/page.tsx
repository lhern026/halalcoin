"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getDexData } from "@/lib/dexscreener";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import type React from "react"; // Added import for React

export default function Page() {
  const { t, language, setLanguage } = useLanguage();
  const aboutRef = useRef<HTMLElement>(null);
  const tokenomicsRef = useRef<HTMLElement>(null);

  const [data, setData] = useState({
    price: "$0.00000000",
    change: "0.00%",
    volume: "$0",
    marketCap: "$0",
    totalSupply: "0",
    contractAddress: "ML6CUJc3PypAEMcbgM2CcnPzzbBSdBMSN6cwqCGzBEJ",
  });

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      const dexData = await getDexData();
      setData(dexData);
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1 flex justify-center space-x-8">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm hover:text-green-400 transition-colors"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-sm hover:text-green-400 transition-colors"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection(tokenomicsRef)}
                className="text-sm hover:text-green-400 transition-colors"
              >
                Tokenomics
              </button>
              <a
                href="https://jup.ag/tokens/ML6CUJc3PypAEMcbgM2CcnPzzbBSdBMSN6cwqCGzBEJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-green-400 transition-colors"
              >
                Buy
              </a>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage("en")}
                className={`text-sm transition-colors ${
                  language === "en" ? "text-green-400" : "hover:text-green-400"
                }`}
              >
                EN
              </button>
              <span className="text-gray-600">/</span>
              <button
                onClick={() => setLanguage("ar")}
                className={`text-sm transition-colors ${
                  language === "ar" ? "text-green-400" : "hover:text-green-400"
                }`}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        <div className="relative container mx-auto px-4 flex flex-col items-center justify-center">
          <h1
            className="text-[12rem] md:text-[16rem] font-bold text-center leading-none tracking-tighter mb-10 mt-1"
            style={{
              background: "linear-gradient(45deg, #22C55E 30%, #EAB308 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 40px rgba(34, 197, 94, 0.3)",
            }}
          >
            $HALAL
          </h1>
          <div className="mt-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/halal1-93OG91i3znNnj28AffP1ZILsuz75eF.jpeg"
              alt="Halal Pepe"
              width={500}
              height={500}
              className="w-[32rem] h-[32rem] object-contain"
            />
          </div>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-12 py-8 text-2xl rounded-full transition-all hover:scale-105"
              onClick={() =>
                window.open(
                  "https://jup.ag/tokens/ML6CUJc3PypAEMcbgM2CcnPzzbBSdBMSN6cwqCGzBEJ",
                  "_blank"
                )
              }
            >
              {t.hero.buyNow}
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="min-h-screen flex items-center relative py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2
                className="text-6xl font-bold"
                style={{
                  color: "#EAB308",
                }}
              >
                {t.about.title}
              </h2>
              <div className="space-y-4 text-lg font-mono">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
                <p>{t.about.p4}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/halal.jpg-D7yPV4uhADFNjqn6OYnBL8l1Qt6y8N.jpeg"
                alt="Halal Certified"
                width={300}
                height={300}
                className="w-72 h-72"
              />
              <span className="text-xl font-semibold text-green-400">
                {t.about.certification}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Token Info Section */}
      <section
        ref={tokenomicsRef}
        className="min-h-screen flex items-center relative py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <h2
                className="text-6xl font-bold text-center mb-12"
                style={{ color: "#EAB308" }}
              >
                Tokenomics
              </h2>

              <div className="space-y-4 font-mono">
                <div className="flex items-center gap-4">
                  <span className="text-[#EAB308]">{t.token.ticker}:</span>
                  <span>$HALAL</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#EAB308]">{t.token.contract}:</span>
                  <span className="break-all">{data.contractAddress}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#EAB308]">{t.token.lp}:</span>
                  <span>Locked</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#EAB308]">{t.token.supply}:</span>
                  <span>{data.totalSupply}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400">{t.token.price}</div>
                  <div className="text-2xl font-bold">{data.price}</div>
                </div>
                <div className="p-6 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400">
                    {t.token.marketCap}
                  </div>
                  <div className="text-2xl font-bold">{data.marketCap}</div>
                </div>
                <div className="p-6 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400">{t.token.volume}</div>
                  <div className="text-2xl font-bold">{data.volume}</div>
                </div>
                <div className="p-6 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400">{t.token.change}</div>
                  <div className="text-2xl font-bold text-green-500">
                    {data.change}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-black/50 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <a
              href="https://www.coingecko.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-green-400 transition-colors"
            >
              Coingecko
            </a>
            <a
              href="https://dexscreener.com/solana/gbvetysfnqepyusrrtkqvzidynoiyaubqfmm1bhwqqk7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-green-400 transition-colors"
            >
              DEX Screener
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-green-400 transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-green-400 transition-colors"
            >
              Telegrams
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
