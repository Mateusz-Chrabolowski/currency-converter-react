import { useEffect, useState } from "react";
import styled from "styled-components";
import Clock from "./components/Clock/Clock";
import ConverterForm from "./components/ConverterForm/ConverterForm";
import ConverterResult from "./components/ConverterResult/ConverterResult";

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-image: url("${process.env.PUBLIC_URL}/currency_converter_background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Card = styled.main`
  width: 100%;
  max-width: 520px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  font-family: "Roboto", system-ui, sans-serif;
`;

function App() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/tables/A?format=json")
      .then((r) => r.json())
      .then((data) => setCurrencies(data[0].rates))
      .catch(() => setCurrencies([]));
  }, []);

  const onSubmit = () => {
    const selected = currencies.find((c) => c.code === currency);
    if (!selected) return;
    const a = Number(amount);
    if (!Number.isFinite(a)) return;
    setResult((a * selected.mid).toFixed(2));
  };

  return (
    <Page>
      <Card>
        <Clock />
        <h1>Kalkulator walut</h1>
        <p>Wpisz kwotę, wybierz walutę i przelicz na PLN.</p>

        <ConverterForm
          amount={amount}
          setAmount={setAmount}
          currency={currency}
          setCurrency={setCurrency}
          currencies={currencies}
          onSubmit={onSubmit}
        />

        <ConverterResult result={result} />
      </Card>
    </Page>
  );
}

export default App;
