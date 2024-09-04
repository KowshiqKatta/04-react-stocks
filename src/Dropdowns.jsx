import React, { useState } from "react";
import "./style.css";

const stocksData = [
  { name: "Apple", price: 150 },
  { name: "Google", price: 2800 },
  { name: "Amazon", price: 3300 },
  { name: "Microsoft", price: 299 },
  { name: "Tesla", price: 800 },
  { name: "Facebook", price: 370 },
  { name: "NVIDIA", price: 220 },
  { name: "Netflix", price: 650 },
  { name: "Adobe", price: 620 },
  { name: "Intel", price: 53 },
  { name: "AMD", price: 110 },
  { name: "Cisco", price: 55 },
  { name: "Salesforce", price: 250 },
  { name: "PayPal", price: 220 },
  { name: "Shopify", price: 1400 },
  { name: "Square", price: 200 },
  { name: "Uber", price: 45 },
  { name: "Lyft", price: 16 },
  { name: "Snapchat", price: 70 },
  { name: "Twitter", price: 65 },
  { name: "Alibaba", price: 220 },
  { name: "Baidu", price: 200 },
  { name: "Zoom", price: 280 },
  { name: "Slack", price: 45 },
  { name: "Spotify", price: 250 },
  { name: "Airbnb", price: 180 },
  { name: "Palantir", price: 25 },
  { name: "Snowflake", price: 300 },
  { name: "Robinhood", price: 18 },
  { name: "Pinterest", price: 50 },
];

const brokerFees = {
  Zerodha: {
    commission: 20,
    exchangeFees: 5,
    secFees: 2,
    finraFees: 1,
    platformFees: 10,
  },
  Groww: {
    commission: 25,
    exchangeFees: 4,
    secFees: 3,
    finraFees: 1.5,
    platformFees: 12,
  },
  Upstox: {
    commission: 15,
    exchangeFees: 6,
    secFees: 2.5,
    finraFees: 1.2,
    platformFees: 8,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedBroker, setSelectedBroker] = useState("Zerodha");
  const [filteredStocks, setFilteredStocks] = useState(stocksData);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterStocks(e.target.value, minPrice, maxPrice);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    filterStocks(searchTerm, e.target.value, maxPrice);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    filterStocks(searchTerm, minPrice, e.target.value);
  };

  const filterStocks = (searchTerm, minPrice, maxPrice) => {
    const filtered = stocksData.filter((stock) => {
      const matchesName = stock.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesMinPrice =
        minPrice === "" || stock.price >= parseFloat(minPrice);
      const matchesMaxPrice =
        maxPrice === "" || stock.price <= parseFloat(maxPrice);

      return matchesName && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredStocks(filtered);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleBrokerChange = (e) => {
    setSelectedBroker(e.target.value);
  };

  const calculateFees = () => {
    const fees = brokerFees[selectedBroker];
    return {
      commission: fees.commission * quantity,
      exchangeFees: fees.exchangeFees,
      secFees: fees.secFees,
      finraFees: fees.finraFees,
      platformFees: fees.platformFees,
    };
  };

  const finalPrice = selectedStock
    ? selectedStock.price * quantity +
      Object.values(calculateFees()).reduce((a, b) => a + b, 0)
    : 0;

  const fees = selectedStock ? calculateFees() : {};

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl text-white font-bold mb-4">Buy your favorite stocks</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <input type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <select
          value={selectedBroker}
          onChange={handleBrokerChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="Zerodha">Zerodha</option>
          <option value="Groww">Groww</option>
          <option value="Upstox">Upstox</option>
        </select>
      </div>
      <ul className="list-disc text-white pl-5">
        {filteredStocks.map((stock, index) => (
          <li
            key={index}
            className="list-item mb-2 cursor-pointer p-2 rounded-md"
            onClick={() => {
              setSelectedStock(stock);
              setQuantity(1); // Reset quantity to 1 when a new stock is selected
            }}
          >
            {stock.name}: ₹{stock.price}
          </li>
        ))}
      </ul>

      {selectedStock && (
        <div className="fixed bottom-4 right-4 p-4 bg-white border border-gray-300 shadow-lg rounded-md">
          <h2 className="text-lg font-bold">{selectedStock.name}</h2>
          <p className="text-xl">Price per item: ₹{selectedStock.price}</p>
          <div className="mt-2">
            <label className="block mb-1">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="p-2 border border-gray-300 rounded-md"
              min="1"
            />
          </div>
          <p className="text-xl mt-2">Final Value: ₹{finalPrice.toFixed(2)}</p>
          <div className="mt-2">
            <p className="font-bold">Broker Fees:</p>
            <p>Commission: ₹{fees.commission?.toFixed(2) || 0}</p>
            <p>Exchange Fees: ₹{fees.exchangeFees?.toFixed(2) || 0}</p>
            <p>SEC Fees: ₹{fees.secFees?.toFixed(2) || 0}</p>
            <p>FINRA Fees: ₹{fees.finraFees?.toFixed(2) || 0}</p>
            <p>Platform Fees: ₹{fees.platformFees?.toFixed(2) || 0}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;