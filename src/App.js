import { useState, useEffect } from "react";
import ConverterForm from "./components/ConverterForm/ConverterForm";
import ConverterResult from "./components/ConverterResult/ConverterResult";
import rates from "./data/rates";

function App() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [rate, setRate] = useState(rates.EUR);
  const [result, setResult] = useState(null);

  // 🔹 aktualizuj kurs NATYCHMIAST po zmianie waluty
  useEffect(() => {
    setRate(rates[currency]);
  }, [currency]);

  // 🔹 automatyczne przeliczanie po zmianie kwoty lub kursu
  useEffect(() => {
    if (!amount) {
      setResult(null);
      return;
    }

    setResult((amount / rate).toFixed(2));
  }, [amount, rate]);

  return (
    <main className="currency-converter">
      <h1 className="currency-converter__title">Kalkulator walut</h1>

      <ConverterForm
        amount={amount}
        setAmount={setAmount}
        currency={currency}
        setCurrency={setCurrency}
        rate={rate}
      />

      <ConverterResult result={result} currency={currency} />
    </main>
  );
}

export default App;
