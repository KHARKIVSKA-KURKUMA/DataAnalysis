import Charts from "../Chart/Charts";
import PropTypes from "prop-types";
import {
  Average,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableHeaderCell,
  StyledTableRow,
} from "./DataTable.styled";
import { data } from "../../data/data.json";

const DataTable = ({ a, b, population, i }) => {
  const yearAmount = 100;
  /* ---------------------------------- S(x) ---------------------------------- */
  const calculateS = (x, alpha, beta) =>
    Math.exp((-beta * (Math.exp(alpha * x) - 1)) / alpha);
  /* ---------------------------------- L(x) ---------------------------------- */
  const calculateL = (population, s) => population * s;
  /* ---------------------------------- D(x) ---------------------------------- */
  const calculateD = (population, l, x) => {
    if (x !== 1) {
      const s = calculateS(x, a, b);
      const l1 = calculateL(population, s);
      const s2 = calculateS(x - 1, a, b);
      const l2 = calculateL(population, s2);
      return Math.abs(l1 - l2);
    }
    return population - l;
  };

  /* ---------------------------------- Q(x) ---------------------------------- */
  const calculateQ = (population, d, x) => {
    if (x !== 1) {
      const s = calculateS(x - 1, a, b);
      const l = calculateL(population, s);
      return Math.abs(d / l);
    }
    return Math.abs(d / population);
  };
  /* ---------------------------------- P(x) ---------------------------------- */
  const calculateP = (q) => 1 - Math.abs(q);
  /* ---------------------------------- CD(x) --------------------------------- */
  const calculateCD = (l, i, x) => l * Math.pow(1 + i, -x);
  /* ---------------------------------- CC(x) --------------------------------- */
  const calculateCC = (d, i, x) => d * Math.pow(1 + i, -(x + 1));
  /* ---------------------------------- CN(x) --------------------------------- */
  const calculateCN = (x, w, population, a, b, i) => {
    let sum = 0;
    for (let j = x; j <= w; j++) {
      const s = calculateS(j, a, b);
      const l = calculateL(population, s);
      const cd = calculateCD(l, i, j);
      sum += cd;
    }
    return sum;
  };
  /* ---------------------------------- CM(x) --------------------------------- */
  const calculateCM = (x, w, population, a, b, i) => {
    let sum = 0;
    for (let j = x; j <= w; j++) {
      const s = calculateS(j, a, b);
      const l = calculateL(population, s);
      const d = calculateD(population, l, j);
      const cc = calculateCC(d, i, j);
      sum += cc;
    }
    return sum;
  };
  /* ---------------------------------- Fault --------------------------------- */
  const calculateFault = (l, vozL, population) =>
    Math.abs(((l - vozL) / population) * 100);
  /* ---------------------------------- Table --------------------------------- */
  const rows = [];
  const faults = [];
  let average = 0;
  for (let x = 1; x <= yearAmount; x++) {
    const s = calculateS(x, a, b);
    const l = calculateL(population, s);
    const d = calculateD(population, l, x);
    const q = calculateQ(population, d, x);
    const p = calculateP(q);
    const cd = calculateCD(l, i, x);
    const cc = calculateCC(d, i, x);
    const cn = calculateCN(x, yearAmount, population, a, b, i);
    const cm = calculateCM(x, yearAmount, population, a, b, i);
    const vozL = data[x - 1];
    const fault = calculateFault(l, vozL, population);
    faults.push(fault);
    const sum = faults.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    average = sum / faults.length;

    rows.push(
      <StyledTableRow key={x}>
        <StyledTableCell>{x}</StyledTableCell>
        <StyledTableCell>{s.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{l.toFixed(1)}</StyledTableCell>
        <StyledTableCell>{d.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{q.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{p.toFixed(6)}</StyledTableCell>
        <StyledTableCell>{cd.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{cc.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{cn.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{cm.toFixed(4)}</StyledTableCell>
        <StyledTableCell>{vozL}</StyledTableCell>
        <StyledTableCell>{fault.toFixed(2)}</StyledTableCell>
      </StyledTableRow>
    );
  }
  return (
    <>
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
              <StyledTableHeaderCell>CD(x)</StyledTableHeaderCell>
              <StyledTableHeaderCell>CC(x)</StyledTableHeaderCell>
              <StyledTableHeaderCell>CN(x)</StyledTableHeaderCell>
              <StyledTableHeaderCell>CM(x)</StyledTableHeaderCell>
              <StyledTableHeaderCell>WHO L(x)</StyledTableHeaderCell>
              <StyledTableHeaderCell>Faults, в %</StyledTableHeaderCell>
            </StyledTableRow>
          </StyledTableHead>
          <StyledTableBody>{rows}</StyledTableBody>
        </StyledTableContainer>
        <Average>
          Average Faults: <span>{average.toFixed(2)}</span>
        </Average>
        <Charts a={a} b={b} population={population} data={data} />
      </StyledTable>
    </>
  );
};

export default DataTable;

DataTable.propTypes = {
  a: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
  population: PropTypes.number.isRequired,
};
