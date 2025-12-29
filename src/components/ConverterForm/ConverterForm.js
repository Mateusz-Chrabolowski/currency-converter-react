function ConverterForm({
  amount,
  setAmount,
  currency,
  setCurrency,
  rate,
  onConvert,
}) {
  return (
    <form
      className="currency-converter__form"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="currency-converter__label">
        Kwota w zł:
        <input
          type="number"
          className="currency-converter__input"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <label className="currency-converter__label">
        Wybierz walutę:
        <select
          className="currency-converter__select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="EUR">Euro (EUR)</option>
          <option value="CHF">Frank szwajcarski (CHF)</option>
          <option value="GBP">Funt brytyjski (GBP)</option>
          <option value="SEK">Korona szwedzka (SEK)</option>
        </select>
      </label>

      <label className="currency-converter__label">
        Aktualny kurs:
        <input
          type="number"
          className="currency-converter__input"
          value={rate}
          readOnly
        />
      </label>

      <button
        type="button"
        className="currency-converter__button"
        onClick={onConvert}
      >
        Przelicz
      </button>
    </form>
  );
}

export default ConverterForm;
