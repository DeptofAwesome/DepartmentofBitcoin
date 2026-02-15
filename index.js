import axios from "axios";

export default async function handler(req, res) {
  const { endpoint, coin, days } = req.query;

  try {
    if (endpoint === "market") {
      const data = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&market_data=true`
      );
      res.status(200).json(data.data);
    } 
    else if (endpoint === "chart") {
      const data = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
      );
      res.status(200).json(data.data);
    } 
    else if (endpoint === "global") {
      const data = await axios.get("https://api.coingecko.com/api/v3/global");
      res.status(200).json(data.data);
    } 
    else {
      res.status(400).json({ error: "Invalid endpoint" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
