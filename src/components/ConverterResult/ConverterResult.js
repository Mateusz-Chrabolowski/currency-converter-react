import styled from "styled-components";

const Result = styled.p.attrs({
  className: "currency-converter__result",
})``;

function ConverterResult({ result, currency }) {
  return (
    <Result>
      {result
        ? `Kwota po przeliczeniu to ${result} ${currency}`
        : "Kwota po przeliczeniu to …"}
    </Result>
  );
}

export default ConverterResult;
