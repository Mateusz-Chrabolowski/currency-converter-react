import { useState, useEffect } from "react";
import styled from "styled-components";

import ConverterForm from "./components/ConverterForm/ConverterForm";
import ConverterResult from "./components/ConverterResult/ConverterResult";
import Clock from "./components/Clock/Clock";
import rates from "./data/rates";

const Main = styled.main.attrs({
  className: "currency-converter",
})``;

const Title = styled.h1.attrs({
  className: "currency-converter__title",
})``;

function App() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [rate, setRate] = useState(rates.EUR);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setRate(rates[currency]);
  }, [currency]);

  const handleConvert = () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setResult(null);
      return;
    }

    setResult((value / rate).toFixed(2));
  };

  return (
    <Main>
      <Clock />

      <Title>Kalkulator walut</Title>

      <ConverterForm
        amount={amount}
        setAmount={setAmount}
        currency={currency}
        setCurrency={setCurrency}
        rate={rate}
        onConvert={handleConvert}
      />

      <ConverterResult result={result} currency={currency} />
    </Main>
  );
}

export default App;
