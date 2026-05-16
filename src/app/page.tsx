"use client";

import { useRef, useState } from "react";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const analyzeWallet = async () => {
    if (!wallet) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/analyze?address=${wallet}`
      );

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    const domtoimage = await import("dom-to-image-more");

    try {
      const dataUrl = await domtoimage.default.toPng(
        cardRef.current,
        {
          quality: 1,
          bgcolor: "#000000",
        }
      );

      const link = document.createElement("a");

      link.download = "wallet-resume.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const chains = [
    "Ethereum",
    "Base",
    "Arbitrum",
    "Polygon",
    "Optimism",
    "BNB Chain",
    "Avalanche",
    "Fantom",
    "Linea",
  ];

  const traits = [
    "Multi-Chain User",
    "Ecosystem Explorer",
    "NFT Collector",
    "Active Trader",
    "Veteran User",
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4">
            Wallet Resume
          </h1>

          <p className="text-zinc-400 text-xl">
            Discover your Web3 identity
          </p>
        </div>

        <div className="flex gap-4 mb-12">
          <input
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Paste wallet address..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-lg outline-none"
          />

          <button
            onClick={analyzeWallet}
            className="bg-white text-black px-10 rounded-2xl font-semibold hover:scale-105 transition"
          >
            {loading ? "Loading..." : "Analyze"}
          </button>
        </div>

        {result && (
          <>
            <div
              ref={cardRef}
              className="rounded-[40px] border border-zinc-800 bg-zinc-950/95 p-10 space-y-10 backdrop-blur"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="uppercase text-zinc-500 tracking-widest mb-4">
                    Wallet Identity
                  </p>

                  <h2 className="text-7xl font-bold mb-4">
                    {result.score > 80
                      ? "Onchain Veteran"
                      : result.score > 50
                      ? "Intermediate User"
                      : "New User"}
                  </h2>

                  <p className="text-3xl text-zinc-400">
                    Active across {chains.length} ecosystems
                  </p>
                </div>

                <div className="w-64 h-64 rounded-[32px] bg-black border border-zinc-800 flex flex-col justify-center items-center">
                  <p className="text-zinc-500 mb-4 text-2xl">
                    Wallet Score
                  </p>

                  <h2 className="text-8xl font-bold">
                    {result.score}
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    out of 100
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6">
                <div className="bg-black border border-zinc-800 rounded-[32px] p-8">
                  <p className="text-zinc-500 mb-6 text-2xl">
                    Portfolio Value
                  </p>

                  <h2 className="text-5xl font-bold mb-4">
                    $
                    {Number(
                      result.portfolioValue || 0
                    ).toLocaleString()}
                  </h2>

                  <p className="text-zinc-500 text-xl">
                    Multi-chain assets
                  </p>
                </div>

                <div className="bg-black border border-zinc-800 rounded-[32px] p-8">
                  <p className="text-zinc-500 mb-6 text-2xl">
                    Active Chains
                  </p>

                  <h2 className="text-5xl font-bold mb-4">
                    {chains.length}
                  </h2>

                  <p className="text-zinc-500 text-xl">
                    Ecosystems used
                  </p>
                </div>

                <div className="bg-black border border-zinc-800 rounded-[32px] p-8">
                  <p className="text-zinc-500 mb-6 text-2xl">
                    NFT Holdings
                  </p>

                  <h2 className="text-5xl font-bold mb-4">
                    {result.nfts}
                  </h2>

                  <p className="text-zinc-500 text-xl">
                    NFT assets
                  </p>
                </div>

                <div className="bg-black border border-zinc-800 rounded-[32px] p-8">
                  <p className="text-zinc-500 mb-6 text-2xl">
                    Transactions
                  </p>

                  <h2 className="text-5xl font-bold mb-4">
                    {result.transactions}
                  </h2>

                  <p className="text-zinc-500 text-xl">
                    Recent activity
                  </p>
                </div>
              </div>

              <div className="bg-black border border-zinc-800 rounded-[32px] p-8">
                <p className="uppercase text-zinc-500 tracking-widest mb-8">
                  Active Ecosystems
                </p>

                <div className="flex flex-wrap gap-4">
                  {chains.map((chain) => (
                    <div
                      key={chain}
                      className="px-6 py-4 rounded-full bg-zinc-800"
                    >
                      {chain}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black border border-zinc-800 rounded-[32px] p-8">
                <p className="uppercase text-zinc-500 tracking-widest mb-8">
                  Wallet Traits
                </p>

                <div className="flex flex-wrap gap-4">
                  {traits.map((trait) => (
                    <div
                      key={trait}
                      className="px-6 py-4 rounded-full bg-zinc-800"
                    >
                      {trait}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black border border-zinc-800 rounded-[32px] p-8">
                <p className="uppercase text-zinc-500 tracking-widest mb-8">
                  AI Summary
                </p>

                <p className="text-3xl leading-relaxed text-zinc-300">
                  This wallet shows activity across{" "}
                  {chains.length} ecosystems with{" "}
                  {result.transactions} recent
                  transactions and {result.nfts} NFT
                  assets.
                </p>
              </div>

              <div className="border-t border-zinc-800 pt-8 flex justify-between">
                <a
                  href="https://x.com/S4Sanjay_das"
                  target="_blank"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Made by Sanjay
                </a>

                <p className="text-zinc-500">
                  @S4Sanjay_das
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={downloadCard}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold hover:scale-105 transition"
              >
                Download Card
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}