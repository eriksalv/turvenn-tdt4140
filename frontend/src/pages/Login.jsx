import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const paperStyle = {
  padding: 20,
  height: 330,
  width: 350,
  margin: "20px auto",
};
const inputStyle = { margin: "0px 0px 20px" };

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Paper elevation={10} style={paperStyle}>
          <Grid
            container
            spacing={5}
            columnSpacing={{ xs: 0, sm: 0, md: 0 }}
            direction="column"
            alignItems="center"
          >
            <Grid item xs={12}>
              <h1 className="">Logg inn</h1>
            </Grid>

            <TextField
              required
              id="email"
              fullWidth
              label="Email"
              placeholder="Skriv inn Email"
              variant="outlined"
              onChange={onChange}
              style={inputStyle}
            />

            <TextField
              fullWidth
              required
              placeholder="Skriv inn passord"
              id="password"
              label="Passord"
              type="password"
              style={inputStyle}
            />

            <Button
              style={inputStyle}
              fullWidth
              variant="contained"
              id="onSubmit"
              color="success"
            >
              Logg inn
            </Button>
            
            <Link to="/register">Ingen bruker? Registrer deg</Link>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}

export default Login;
