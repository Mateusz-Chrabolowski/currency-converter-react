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

  const [rates, setRates] = useState({}); // np. { EUR: 4.31, CHF: 4.55, ... }
  const [rate, setRate] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [effectiveDate, setEffectiveDate] = useState(null);

  // lista kodów walut do selecta (posortowana)
  const currencyCodes = useMemo(() => {
    return Object.keys(rates).sort();
  }, [rates]);

  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/tables/A?format=json")
      .then((response) => {
        if (!response.ok) throw new Error("Błąd API NBP");
        return response.json();
      })
      .then((data) => {
        const table = data[0];
        setEffectiveDate(table.effectiveDate);

        const ratesObject = {};
        table.rates.forEach(({ code, mid }) => {
          ratesObject[code] = mid;
        });

        setRates(ratesObject);

        // ustaw startową walutę: EUR jeśli jest, w innym wypadku pierwsza z listy
        const initial = ratesObject.EUR ? "EUR" : Object.keys(ratesObject)[0];
        setCurrency(initial);
        setRate(ratesObject[initial]);

        setLoading(false);
      })
      .catch(() => {
        setError("Nie udało się pobrać kursów");
        setLoading(false);
      });
  }, []);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    if (rates[newCurrency]) {
      setRate(rates[newCurrency]);
      setResult(null); // czyścimy wynik po zmianie waluty
    }
  };

  const handleConvert = () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0 || !rate) {
      setResult(null);
      return;
    }

    // ✅ POPRAWNE PRZELICZANIE: PLN -> waluta
    // 1 waluta = rate PLN, więc PLN / rate = waluta
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
            disabled={!rate}
            currencyCodes={currencyCodes}
          />

          <ConverterResult result={result} currency={currency} />

          {effectiveDate && (
            <Info>Kursy walut pobierane są z NBP. Aktualne na dzień: {effectiveDate}</Info>
          )}
        </>
      )}
    </Main>
  );
}

export default App;
