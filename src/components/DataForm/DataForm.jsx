import TextField from "@mui/material/TextField";
import { StyledBox } from "./DataForm.styled";
import Button from "@mui/material/Button";
import { useState } from "react";

const DataForm = () => {
  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      alpha,
      beta,
    };
    console.log(data);
  };

  return (
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
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </StyledBox>
  );
};

export default DataForm;
