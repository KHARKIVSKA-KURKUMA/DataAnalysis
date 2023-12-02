import TextField from "@mui/material/TextField";
import { Notification, StyledBox } from "./DataForm.styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import DataTable from "../DataTable/DataTable";
import Notific from "../../img/notification.png";

const DataForm = () => {
  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);
  const [population, setPopulation] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlpha(0);
    setBeta(0);
    setPopulation(0);
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
          Reset
        </Button>
      </StyledBox>
      {alpha !== 0 && beta !== 0 && population !== 0 ? (
        <DataTable a={alpha} b={beta} population={population} />
      ) : (
        <Notification>
          <p>Please enter a value!</p>
          <img src={Notific} alt="Please enter a value!" />
        </Notification>
      )}
    </>
  );
};

export default DataForm;
