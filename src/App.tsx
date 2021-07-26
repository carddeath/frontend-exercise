import { default as React, useState, useEffect } from "react";
import { StockItem } from "./StockDto";

function App() {
  const [price, setPrice] = useState("0");

  const getStockPrice = () => {
    fetch("http://34.117.120.204/api/v1/fx/ETHUSD/ohlc")
      .then((response) => response.json())
      .then((stockItem: StockItem) => {
        if (stockItem) {
          setPrice(stockItem.close);
        }
      });
  };

  useEffect(() => {
    setInterval(() => {
      getStockPrice();
    }, 5000);
  }, []);

  return (
    <div className="pt-12 bg-gray-50 sm:pt-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ethereum Price
          </h2>
        </div>
      </div>
      <div className="pb-12 mt-10 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="w-1/3 mx-auto bg-white rounded-lg shadow-lg">
                <div className="flex flex-col p-6 text-center border-t border-gray-100">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    ETH/USD
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-gray-500">
                    {price}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
