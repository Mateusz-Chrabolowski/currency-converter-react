import styled from "styled-components";

const Form = styled.form.attrs({
  className: "currency-converter__form",
})``;

const Label = styled.label.attrs({
  className: "currency-converter__label",
})``;

const Input = styled.input.attrs({
  className: "currency-converter__input",
})``;

const Select = styled.select.attrs({
  className: "currency-converter__select",
})``;

const Button = styled.button.attrs({
  className: "currency-converter__button",
})``;

function ConverterForm({
  amount,
  setAmount,
  currency,
  setCurrency,
  rate,
  onConvert,
}) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Label>
        Kwota w zł:
        <Input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Label>

      <Label>
        Wybierz walutę:
        <Select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="EUR">Euro (EUR)</option>
          <option value="CHF">Frank szwajcarski (CHF)</option>
          <option value="GBP">Funt brytyjski (GBP)</option>
          <option value="SEK">Korona szwedzka (SEK)</option>
        </Select>
      </Label>

      <Label>
        Aktualny kurs:
        <Input type="number" value={rate} readOnly />
      </Label>

      <Button type="button" onClick={onConvert}>
        Przelicz
      </Button>
    </Form>
  );
}

export default ConverterForm;
