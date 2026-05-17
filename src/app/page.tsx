"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function Home() {
  const exportRef =
    useRef<HTMLDivElement>(null);

  const [wallet, setWallet] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showResult, setShowResult] =
    useState(false);

  const [animatedScore, setAnimatedScore] =
    useState(0);

  const [
    animatedConfidence,
    setAnimatedConfidence,
  ] = useState(0);

  const [result, setResult] =
    useState<any>(null);

  useEffect(() => {
    if (!result) return;

    setShowResult(false);

    setTimeout(() => {
      setShowResult(true);
    }, 100);

    let score = 0;

    const scoreInterval = setInterval(() => {
      score += 1;

      if (
        score >= result.degenLevel
      ) {
        score =
          result.degenLevel;

        clearInterval(
          scoreInterval
        );
      }

      setAnimatedScore(score);
    }, 15);

    let conf = 0;

    const confInterval =
      setInterval(() => {
        conf += 1;

        if (
          conf >=
          result.confidence
        ) {
          conf =
            result.confidence;

          clearInterval(
            confInterval
          );
        }

        setAnimatedConfidence(
          conf
        );
      }, 20);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(confInterval);
    };
  }, [result]);

  const ecosystemProfiles = {
    "ETH Maxi": [
      "Gas fees build character.",
      "This wallet definitely defended Ethereum during congestion.",
      "Probably calls Solana centralized daily.",
    ],

    "Base Degen": [
      "Bridged before reading documentation.",
      "Base user detected. Probability of farming unknown apps: 94%",
      "You definitely said ‘this ecosystem is early’.",
    ],

    "Solana Gambler": [
      "This wallet has seen things.",
      "Likely bought a coin named after food.",
      "Fast transactions. Faster losses.",
    ],

    "NFT Mercenary": [
      "JPEG addiction remains untreated.",
      "Minted first. Asked questions later.",
      "This wallet survived multiple rug pulls somehow.",
    ],

    "Airdrop Farmer": [
      "Professional button clicker.",
      "Interacted with 400 protocols for $11 reward.",
      "Sybil allegations pending.",
    ],

    "Perps Goblin": [
      "High leverage detected.",
      "This wallet definitely revenge traded.",
      "Risk management left the chat.",
    ],
  };

  const ecosystems = Object.keys(
    ecosystemProfiles
  );

  const rarityTiers = [
    "Common",
    "Rare",
    "Epic",
    "Legendary",
  ];

  const analyzeWallet = async () => {
    if (!wallet) return;

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch(
        `/api/analyze?address=${wallet}`
      );

      const data =
        await response.json();

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            2500
          )
      );

      const balance = Number(
        data.balance ||
          data.portfolioValue ||
          0
      );

      const txCount = Number(
        data.transactions || 0
      );

      const nftCount = Number(
        data.nftCount || 0
      );

      const ecosystem =
        ecosystems[
          Math.floor(
            Math.random() *
              ecosystems.length
          )
        ];

      const roastPool =
        ecosystemProfiles[
          ecosystem as keyof typeof ecosystemProfiles
        ];

      const roast =
        roastPool[
          Math.floor(
            Math.random() *
              roastPool.length
          )
        ];

      let archetype =
        "Retail Survivor";

      let aura =
        "Exit Liquidity Intern";

      let energy =
        "Bullposting Specialist";

      let likely =
        "Buy tops confidently";

      if (balance > 100000) {
        archetype =
          "Liquidity Addict";

        aura =
          "Whale Behavior";

        energy =
          "Main Character Trader";

        likely =
          "Refresh portfolio every 4 minutes";
      }

      if (txCount > 5000) {
        archetype =
          "Onchain Veteran";

        aura =
          "Liquidity War Survivor";

        energy =
          "Terminally Online";

        likely =
          "Open 14 tabs before breakfast";
      }

      if (nftCount > 100) {
        archetype =
          "JPEG Collector";

        aura =
          "NFT Brainrot";

        energy =
          "NFT Archaeologist";

        likely =
          "Mint without reading";
      }

      const rarity =
        rarityTiers[
          Math.floor(
            Math.random() *
              rarityTiers.length
          )
        ];

      setResult({
        archetype,
        aura,
        energy,
        likely,
        roast,
        ecosystem,
        rarity,
        confidence:
          Math.floor(
            Math.random() * 8
          ) + 92,
        degenLevel:
          Math.floor(
            Math.random() * 25
          ) + 75,
        touchGrass:
          Math.floor(
            Math.random() * 15
          ) + 5,
      });
    } catch (err) {
      console.log(err);

      alert(
        "Wallet analysis failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = async () => {
    if (!exportRef.current) return;

    try {
      const html2canvas =
        (await import(
          "html2canvas"
        )).default;

      const canvas =
        await html2canvas(
          exportRef.current,
          {
            backgroundColor:
              "#000000",
            scale: 2,
            useCORS: true,
          }
        );

      const image =
        canvas.toDataURL(
          "image/png"
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = image;

      link.download =
        "wallet-lore-card.png";

      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  const shareOnX = () => {
    if (!result) return;

    const text = `🧠 My Wallet Lore

${result.archetype}
${result.ecosystem}

"${result.roast}"

AI Confidence: ${result.confidence}%

Analyze yours 👇`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;

    window.open(
      url,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* BG */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-180px] left-[-180px] w-[400px] md:w-[550px] h-[400px] md:h-[550px] rounded-full bg-purple-500 opacity-20 blur-[140px]" />

        <div className="absolute bottom-[-180px] right-[-180px] w-[400px] md:w-[550px] h-[400px] md:h-[550px] rounded-full bg-cyan-500 opacity-20 blur-[140px]" />

      </div>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">

        <div className="flex items-center justify-between mb-12 md:mb-24">

          <h1 className="text-2xl md:text-4xl font-black">
            Wallet Resume
          </h1>

          <a
            href="https://x.com/S4Sanjay_das"
            target="_blank"
            className="text-sm md:text-base text-zinc-400 hover:text-white transition"
          >
            @S4Sanjay_das
          </a>

        </div>

        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950 mb-8">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-xs md:text-sm text-zinc-300">

              AI Wallet Identity Engine

            </span>

          </div>

          <h1 className="text-5xl sm:text-6xl md:text-9xl font-black leading-[0.95] mb-6">

            Your wallet

            <br />

            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">

              has lore.

            </span>

          </h1>

          <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed mb-10 max-w-3xl mx-auto">

            Discover your
            ecosystem addiction,
            degen psychology and
            onchain reputation.

          </p>

          <div className="flex flex-col gap-4">

            <input
              value={wallet}
              onChange={(e) =>
                setWallet(
                  e.target.value
                )
              }
              placeholder="Paste wallet address..."
              className="w-full h-14 md:h-20 rounded-2xl md:rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 md:px-8 text-sm md:text-xl outline-none"
            />

            <button
              onClick={
                analyzeWallet
              }
              disabled={loading}
              className="w-full h-14 md:h-20 rounded-2xl md:rounded-3xl font-bold text-base md:text-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:scale-[1.01] transition flex items-center justify-center"
            >

              {loading ? (
                <div className="flex items-center gap-3">

                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                  <span>
                    Scanning
                    Wallet...
                  </span>

                </div>
              ) : (
                "Reveal My Lore"
              )}

            </button>

          </div>

        </div>

      </section>

      {/* LOADING */}
      {loading && (
        <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 pb-12">

          <div className="rounded-[32px] border border-zinc-800 bg-zinc-950/60 backdrop-blur-xl p-8 md:p-12">

            <p className="uppercase tracking-[0.4em] text-zinc-500 text-xs md:text-sm mb-8">

              AI Analysis Running

            </p>

            <h2 className="text-4xl md:text-7xl font-black leading-tight mb-10">

              Reading your
              <br />
              onchain behavior...

            </h2>

            <div className="space-y-5">

              {[
                "Scanning transaction history",
                "Detecting ecosystem addiction",
                "Analyzing gambling tendencies",
                "Calculating psychological damage",
                "Generating emotional violation",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-zinc-300 text-sm md:text-xl"
                >

                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />

                  {item}

                </div>
              ))}

            </div>

          </div>

        </section>
      )}

      {/* RESULT */}
      {result && (
        <section
          className={`relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-20 transition-all duration-700 ${
            showResult
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >

          <div className="rounded-[32px] border border-zinc-800 bg-zinc-950/60 p-6 md:p-10 relative overflow-hidden backdrop-blur-xl">

            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="relative z-10">

              {/* TOP BADGES */}
              <div className="flex flex-wrap gap-3 mb-8">

                <div className="px-4 py-2 rounded-full border border-zinc-700 bg-black text-sm">

                  {
                    result.ecosystem
                  }

                </div>

                <div className="px-4 py-2 rounded-full border border-zinc-700 bg-black text-sm">

                  {
                    result.rarity
                  }{" "}
                  Tier

                </div>

                <div className="px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm">

                  ✓ AI Verified

                </div>

              </div>

              {/* TITLE */}
              <div className="mb-10">

                <p className="uppercase tracking-[0.4em] text-zinc-500 text-xs mb-4">

                  Wallet Identity

                </p>

                <h1 className="text-5xl md:text-8xl font-black leading-[0.95] mb-6">

                  {
                    result.archetype
                  }

                </h1>

                <p className="text-xl md:text-3xl text-zinc-300 leading-relaxed max-w-4xl">

                  "
                  {
                    result.roast
                  }
                  "

                </p>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

                <div className="rounded-[28px] border border-zinc-800 bg-black p-6 md:p-8">

                  <p className="text-zinc-500 mb-3 text-sm">
                    Degen Score
                  </p>

                  <h2 className="text-5xl md:text-7xl font-black">

                    {
                      animatedScore
                    }

                  </h2>

                </div>

                <div className="rounded-[28px] border border-zinc-800 bg-black p-6 md:p-8">

                  <p className="text-zinc-500 mb-3 text-sm">
                    AI Confidence
                  </p>

                  <h2 className="text-5xl md:text-7xl font-black">

                    {
                      animatedConfidence
                    }
                    %

                  </h2>

                </div>

                <div className="rounded-[28px] border border-zinc-800 bg-black p-6 md:p-8">

                  <p className="text-zinc-500 mb-3 text-sm">
                    Onchain Aura
                  </p>

                  <h2 className="text-3xl md:text-5xl font-black leading-tight">

                    {
                      result.aura
                    }

                  </h2>

                </div>

                <div className="rounded-[28px] border border-zinc-800 bg-black p-6 md:p-8">

                  <p className="text-zinc-500 mb-3 text-sm">
                    Most Likely To
                  </p>

                  <h2 className="text-3xl md:text-4xl font-black leading-tight">

                    {
                      result.likely
                    }

                  </h2>

                </div>

              </div>

              {/* BUTTONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <button
                  onClick={
                    downloadCard
                  }
                  className="h-14 md:h-16 rounded-2xl font-bold text-base md:text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 hover:scale-[1.01] transition"
                >
                  Download Card
                </button>

                <button
                  onClick={shareOnX}
                  className="h-14 md:h-16 rounded-2xl font-bold text-base md:text-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition"
                >
                  Share On X
                </button>

              </div>

            </div>

          </div>

        </section>
      )}

      {/* EXPORT CARD */}
      {result && (
        <div className="fixed left-[-9999px] top-0">

          <div
            ref={exportRef}
            className="w-[1200px] h-[1200px] bg-black text-white p-20 flex flex-col justify-between relative overflow-hidden"
          >

            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="relative z-10">

              <div className="flex gap-4 mb-10">

                <div className="px-5 py-3 rounded-full border border-zinc-700 bg-black text-xl">

                  {
                    result.ecosystem
                  }

                </div>

                <div className="px-5 py-3 rounded-full border border-zinc-700 bg-black text-xl">

                  {
                    result.rarity
                  }{" "}
                  Tier

                </div>

                <div className="px-5 py-3 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-xl">

                  ✓ AI VERIFIED

                </div>

              </div>

              <h1 className="text-[100px] leading-[0.9] font-black mb-10">

                {
                  result.archetype
                }

              </h1>

              <p className="text-5xl leading-tight text-zinc-300 max-w-5xl mb-20">

                "
                {
                  result.roast
                }
                "

              </p>

              <div className="grid grid-cols-2 gap-8">

                <div className="rounded-[36px] border border-zinc-800 bg-black p-10">

                  <p className="text-zinc-500 text-2xl mb-6">
                    Degen Score
                  </p>

                  <h2 className="text-8xl font-black">

                    {
                      result.degenLevel
                    }

                  </h2>

                </div>

                <div className="rounded-[36px] border border-zinc-800 bg-black p-10">

                  <p className="text-zinc-500 text-2xl mb-6">
                    AI Confidence
                  </p>

                  <h2 className="text-8xl font-black">

                    {
                      result.confidence
                    }
                    %

                  </h2>

                </div>

              </div>

            </div>

            <div className="relative z-10 border-t border-zinc-800 pt-10 flex justify-between items-center">

              <div>

                <h2 className="text-5xl font-black mb-3">
                  Wallet Resume
                </h2>

                <p className="text-zinc-500 text-2xl">
                  Built by
                  @S4Sanjay_das
                </p>

              </div>

              <div className="text-right">

                <h2 className="text-5xl font-black mb-3">
                  walletresume.xyz
                </h2>

                <p className="text-zinc-500 text-2xl">
                  AI Wallet Identity
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}