export interface IDropdownList {
  data: Array<string>;
  state: string;
  setState: (value: string) => void;
}

export interface IModal {
  open: boolean;
  setOpen: (state: boolean) => void;
  setArchive: (state: Array<IArchive>) => void;
  type: string;
  valueCurrency: string;
  nameCurrency: string;
  archive: Array<IArchive>;
  date: string;
}

export interface ICurrencies {
  name: string;
  priceBuy: string;
  priceSell: string;
}

export interface IArchive {
  side: string;
  price: string;
  instrument: string;
  volume: string;
  timestamp: string;
}
