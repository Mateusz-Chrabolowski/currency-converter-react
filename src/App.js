import { useState, useEffect } from "react";
import ConverterForm from "./components/ConverterForm/ConverterForm";
import ConverterResult from "./components/ConverterResult/ConverterResult";
import rates from "./data/rates";
import Clock from "./components/Clock/Clock";

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
    <main className="currency-converter">
      <Clock/>
      <h1 className="currency-converter__title">Kalkulator walut</h1>

      <ConverterForm
        amount={amount}
        setAmount={setAmount}
        currency={currency}
        setCurrency={setCurrency}
        rate={rate}
        onConvert={handleConvert}
      />

      <ConverterResult result={result} currency={currency} />
    </main>
  );
}

export default App;
