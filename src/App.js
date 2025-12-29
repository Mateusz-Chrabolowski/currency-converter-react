import { useState, useEffect } from "react";
import ConverterForm from "./components/ConverterForm/ConverterForm";
import ConverterResult from "./components/ConverterResult/ConverterResult";
import rates from "./data/rates";

function App() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");

  // ✅ Kurs pokazujemy od razu (na starcie i po zmianie waluty)
  const [rate, setRate] = useState(rates.EUR);

  // ✅ Wynik liczony dopiero po kliknięciu
  const [result, setResult] = useState(null);

  // 1) Zmiana waluty -> natychmiast aktualizuj kurs
  useEffect(() => {
    setRate(rates[currency]);
  }, [currency]);

  // 2) Klik "Przelicz" -> dopiero wtedy policz wynik
  const handleConvert = () => {
    const value = Number(amount);

    // prosta walidacja
    if (!Number.isFinite(value) || value <= 0) {
      setResult(null);
      return;
    }

    setResult((value / rate).toFixed(2));
  };

  return (
    <main className="currency-converter">
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
