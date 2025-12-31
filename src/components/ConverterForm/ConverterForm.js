import styled from "styled-components";

const Form = styled.div`
  display: grid;
  gap: 12px;
`;

const Label = styled.label`
  display: grid;
  gap: 6px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #cfe2ff;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #cfe2ff;
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #1a73e8;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;

function ConverterForm({
  amount,
  setAmount,
  currency,
  setCurrency,
  currencies = [],
  onSubmit,
}) {
  return (
    <Form>
      <Label>
        Kwota
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="np. 100"
        />
      </Label>

      <Label>
        Waluta
        <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} — {c.currency}
            </option>
          ))}
        </Select>
      </Label>

      <Button onClick={onSubmit}>Przelicz</Button>
    </Form>
  );
}

export default ConverterForm;
