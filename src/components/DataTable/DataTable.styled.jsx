import styled from "styled-components";

export const StyledTable = styled.div`
  margin: 20px;
  margin-top: 30px;
`;

export const Average = styled.h2`
  text-align: right;
  margin-top: 5px;
  margin-right: 15px;
  span {
    color: #1976d2;
  }
`;

export const StyledTableContainer = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin-top: 20px;
  margin: 0 auto;
`;
export const StyledTableHead = styled.thead`
  background-color: #1976d2;
  color: #fff;
`;

export const StyledTableHeaderCell = styled.th`
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;

export const StyledTableBody = styled.tbody``;

export const StyledTableRow = styled.tr`
  text-align: center;
  &:nth-child(even) {
    background-color: rgba(25, 118, 210, 0.2);
  }
`;

export const StyledTableCell = styled.td`
  padding: 10px;
`;
