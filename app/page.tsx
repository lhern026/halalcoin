"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getDexData } from "@/lib/dexscreener";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import type React from "react";
import WhackAPepe from "@/components/ui/whack-a-pepe";
import { motion } from "framer-motion";

export default function Page() {
  const { t, language, setLanguage } = useLanguage();
  const aboutRef = useRef<HTMLElement>(null);
  const gameRef = useRef<HTMLElement>(null);
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <div
                className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-white transition-all ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex flex-1 justify-center space-x-8 lg:space-x-12">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm font-medium hover:text-green-400 transition-all duration-300"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-sm font-medium hover:text-green-400 transition-all duration-300"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection(gameRef)}
                className="text-sm font-medium hover:text-green-400 transition-all duration-300"
              >
                {t.nav.game}
              </button>
              <button
                onClick={() => scrollToSection(tokenomicsRef)}
                className="text-sm font-medium hover:text-green-400 transition-all duration-300"
              >
                {t.nav.tokenomics}
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Buy Now Button - Desktop */}
              <a
                href="https://jup.ag/tokens/ML6CUJc3PypAEMcbgM2CcnPzzbBSdBMSN6cwqCGzBEJ"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                {t.nav.buyNow}
              </a>

              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage("en")}
                  className={`text-sm transition-colors ${
                    language === "en"
                      ? "text-green-400"
                      : "hover:text-green-400"
                  }`}
                >
                  EN
                </button>
                <span className="text-gray-600">/</span>
                <button
                  onClick={() => setLanguage("ar")}
                  className={`text-sm transition-colors ${
                    language === "ar"
                      ? "text-green-400"
                      : "hover:text-green-400"
                  }`}
                >
                  AR
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMenuOpen ? "max-h-64" : "max-h-0"
            }`}
          >
            <div className="flex flex-col space-y-4 py-4">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
                className="text-sm font-medium hover:text-green-400 transition-all duration-300"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => {
                  scrollToSection(aboutRef);
                  setIsMenuOpen(false);
                }}
                className="text-sm font-medium hover:text-green-400 transition-all duration-300"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => {
                  scrollToSection(gameRef);
                  setIsMenuOpen(false);
                }}
                className="text-sm font-medium hover:text-green-400 transition-all duration-300"
              >
                {t.nav.game}
              </button>
              <button
                onClick={() => {
                  scrollToSection(tokenomicsRef);
                  setIsMenuOpen(false);
                }}
                className="text-sm font-medium hover:text-green-400 transition-all duration-300"
              >
                {t.nav.tokenomics}
              </button>
              {/* Buy Now Button - Mobile */}
              <a
                href="https://jup.ag/tokens/ML6CUJc3PypAEMcbgM2CcnPzzbBSdBMSN6cwqCGzBEJ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-sm font-medium text-center transition-all duration-300"
              >
                {t.nav.buyNow}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-6 flex flex-col items-center justify-center">
          <motion.h1
            className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-center leading-none tracking-tighter mb-8"
            style={{
              background: "linear-gradient(45deg, #22C55E 30%, #EAB308 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 40px rgba(34, 197, 94, 0.3)",
            }}
            animate={{
              y: [0, -20, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            $HALAL
          </motion.h1>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/halal1-93OG91i3znNnj28AffP1ZILsuz75eF.jpeg"
            alt="Halal Pepe"
            width={500}
            height={500}
            className="w-80 h-80 md:w-96 md:h-96 object-contain rounded-2xl shadow-2xl"
          />
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 text-xl rounded-full transition-all hover:scale-105 mt-12 shadow-lg"
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
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="min-h-screen flex items-center relative py-24 bg-black/50"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2
                className="text-5xl md:text-6xl font-bold"
                style={{
                  background: "linear-gradient(45deg, #EAB308, #22C55E)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t.about.title}
              </h2>
              <div className="space-y-6 text-lg font-mono text-gray-300">
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
                className="w-72 h-72 rounded-2xl shadow-2xl"
              />
              <span className="text-xl font-semibold text-green-400">
                {t.about.certification}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Game Section */}
      <section
        ref={gameRef}
        className="min-h-screen flex items-center relative py-24"
      >
        <div className="container mx-auto px-6">
          <h2
            className="text-5xl md:text-6xl font-bold text-center mb-16"
            style={{
              background: "linear-gradient(45deg, #EAB308, #22C55E)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {t.game.title}
          </h2>
          <div className="max-w-4xl mx-auto">
            <WhackAPepe />
          </div>
        </div>
      </section>

      {/* Token Info Section */}
      <section
        ref={tokenomicsRef}
        className="min-h-screen flex items-center relative py-24 bg-black/50"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-5xl md:text-6xl font-bold text-center mb-16"
              style={{
                background: "linear-gradient(45deg, #EAB308, #22C55E)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {t.token.title}
            </h2>

            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
                  <div className="text-sm text-gray-400 mb-2">
                    {t.token.price}
                  </div>
                  <div className="text-3xl font-bold">{data.price}</div>
                </div>
                <div className="p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
                  <div className="text-sm text-gray-400 mb-2">
                    {t.token.marketCap}
                  </div>
                  <div className="text-3xl font-bold">{data.marketCap}</div>
                </div>
                <div className="p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
                  <div className="text-sm text-gray-400 mb-2">
                    {t.token.volume}
                  </div>
                  <div className="text-3xl font-bold">{data.volume}</div>
                </div>
                <div className="p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
                  <div className="text-sm text-gray-400 mb-2">
                    {t.token.change}
                  </div>
                  <div className="text-3xl font-bold text-green-500">
                    {data.change}
                  </div>
                </div>
              </div>

              <div className="space-y-6 font-mono text-gray-300 bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="text-green-400">{t.token.ticker}:</span>
                  <span>$HALAL</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="text-green-400">{t.token.contract}:</span>
                  <span className="break-all">{data.contractAddress}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="text-green-400">{t.token.lp}:</span>
                  <span>Locked</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="text-green-400">{t.token.supply}:</span>
                  <span>{data.totalSupply}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black/80 backdrop-blur-md border-t border-gray-800 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="https://dexscreener.com/solana/gbvetysfnqepyusrrtkqvzidynoiyaubqfmm1bhwqqk7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-green-400 transition-all duration-300"
            >
              {t.footer.dexScreener}
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-green-400 transition-all duration-300"
            >
              {t.footer.twitter}
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-green-400 transition-all duration-300"
            >
              {t.footer.telegram}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
