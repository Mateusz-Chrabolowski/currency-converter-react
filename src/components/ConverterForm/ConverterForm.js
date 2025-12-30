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
  disabled,
  currencyCodes,
}) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onConvert();
      }}
    >
      <Label>
        Kwota w zł:
        <Input
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={disabled}
        />
      </Label>

      <Label>
        Wybierz walutę:
        <Select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          disabled={disabled}
        >
          {currencyCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </Select>
      </Label>

      <Label>
        Aktualny kurs (1 {currency} = ? PLN):
        <Input type="number" value={rate ?? ""} readOnly />
      </Label>

      <Button type="submit" disabled={disabled}>
        Przelicz
      </Button>
    </Form>
  );
}

export default ConverterForm;
