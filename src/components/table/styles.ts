import styled from 'styled-components';

export const TableContainer = styled.table`
  th {
    padding: 10px;
    border: 0;
    background: #d0d0d0;
  }

  tr td:first-child {
    min-width: 200px;
    text-align: center;
  }

  tr td:nth-child(3) {
    min-width: 90px;
    text-align: center;
  }

  tr td:nth-child(4) {
    min-width: 290px;
    text-align: center;
  }

  tr td:nth-child(5) {
    display: flex;
    max-height: 50px;
    overflow-y: auto;
  }

  tr td:nth-child(6) {
    min-width: 300px;
    text-align: center;
  }

  tr:nth-child(odd) {
    background: #ededed;
  }
`;

export const TableProductImage = styled.img`
  max-height: 50px;
  max-width: 50px;
`;

export const TablePaymentLine = styled.div`
  display: flex;
  justify-content: space-between;
`;
