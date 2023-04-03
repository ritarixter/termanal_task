import { ICurrencies } from "./types";

export const generateValuesCurrency = (currencies: Array<ICurrencies>) => {
  const max = 2;
  const min = 1;
  currencies.forEach((currency: { priceBuy: string; priceSell: string }) => {
    const valueSell = Math.random() * (max - min) + min;
    const valueBuy = Math.random() * (max - valueSell) + valueSell;
    currency.priceBuy = String(valueBuy).slice(0, 6);
    currency.priceSell = String(valueSell).slice(0, 6);
  });
  return currencies;
};
