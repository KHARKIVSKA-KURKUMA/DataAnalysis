import Charts from "../Chart/Charts";
import PropTypes from "prop-types";
import {
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableHeaderCell,
  StyledTableRow,
} from "./DataTable.styled";
import { data } from "../../data/data.json";

const DataTable = ({ a, b, population }) => {
  /* ---------------------------------- S(x) ---------------------------------- */
  const calculateS = (x, alpha, beta) =>
    Math.exp((-beta * (Math.exp(alpha * x) - 1)) / alpha);
  /* ---------------------------------- L(x) ---------------------------------- */
  const calculateL = (population, s) => population * s;
  /* ---------------------------------- D(x) ---------------------------------- */
  const calculateD = (population, l) => population - l;
  /* ---------------------------------- Q(x) ---------------------------------- */
  const calculateQ = (population, d) => Math.abs(d / population);
  /* ---------------------------------- P(x) ---------------------------------- */
  const calculateP = (q) => 1 - Math.abs(q);
  /* ---------------------------------- Fault --------------------------------- */
  const calculateFault = (l, vozL) => Math.abs(((vozL - l) / vozL) * 100);
  /* ---------------------------------- Table --------------------------------- */
  const rows = [];
  for (let x = 1; x <= 100; x++) {
    const s = calculateS(x, a, b);
    const l = calculateL(population, s);
    const d = calculateD(population, l);
    const q = calculateQ(population, d);
    const p = calculateP(q);
    const vozL = data[x - 1];
    const fault = calculateFault(l, vozL);
    rows.push(
      <StyledTableRow key={x}>
        <StyledTableCell>{x}</StyledTableCell>
        <StyledTableCell>{s.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{l.toFixed(1)}</StyledTableCell>
        <StyledTableCell>{d.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{q.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{p.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{vozL}</StyledTableCell>
        <StyledTableCell>{fault.toFixed(2)}</StyledTableCell>
      </StyledTableRow>
    );
  }
  return (
    <StyledTable>
      <StyledTableContainer>
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableHeaderCell>x</StyledTableHeaderCell>
            <StyledTableHeaderCell>S(x)</StyledTableHeaderCell>
            <StyledTableHeaderCell>L(x)</StyledTableHeaderCell>
            <StyledTableHeaderCell>D(x)</StyledTableHeaderCell>
            <StyledTableHeaderCell>Q(x)</StyledTableHeaderCell>
            <StyledTableHeaderCell>P(x)</StyledTableHeaderCell>
            <StyledTableHeaderCell>ВОЗ L(x)</StyledTableHeaderCell>
            <StyledTableHeaderCell>Похибка, в %</StyledTableHeaderCell>
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>{rows}</StyledTableBody>
      </StyledTableContainer>
      <Charts a={a} b={b} population={population} data={data} />
    </StyledTable>
  );
};

export default DataTable;

DataTable.propTypes = {
  a: PropTypes.string.isRequired,
  b: PropTypes.string.isRequired,
  population: PropTypes.string.isRequired,
};
