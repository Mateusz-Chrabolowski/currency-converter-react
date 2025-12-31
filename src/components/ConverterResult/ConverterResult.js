import styled from "styled-components";

const Result = styled.div`
  margin-top: 16px;
  padding: 12px;
  border-radius: 12px;
  background: #f2f7ff;
  border-left: 4px solid #1a73e8;
`;

function ConverterResult({ result }) {
  return (
    <Result>
      {result ? `Kwota po przeliczeniu to ${result} PLN` : "—"}
    </Result>
  );
}

export default ConverterResult;
