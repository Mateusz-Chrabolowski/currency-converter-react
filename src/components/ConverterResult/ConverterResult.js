function ConverterResult({ result, currency }) {
  return (
    <p className="currency-converter__result">
      {result
        ? `Kwota po przeliczeniu to ${result} ${currency}`
        : "Kwota po przeliczeniu to …"}
    </p>
  );
}

export default ConverterResult;
