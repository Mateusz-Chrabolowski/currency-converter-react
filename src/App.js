import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import ConverterForm from "./components/ConverterForm/ConverterForm";
import ConverterResult from "./components/ConverterResult/ConverterResult";
import Clock from "./components/Clock/Clock";

const Main = styled.main.attrs({
  className: "currency-converter",
})``;

const Title = styled.h1.attrs({
  className: "currency-converter__title",
})``;

const Info = styled.p.attrs({
  className: "currency-converter__info",
})``;

function App() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");

  const [rates, setRates] = useState({});
  const [rate, setRate] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [effectiveDate, setEffectiveDate] = useState(null);

  const currencyCodes = useMemo(() => Object.keys(rates).sort(), [rates]);

  useEffect(() => {
    setLoading(true);

    fetch("https://api.nbp.pl/api/exchangerates/tables/A?format=json")
      .then((res) => {
        if (!res.ok) throw new Error("Błąd API NBP");
        return res.json();
      })
      .then((data) => {
        const table = data[0];
        setEffectiveDate(table.effectiveDate);

        const ratesObject = {};
        table.rates.forEach(({ code, mid }) => {
          ratesObject[code] = mid;
        });

        setRates(ratesObject);

        const initialCurrency = ratesObject.EUR
          ? "EUR"
          : Object.keys(ratesObject)[0];

        setCurrency(initialCurrency);
        setRate(ratesObject[initialCurrency]);

        setLoading(false);
      })
      .catch(() => {
        setError("Nie udało się pobrać kursów");
        setLoading(false);
      });
  }, []);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setRate(rates[newCurrency]);
    setResult(null);
  };

  const handleConvert = () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0 || !rate) {
      setResult(null);
      return;
    }

    setResult((value / rate).toFixed(2));
  };

  return (
    <Main>
      <Clock />
      <Title>Kalkulator walut</Title>

      {loading && <p>Pobieranie kursów…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <ConverterForm
            amount={amount}
            setAmount={setAmount}
            currency={currency}
            setCurrency={handleCurrencyChange}
            rate={rate}
            onConvert={handleConvert}
            disabled={loading}
            currencyCodes={currencyCodes}
          />

          <ConverterResult result={result} currency={currency} />

          {effectiveDate && (
            <Info>
              Kursy walut pobierane są z NBP. Aktualne na dzień:{" "}
              <strong>{effectiveDate}</strong>
            </Info>
          )}
        </>
      )}
    </Main>
  );
}

export default App;
