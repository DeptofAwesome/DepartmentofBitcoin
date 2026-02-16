import axios from "axios";

export default async function handler(req, res) {
  const { endpoint, coin = "bitcoin", days = "30" } = req.query;

  try {
    if (endpoint === "market") {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&market_data=true`
      );
      res.status(200).json(response.data);
    }
    else if (endpoint === "chart") {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
      );
      res.status(200).json(response.data);
    }
    else if (endpoint === "global") {
      const response = await axios.get("https://api.coingecko.com/api/v3/global");
      res.status(200).json(response.data);
    }
    else if (endpoint === "etf") {
      // Dummy ETF data example
      res.status(200).json({
        etfs: [
          { name: "Grayscale BTC Trust", btc: 4200, usd: 110000000 },
          { name: "Purpose BTC ETF", btc: 1150, usd: 30000000 }
        ]
      });
    }
    else if (endpoint === "treasury") {
      // Dummy corporate treasury example
      res.status(200).json({
        companies: [
          { name: "MicroStrategy", btc: 129218, usd: 3350000000 },
          { name: "Tesla", btc: 48000, usd: 1250000000 }
        ]
      });
    }
    else {
      res.status(400).json({ error: "Invalid endpoint" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
