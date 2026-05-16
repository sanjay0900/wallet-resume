"use client";

import { useState } from "react";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!wallet) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/${wallet}/balance?chain=eth`,
        {
          headers: {
            "X-API-Key":
              process.env.NEXT_PUBLIC_MORALIS_API_KEY || "",
          },
        }
      );

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);

      setResult({
        error: "Failed to fetch wallet data",
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full text-center">

        <h1 className="text-6xl font-bold mb-6">
          Wallet Resume
        </h1>

        <p className="text-gray-400 mb-10 text-lg">
          Discover your Web3 identity from wallet activity.
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Paste wallet address..."
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="flex-1 px-5 py-4 rounded-xl bg-zinc-900 border border-zinc-700 outline-none text-lg"
          />

          <button
            onClick={handleAnalyze}
            className="bg-white text-black px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Analyze
          </button>
        </div>

        {loading && (
          <p className="mt-6 text-gray-400">
            Analyzing wallet...
          </p>
        )}

        {result && (
          <div className="mt-10 bg-zinc-900 border border-zinc-700 rounded-3xl p-8 text-left space-y-8">

            {result.error ? (
              <p>{result.error}</p>
            ) : (
              <>
                <div>
                  <h2 className="text-4xl font-bold mb-2">
                    Web3 Identity
                  </h2>

                  <p className="text-gray-400">
                    Generated from onchain wallet activity
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                  <div className="bg-black/40 p-5 rounded-2xl border border-zinc-800">
                    <p className="text-gray-400 text-sm">
                      Wallet Type
                    </p>

                    <h3 className="text-2xl font-semibold mt-2">
                      {Number(result.balance) / 1e18 > 5
                        ? "Onchain Veteran"
                        : Number(result.balance) / 1e18 > 0.1
                        ? "DeFi Explorer"
                        : "New User"}
                    </h3>
                  </div>

                  <div className="bg-black/40 p-5 rounded-2xl border border-zinc-800">
                    <p className="text-gray-400 text-sm">
                      Experience Level
                    </p>

                    <h3 className="text-2xl font-semibold mt-2">
                      {Number(result.balance) / 1e18 > 10
                        ? "Advanced"
                        : Number(result.balance) / 1e18 > 1
                        ? "Intermediate"
                        : "Beginner"}
                    </h3>
                  </div>

                  <div className="bg-black/40 p-5 rounded-2xl border border-zinc-800">
                    <p className="text-gray-400 text-sm">
                      ETH Balance
                    </p>

                    <h3 className="text-2xl font-semibold mt-2">
                      {(Number(result.balance) / 1e18).toFixed(4)} ETH
                    </h3>
                  </div>

                  <div className="bg-black/40 p-5 rounded-2xl border border-zinc-800">
                    <p className="text-gray-400 text-sm">
                      Primary Chain
                    </p>

                    <h3 className="text-2xl font-semibold mt-2">
                      Ethereum
                    </h3>
                  </div>

                  <div className="bg-black/40 p-5 rounded-2xl border border-zinc-800">
                    <p className="text-gray-400 text-sm">
                      Wallet Score
                    </p>

                    <h3 className="text-2xl font-semibold mt-2">
                      {Math.min(
                        100,
                        Math.floor(Number(result.balance) / 1e18 * 10 + 20)
                      )}
                      /100
                    </h3>
                  </div>

                </div>

                <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800">
                  <p className="text-gray-400 text-sm mb-4">
                    Wallet Traits
                  </p>

                  <div className="flex flex-wrap gap-3">

                    <span className="px-4 py-2 rounded-full bg-zinc-800 text-sm">
                      NFT Curious
                    </span>

                    <span className="px-4 py-2 rounded-full bg-zinc-800 text-sm">
                      Long-Term Holder
                    </span>

                    <span className="px-4 py-2 rounded-full bg-zinc-800 text-sm">
                      Ethereum Native
                    </span>

                    <span className="px-4 py-2 rounded-full bg-zinc-800 text-sm">
                      Early Adopter
                    </span>

                  </div>
                </div>

                <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-2xl border border-zinc-700">
                  <p className="text-gray-400 text-sm mb-3">
                    AI Summary
                  </p>

                  <p className="leading-8 text-gray-200 text-lg">
                    This wallet shows signs of a consistent Ethereum ecosystem
                    user with moderate DeFi exposure and long-term holding
                    behavior.
                  </p>
                </div>

              </>
            )}
          </div>
        )}

      </div>
    </main>
  );
}