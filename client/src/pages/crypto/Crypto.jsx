import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./crypto.css";
export default function CryptoTable() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Make a GET request to your Express API to retrieve the first 10 cryptocurrencies with their icons
      const response = await axios.get('/crypto');

      // Set the retrieved cryptocurrency data as state
      setCryptocurrencies(response.data);
    }

    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Icon</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(cryptocurrencies) && cryptocurrencies.map((crypto) => (
          <tr key={crypto.id}>
            <td>{crypto.cmc_rank}</td>
            <td><img src={crypto.iconUrl} alt={`${crypto.name} icon`} /></td>
            <td>{crypto.name}</td>
            <td>{crypto.symbol}</td>
            <td>${crypto.quote.USD.price.toFixed(2)}</td>
            <td>${crypto.quote.USD.market_cap.toLocaleString()}</td>
        
          </tr>
        ))}
      </tbody>
    </table>
  );
}
