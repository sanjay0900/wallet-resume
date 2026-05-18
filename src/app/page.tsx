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

  const [error, setError] =
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

  const ecosystems = [
    "ETH Maxi",
    "Base Degen",
    "Solana Gambler",
    "NFT Mercenary",
    "Airdrop Farmer",
    "Perps Goblin",
    "Bridge Addict",
    "Stablecoin Sleeper",
  ];

  const roastMap: any = {
    "ETH Maxi": [
      "Pays gas proudly.",
      "Still fighting L1 wars.",
      "Ultra sound money believer.",
    ],

    "Base Degen": [
      "Farmed every Base app possible.",
      "Bridged before reading docs.",
      "Probably joined Base summer.",
    ],

    "Solana Gambler": [
      "Fast transactions. Faster losses.",
      "Bought a meme coin at peak.",
      "Opened Photon before breakfast.",
    ],

    "NFT Mercenary": [
      "JPEG addiction detected.",
      "Minted first. Asked later.",
      "Emotionally rugged but bullish.",
    ],

    "Airdrop Farmer": [
      "Professional protocol clicker.",
      "Sybil allegations pending.",
      "Interacted with 500 apps for $12.",
    ],

    "Perps Goblin": [
      "High leverage behavior detected.",
      "Risk management missing.",
      "Definitely revenge traded.",
    ],

    "Bridge Addict": [
      "Bridged before reading docs.",
      "Crosschain addiction detected.",
      "Bridge fees became personality.",
    ],

    "Stablecoin Sleeper": [
      "Waiting for better entry forever.",
      "Emotionally defensive trader.",
      "Bull market observer only.",
    ],
  };

  const validateWallet = (
    address: string
  ) => {
    return /^0x[a-fA-F0-9]{40}$/.test(
      address
    );
  };

  const analyzeWallet = async () => {
    if (!wallet) {
      setError(
        "Please enter wallet address."
      );

      return;
    }

    const isValid =
      validateWallet(wallet);

    if (!isValid) {
      setError(
        "Invalid EVM wallet address."
      );

      return;
    }

    setError("");

    try {
      setLoading(true);

      setResult(null);

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            2200
          )
      );

      const ecosystem =
        ecosystems[
          Math.floor(
            Math.random() *
              ecosystems.length
          )
        ];

      const roastPool =
        roastMap[ecosystem];

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
        "Main Character Energy";

      let likely =
        "Buy tops confidently";

      if (
        ecosystem ===
        "NFT Mercenary"
      ) {
        archetype =
          "JPEG Collector";

        aura =
          "NFT Brainrot";

        likely =
          "Mint before reading";
      }

      if (
        ecosystem ===
        "Perps Goblin"
      ) {
        archetype =
          "Onchain Degenerate";

        aura =
          "Terminally Online";

        likely =
          "Use 50x confidently";
      }

      if (
        ecosystem ===
        "Bridge Addict"
      ) {
        archetype =
          "Liquidity Addict";

        aura =
          "Crosschain Menace";

        likely =
          "Bridge to dead chains";
      }

      setResult({
        archetype,
        ecosystem,
        roast,
        aura,
        likely,
        confidence:
          Math.floor(
            Math.random() * 8
          ) + 92,
        degenLevel:
          Math.floor(
            Math.random() * 25
          ) + 75,
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
        (
          await import(
            "html2canvas"
          )
        ).default;

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

    const text = `🧠 Wallet Lore

${result.archetype}
${result.ecosystem}

"${result.roast}"

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

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-220px] left-[-220px] w-[620px] h-[620px] rounded-full bg-purple-600 opacity-20 blur-[180px]" />

        <div className="absolute bottom-[-220px] right-[-220px] w-[620px] h-[620px] rounded-full bg-cyan-500 opacity-20 blur-[180px]" />

      </div>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">

        <div className="flex items-center justify-between mb-14">

          <h1 className="text-2xl md:text-4xl font-black">

            Wallet Resume

          </h1>

          <p className="text-zinc-400">

            @S4Sanjay_das

          </p>

        </div>

        <div className="text-center max-w-5xl mx-auto">

          <div className="inline-flex items-center gap-2 border border-zinc-800 rounded-full px-5 py-2 bg-black/50 mb-8">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm text-zinc-300">

              AI Wallet Identity Engine

            </span>

          </div>

          <h1 className="text-5xl md:text-8xl font-black leading-[0.95] mb-6">

            Your wallet

            <br />

            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">

              has lore.

            </span>

          </h1>

          <p className="text-lg md:text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto">

            Discover your ecosystem addiction,
            degen psychology and onchain reputation.

          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">

            <input
              value={wallet}
              onChange={(e) => {
                setWallet(
                  e.target.value
                );

                if (error)
                  setError("");
              }}
              placeholder="Paste EVM wallet address..."
              className={`flex-1 h-14 md:h-20 rounded-2xl border px-5 md:px-8 text-sm md:text-xl outline-none bg-zinc-950/80 transition ${
                error
                  ? "border-red-500"
                  : "border-zinc-800"
              }`}
            />

            <button
              onClick={
                analyzeWallet
              }
              disabled={loading}
              className="h-14 md:h-20 px-8 rounded-2xl font-bold text-base md:text-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:scale-[1.02] transition-all"
            >

              {loading
                ? "Running AI Scan..."
                : "Reveal My Lore"}

            </button>

          </div>

          {error && (
            <p className="text-red-400 text-sm mt-3">

              {error}

            </p>
          )}

        </div>

      </section>

      {/* RESULT */}
      {result && (
        <section
          className={`relative z-10 max-w-6xl mx-auto px-4 md:px-6 pb-20 transition-all duration-700 ${
            showResult
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >

          <div className="rounded-[36px] border border-zinc-800 bg-zinc-950/60 p-6 md:p-10 backdrop-blur-xl relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

            <div className="relative z-10">

              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

                <div className="flex gap-3 flex-wrap">

                  <div className="px-4 py-2 rounded-full border border-zinc-700 bg-black text-sm">

                    {result.ecosystem}

                  </div>

                  <div className="px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm">

                    ✓ AI Verified

                  </div>

                </div>

                <div className="text-sm text-zinc-500 font-mono">

                  {wallet.slice(0, 6)}...
                  {wallet.slice(-4)}

                </div>

              </div>

              <p className="text-zinc-500 uppercase tracking-[0.35em] text-xs md:text-sm mb-5">

                Wallet Identity

              </p>

              <h1 className="text-5xl md:text-8xl font-black leading-[0.92] mb-6">

                {result.archetype}

              </h1>

              <p className="text-xl md:text-3xl text-zinc-300 mb-12 max-w-4xl leading-relaxed">

                "
                {result.roast}
                "

              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">

                <div className="rounded-[28px] border border-zinc-800 bg-black/70 p-6">

                  <p className="text-zinc-500 mb-3 text-sm">

                    {result.aura}

                  </p>

                  <h2 className="text-3xl md:text-5xl font-black leading-tight">

                    Legendary
                    <br />
                    Menace

                  </h2>

                </div>

                <div className="rounded-[28px] border border-zinc-800 bg-black/70 p-6">

                  <p className="text-zinc-500 mb-3 text-sm">

                    Touch Grass Index

                  </p>

                  <h2 className="text-5xl md:text-7xl font-black">

                    {100 -
                      animatedScore}
                    %

                  </h2>

                </div>

                <div className="rounded-[28px] border border-zinc-800 bg-black/70 p-6">

                  <p className="text-zinc-500 mb-3 text-sm">

                    Most Likely To

                  </p>

                  <h2 className="text-3xl md:text-5xl font-black leading-tight">

                    {result.likely}

                  </h2>

                </div>

              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-black/70 p-6 mb-12">

                <div className="flex items-center justify-between mb-4">

                  <p className="text-zinc-500 text-sm">

                    Degen Score

                  </p>

                  <p className="text-zinc-500 text-sm">

                    AI Confidence{" "}
                    {
                      animatedConfidence
                    }
                    %

                  </p>

                </div>

                <div className="h-4 rounded-full bg-zinc-900 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-1000"
                    style={{
                      width: `${animatedScore}%`,
                    }}
                  />

                </div>

                <div className="text-6xl md:text-8xl font-black mt-6">

                  {animatedScore}

                </div>

              </div>

              <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                <div>

                  <p className="text-zinc-500 mb-2">

                    Generated by Wallet Resume

                  </p>

                  <p className="text-purple-400">

                    Built by @S4Sanjay_das

                  </p>

                </div>

                <div className="text-left md:text-right">

                  <p className="text-zinc-400 font-semibold">

                    walletresume.xyz

                  </p>

                  <p className="text-zinc-600 text-sm">

                    Web3 Identity Layer

                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

            <button
              onClick={
                downloadCard
              }
              className="h-14 rounded-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 hover:scale-[1.01] transition-all"
            >

              Download Card

            </button>

            <button
              onClick={shareOnX}
              className="h-14 rounded-2xl font-bold border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-all"
            >

              Share On X

            </button>

          </div>

        </section>
      )}

      {/* EXPORT CARD */}
      {result && (
        <div className="fixed left-[-9999px] top-0">

          <div
            ref={exportRef}
            className="w-[1200px] h-[1350px] rounded-[56px] overflow-hidden relative text-white"
            style={{
              background:
                "linear-gradient(145deg, #040404 0%, #090909 60%, #061418 100%)",
            }}
          >

            {/* GLOW */}
            <div className="absolute top-[-120px] left-[-120px] w-[360px] h-[360px] rounded-full bg-purple-600 opacity-10 blur-[120px]" />

            <div className="absolute bottom-[-120px] right-[-120px] w-[360px] h-[360px] rounded-full bg-cyan-500 opacity-10 blur-[120px]" />

            {/* NOISE */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="absolute inset-0 border border-white/10 rounded-[56px]" />

            <div className="relative z-10 h-full flex flex-col justify-between p-20">

              <div>

                <div className="flex items-center justify-between mb-16">

                  <div className="flex gap-3">

                    <div className="px-5 py-2 rounded-full border border-zinc-700 bg-black text-xl">

                      {result.ecosystem}

                    </div>

                    <div className="px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-xl">

                      ✓ AI Verified

                    </div>

                  </div>

                  <div className="text-zinc-500 font-mono text-2xl">

                    {wallet.slice(0, 6)}...
                    {wallet.slice(-4)}

                  </div>

                </div>

                <p className="text-zinc-500 uppercase tracking-[0.4em] text-xl mb-8">

                  Wallet Identity

                </p>

                <h1 className="text-[120px] leading-[0.9] font-black tracking-[-0.05em] mb-10 max-w-5xl">

                  {result.archetype}

                </h1>

                <p className="text-5xl text-zinc-300 leading-relaxed mb-24 max-w-5xl">

                  "
                  {result.roast}
                  "

                </p>

                <div className="grid grid-cols-2 gap-8">

                  <div className="rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10">

                    <p className="text-zinc-500 text-xl mb-6">

                      Degen Score

                    </p>

                    <div className="flex items-end gap-5">

                      <h2 className="text-[150px] leading-none font-black text-white">

                        {
                          result.degenLevel
                        }

                      </h2>

                      <span className="text-zinc-500 text-5xl mb-6 font-semibold">

                        /100

                      </span>

                    </div>

                  </div>

                  <div className="rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10">

                    <p className="text-zinc-500 text-xl mb-6">

                      Touch Grass Index

                    </p>

                    <h2 className="text-[130px] leading-none font-black">

                      {100 -
                        result.degenLevel}
                      %

                    </h2>

                  </div>

                </div>

              </div>

              <div className="pt-10 border-t border-white/10 flex items-end justify-between">

                <div>

                  <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 text-transparent bg-clip-text">

                    Wallet Resume

                  </h2>

                  <p className="text-zinc-500 text-2xl">

                    Built by @S4Sanjay_das

                  </p>

                </div>

                <div className="text-right">

                  <p className="text-zinc-300 text-3xl font-semibold mb-3">

                    walletresume.xyz

                  </p>

                  <p className="text-zinc-600 text-xl">

                    Web3 Identity Layer

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}