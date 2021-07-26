import React, { useEffect, useState } from "react";
import { StockItem } from "./StockDto";
import { useInterval } from "./useInterval";
import "./StockElement.css";
import { StockLookup } from "./StockLookup";

type StockElementProps = {
  stockLookup: StockLookup;
  additionalClasses: string;
};

const StockElement = ({
  stockLookup,
  additionalClasses = "",
}: StockElementProps) => {
  const [price, setPrice] = useState<Array<string>>([]);
  const [oldPrice, setOldPrice] = useState<Array<string>>([]);
  const [startTime, setStartTime] = useState("");

  const getStockPrice = () => {
    fetch(stockLookup.stockLink)
      .then((response) => response.json())
      .then((stockItem: StockItem) => {
        if (stockItem) {
          updateStockDetails(stockItem);
        }
      });
  };

  useInterval(getStockPrice, 5000);

  useEffect(() => {
    getStockPrice();
  }, []);

  const updateStockDetails = (stockItem: StockItem) => {
    const splitPrice = splitPriceSpans(stockItem);
    const currentPrice = price;

    setPrice(splitPrice);
    if (oldPrice.length <= 0) {
      setOldPrice(splitPrice);
    } else {
      setOldPrice(currentPrice);
    }

    const startTimeFormatted = formatStartDate(
      stockItem.startTime.seconds,
      stockItem.endTime.seconds,
    );
    setStartTime(startTimeFormatted.toISOString());
  };

  const formatStartDate = (seconds: number, milliseconds: number) => {
    let freshDate = new Date();
    freshDate.setSeconds(seconds);
    freshDate.setMilliseconds(milliseconds);

    return freshDate;
  };

  const splitPriceSpans = (stockItem: StockItem): Array<string> => {
    const priceCharacters = stockItem.close.split("");
    return priceCharacters;
  };

  return (
    <div
      className={`${additionalClasses} flex flex-col p-6 text-center border-t border-gray-100 tooltip`}
    >
      <span className="tooltiptext">{startTime}</span>
      <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
        ETH/{stockLookup.currency}
      </dt>
      <dd className="order-1 text-5xl font-extrabold">
        <span className="text-gray-500">{stockLookup.currencySymbol}</span>
        {price.map((unit, index) => {
          let style = "text-gray-500";
          if (parseInt(unit, 10) > parseInt(oldPrice[index], 10)) {
            style = "text-green-500";
          } else if (parseInt(unit, 10) < parseInt(oldPrice[index], 10)) {
            style = "text-red-500";
          }
          return (
            <span key={`unit-${index}`} className={style}>
              {unit}
            </span>
          );
        })}
      </dd>
    </div>
  );
};

export default StockElement;
