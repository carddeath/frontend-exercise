import { default as React } from "react";
import StockElement from "./StockElement";
import { StockLookup } from "./StockLookup";

function App() {
  const ethereumLookups: Array<StockLookup> = [
    {
      currencySymbol: "$",
      currency: "USD",
      stockLink: "http://34.117.120.204/api/v1/fx/ETHUSD/ohlc",
    },
    {
      currencySymbol: "£",
      currency: "GBP",
      stockLink: "http://34.117.120.204/api/v1/fx/ETHGBP/ohlc",
    },
  ];

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
              <dl className="flex w-full mx-auto bg-white rounded-lg shadow-lg price-container">
                {ethereumLookups.map((stock, index) => {
                  const borderStyle =
                    index % 2 == 0 ? "round-left" : "round-right";
                  return (
                    <StockElement
                      key={`ethereum-${stock.currency}`}
                      stockLookup={stock}
                      additionalClasses={borderStyle}
                    />
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
