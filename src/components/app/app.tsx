import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "./app.module.scss";
import DropdownList from "../dropdownlist/dropdownlist";
import { dataCurrencies } from "../../utils/data";
import Modal from "../modal/modal";
import { generateValuesCurrency } from "../../utils/utils";
import { IArchive, ICurrencies } from "../../utils/types";

const App: FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [archive, setArchive] = useState<Array<IArchive>>([]);
  const [page, setPage] = useState<"Trading" | "Archive">("Trading");
  const [currencies, setCurrencies] =
    useState<Array<ICurrencies>>(dataCurrencies);
  const [nameCurrency, setNameCurrency] = useState<string>(
    dataCurrencies[0].name
  );
  const [valueSellCurrency, setValueSellCurrency] = useState<string>("");
  const [valueBuyCurrency, setValueBuyCurrency] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [typeOperation, setTypeOperation] = useState<string>("");

  const namesCurrency: Array<string> = useMemo(
    () => currencies.map((currency) => currency.name),
    []
  );

  useEffect(() => {
    setCurrencies(generateValuesCurrency(currencies));
  }, []);

  useEffect(() => {
    const currentCurrency = currencies.filter(
      (item) => item.name === nameCurrency
    )[0];
    setValueSellCurrency(currentCurrency.priceSell);
    setValueBuyCurrency(currentCurrency.priceBuy);
  }, [nameCurrency]);

  const interval = 1000;
  let estimated = Date.now() + interval;
  const timer = setTimeout(function func() {
    const drift = Date.now() - estimated;
    if (drift > interval) {
      clearTimeout(timer);
    }

    setDate(new Date());

    estimated += interval;
    setTimeout(func, Math.max(0, interval - drift));
  }, interval);

  setTimeout(() => {
    setCurrencies(generateValuesCurrency(currencies));
    const currentCurrency = currencies.filter(
      (item) => item.name === nameCurrency
    )[0];
    setValueSellCurrency(currentCurrency.priceSell);
    setValueBuyCurrency(currentCurrency.priceBuy);
  }, 120000);

  return (
    <div className={styles.container}>
      <div className={styles.app}>
        <header>
          <nav>
            <button
              onClick={() => {
                setPage("Trading");
              }}
              className={`${styles.button} ${
                page === "Trading" && styles.button_open
              }`}
            >
              Trading
            </button>
            <button
              onClick={() => {
                setPage("Archive");
              }}
              className={`${styles.button} ${
                page === "Archive" && styles.button_open
              }`}
            >
              Archive
            </button>
          </nav>
        </header>
        <main
          className={`${styles.main} ${page === "Trading" && styles.trading}`}
        >
          {page === "Trading" ? (
            <>
              <time
                className={styles.time}
                dateTime={date.toISOString().slice(0, 19)}
              >
                {date.toLocaleTimeString()}
              </time>
              <DropdownList
                state={nameCurrency}
                setState={setNameCurrency}
                data={namesCurrency}
              ></DropdownList>

              <section className={styles.rate}>
                <div
                  className={styles.rate__item}
                  onClick={() => {
                    setOpenModal(true);
                    setTypeOperation("buy");
                  }}
                >
                  <p className={styles.rate__title}>BUY</p>
                  <p className={styles.rate__subtitle}>{valueBuyCurrency}</p>
                </div>

                <div
                  className={styles.rate__item}
                  onClick={() => {
                    setOpenModal(true);
                    setTypeOperation("sell");
                  }}
                >
                  <p className={styles.rate__title}>SELL</p>
                  <p className={styles.rate__subtitle}>{valueSellCurrency}</p>
                </div>
              </section>
            </>
          ) : (
            <>
              <ul className={styles.nav}>
                <li className={styles.nav__item}>Side</li>
                <li className={styles.nav__item}>Price</li>
                <li className={styles.nav__item}>Instrument</li>
                <li className={styles.nav__item}>Volume</li>
                <li className={styles.nav__item}>Date</li>
              </ul>
              <ul className={styles.list}>
                {archive &&
                  archive.map((item, index) => (
                    <li key={index}>
                      <ul className={styles.archive}>
                        <li
                          className={`${styles.archive__item} ${
                            item.side === "buy"
                              ? styles.color_green
                              : styles.color_red
                          }`}
                        >
                          {item.side}
                        </li>
                        <li className={styles.archive__item}>{item.price}</li>
                        <li className={styles.archive__item}>
                          {item.instrument}
                        </li>
                        <li className={styles.archive__item}>{item.volume}</li>
                        <li className={styles.archive__item}>
                          {item.timestamp}
                        </li>
                      </ul>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </main>
        <Modal
          setOpen={setOpenModal}
          open={openModal}
          type={typeOperation}
          valueCurrency={
            typeOperation === "sell" ? valueSellCurrency : valueBuyCurrency
          }
          nameCurrency={nameCurrency}
          setArchive={setArchive}
          archive={archive}
          date={String(date.toISOString().slice(0, 19))}
        />
      </div>
    </div>
  );
};

export default App;
