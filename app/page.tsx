"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getDexData } from "@/lib/dexscreener";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import type React from "react";
import WhackAPepe from "@/components/ui/whack-a-pepe";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import Head from "next/head";
import ThreeBackground from "@/components/ui/threecomponent";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const dexData = await getDexData();
      setData(dexData);
      setIsLoading(false);
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <Head>
        <title>Halal Pepe - The First Halal-Certified Memecoin on Solana</title>
        <meta
          name="description"
          content="Halal Pepe is the world's first fully Halal-certified memecoin on the Solana network, bridging Islamic finance with cryptocurrency."
        />
        <meta
          name="keywords"
          content="Halal Pepe, cryptocurrency, Solana, memecoin, Islamic finance"
        />
        <meta
          property="og:title"
          content="Halal Pepe - The First Halal-Certified Memecoin on Solana"
        />
        <meta
          property="og:description"
          content="Discover Halal Pepe, the world's first fully Halal-certified memecoin on the Solana network."
        />
        <meta
          property="og:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/halal1-93OG91i3znNnj28AffP1ZILsuz75eF.jpeg"
        />
        <meta property="og:url" content="https://halalpepe.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div
        className={`min-h-screen bg-gradient-to-b ${
          isDarkMode
            ? "from-black via-black to-gray-900 text-white"
            : "from-white via-white to-gray-100 text-black"
        } transition-colors duration-300`}
      >
        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 ${
            isDarkMode ? "bg-black/80" : "bg-white/80"
          } backdrop-blur-md border-b ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Hamburger Menu Button - Mobile Only */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <div
                  className={`w-6 h-0.5 ${
                    isDarkMode ? "bg-white" : "bg-black"
                  } mb-1.5 transition-all ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <div
                  className={`w-6 h-0.5 ${
                    isDarkMode ? "bg-white" : "bg-black"
                  } mb-1.5 transition-all ${isMenuOpen ? "opacity-0" : ""}`}
                />
                <div
                  className={`w-6 h-0.5 ${
                    isDarkMode ? "bg-white" : "bg-black"
                  } transition-all ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex flex-1 items-center justify-center space-x-8 lg:space-x-12 relative">
                {/* Image positioned higher and slightly larger */}
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/halal.jpg-D7yPV4uhADFNjqn6OYnBL8l1Qt6y8N.jpeg"
                  alt="Halal Certified"
                  width={50}
                  height={50}
                  className="w-14 h-14 rounded-xl shadow-lg object-cover absolute left-0 top-[-1rem]"
                />

                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
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

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

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
          <div
            className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none"
            style={{
              background: `
      radial-gradient(
        circle at center, 
        rgba(34,197,94,0.1) 0%, 
        rgba(234,179,8,0.05) 100%
      )
    `,
              animation: "pulse 5s infinite",
              mixBlendMode: "overlay",
            }}
          />
          <div className="relative container mx-auto px-6 flex flex-col items-center justify-center">
            <motion.h1
              className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-center leading-none tracking-tighter mb-8 relative"
              style={{
                background: "linear-gradient(45deg, #22C55E 30%, #EAB308 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
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
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(234, 179, 8, 0.2))",
                  filter: "blur(40px)",
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="https://i.imgur.com/76AZ32R.jpeg"
                alt="Halal Pepe"
                width={1200}
                height={600}
                className="w-full max-w-4xl h-auto object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 text-xl mt-3 rounded-full transition-all shadow-lg relative overflow-hidden group"
                  onClick={() =>
                    window.open(
                      "https://jup.ag/tokens/ML6CUJc3PypAEMcbgM2CcnPzzbBSdBMSN6cwqCGzBEJ",
                      "_blank"
                    )
                  }
                >
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                  {t.hero.buyNow}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section
          ref={aboutRef}
          className="min-h-screen flex items-center relative py-24 bg-black/50"
        >
          <div className="container mx-auto px-6">
            {" "}
            <ThreeBackground />
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
                  <AnimatePresence>
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="col-span-2 text-center"
                      >
                        <p className="text-xl">Loading token data...</p>
                      </motion.div>
                    ) : (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800"
                        >
                          <div className="text-sm text-gray-400 mb-2">
                            {t.token.price}
                          </div>
                          <div className="text-3xl font-bold">{data.price}</div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800"
                        >
                          <div className="text-sm text-gray-400 mb-2">
                            {t.token.marketCap}
                          </div>
                          <div className="text-3xl font-bold">
                            {data.marketCap}
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800"
                        >
                          <div className="text-sm text-gray-400 mb-2">
                            {t.token.volume}
                          </div>
                          <div className="text-3xl font-bold">
                            {data.volume}
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800"
                        >
                          <div className="text-sm text-gray-400 mb-2">
                            {t.token.change}
                          </div>
                          <div className="text-3xl font-bold text-green-500">
                            {data.change}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6 font-mono text-gray-300 bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800"
                >
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
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`w-full ${
            isDarkMode ? "bg-black/80" : "bg-white/80"
          } backdrop-blur-md border-t ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          } py-6`}
        >
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
    </>
  );
}
