import TextField from "@mui/material/TextField";
import { StyledBox } from "./DataForm.styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import DataTable from "../DataTable/DataTable";

const DataForm = () => {
  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);
  const [population, setPopulation] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      alpha,
      beta,
      population,
    };
    console.log(data);
  };

  return (
    <>
      <StyledBox
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="α"
          variant="outlined"
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="β"
          variant="outlined"
          value={beta}
          onChange={(e) => setBeta(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Population"
          variant="outlined"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Calculate
        </Button>
      </StyledBox>
      <DataTable />
    </>
  );
};

export default DataForm;
