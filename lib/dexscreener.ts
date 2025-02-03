export async function getDexData() {
  try {
    const response = await fetch(
      "https://api.dexscreener.com/latest/dex/pairs/solana/gbvetysfnqepyusrrtkqvzidynoiyaubqfmm1bhwqqk7",
    )
    const data = await response.json()
    const pair = data.pairs[0]

    return {
      price: `$${Number.parseFloat(pair.priceUsd).toFixed(8)}`,
      change: `${Number.parseFloat(pair.priceChange.h24).toFixed(2)}%`,
      volume: `$${Number.parseInt(pair.volume.h24).toLocaleString()}`,
      marketCap: `$${Number.parseInt(pair.fdv).toLocaleString()}`,
      totalSupply: Number.parseInt(pair.liquidity.base).toLocaleString(),
      contractAddress: pair.baseToken.address,
    }
  } catch (error) {
    console.error("Error fetching DEX data:", error)
    return {
      price: "$0.00000000",
      change: "0.00%",
      volume: "$0",
      marketCap: "$0",
      totalSupply: "0",
      contractAddress: "ML6CUJc3PypAEMcbgM2CcnPzzbBSdBMSN6cwqCGzBEJ",
    }
  }
}

