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
      "Bridged to forgotten chains.",
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
        "Exit Liquidity Intern";

      let likely =
        "Buy tops confidently";

      if (balance > 100000) {
        archetype =
          "Liquidity Addict";

        aura =
          "Whale Behavior";

        likely =
          "Refresh portfolio every 4 minutes";
      }

      if (txCount > 5000) {
        archetype =
          "Onchain Veteran";

        aura =
          "Terminally Online";

        likely =
          "Open 14 tabs daily";
      }

      if (nftCount > 100) {
        archetype =
          "JPEG Collector";

        aura =
          "NFT Brainrot";

        likely =
          "Mint without reading";
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

      {/* BG */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-180px] left-[-180px] w-[500px] h-[500px] rounded-full bg-purple-500 opacity-20 blur-[140px]" />

        <div className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-20 blur-[140px]" />

      </div>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">

        <div className="text-center max-w-5xl mx-auto">

          <h1 className="text-5xl md:text-9xl font-black leading-[0.95] mb-6">

            Your wallet

            <br />

            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">

              has lore.

            </span>

          </h1>

          <p className="text-lg md:text-2xl text-zinc-400 mb-10">

            AI powered wallet
            personality engine.

          </p>

          <div className="flex flex-col gap-3">

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
              className={`w-full h-14 md:h-20 rounded-2xl border px-5 md:px-8 text-sm md:text-xl outline-none bg-zinc-950/80 transition ${
                error
                  ? "border-red-500"
                  : "border-zinc-800"
              }`}
            />

            {error && (
              <p className="text-red-400 text-left text-sm px-2">

                {error}

              </p>
            )}

            <button
              onClick={
                analyzeWallet
              }
              disabled={loading}
              className="w-full h-14 md:h-20 rounded-2xl font-bold text-base md:text-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
            >

              {loading
                ? "Running AI Scan..."
                : "Reveal My Lore"}

            </button>

          </div>

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

          <div
            ref={exportRef}
            className="rounded-[32px] border border-zinc-800 bg-zinc-950/60 p-6 md:p-10 backdrop-blur-xl"
          >

            <div className="flex flex-wrap gap-3 mb-8">

              <div className="px-4 py-2 rounded-full border border-zinc-700 bg-black text-sm">

                {
                  result.ecosystem
                }

              </div>

              <div className="px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm">

                ✓ AI Verified

              </div>

            </div>

            <h1 className="text-5xl md:text-8xl font-black leading-[0.95] mb-6">

              {
                result.archetype
              }

            </h1>

            <p className="text-xl md:text-3xl text-zinc-300 mb-10">

              "
              {
                result.roast
              }
              "

            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

              <div className="rounded-[28px] border border-zinc-800 bg-black p-6">

                <p className="text-zinc-500 mb-3 text-sm">
                  Degen Score
                </p>

                <h2 className="text-5xl md:text-7xl font-black">

                  {
                    animatedScore
                  }

                </h2>

              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-black p-6">

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

              <div className="rounded-[28px] border border-zinc-800 bg-black p-6">

                <p className="text-zinc-500 mb-3 text-sm">
                  Aura
                </p>

                <h2 className="text-3xl md:text-5xl font-black">

                  {result.aura}

                </h2>

              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-black p-6">

                <p className="text-zinc-500 mb-3 text-sm">
                  Most Likely To
                </p>

                <h2 className="text-3xl md:text-4xl font-black">

                  {
                    result.likely
                  }

                </h2>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <button
                onClick={
                  downloadCard
                }
                className="h-14 rounded-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600"
              >
                Download Card
              </button>

              <button
                onClick={shareOnX}
                className="h-14 rounded-2xl font-bold border border-zinc-800 bg-zinc-950"
              >
                Share On X
              </button>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}