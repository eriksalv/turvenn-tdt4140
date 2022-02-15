import { inputUnstyledClasses } from "@mui/base";
import { TextField, Grid, Paper, Button } from "@mui/material";
import { padding } from "@mui/system";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const { firstName, lastName, email, password, confirmedPassword } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const paperStyle = {
    padding: 20,
    height: 500,
    width: 350,
    margin: "20px auto",
  };
  const inputStyle = { margin: "0px 0px 20px" };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      `First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${password}, Confirmed Password: ${confirmedPassword}`
    );
  };

  return (
    <main>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2>Bli en Turvenn</h2>
          </Grid>
          <Grid className="flex-container">
            <form onSubmit={onSubmit}>
              <TextField
                label="Fornavn"
                placeholder="Skriv inn fornavn"
                required
                onChange={onChange}
                fullWidth
                id = "fornavn"
                style={inputStyle}
              />
              <TextField
                required
                id="lastname"
                fullWidth
                label="Etternavn"
                placeholder="Skriv inn etternavn"
                variant="outlined"
                onChange={onChange}
                style={inputStyle}
              />
              <TextField
                label="Email"
                type="email"
                placeholder="Skriv inn email"
                required
                onChange={onChange}
                fullWidth
                id="email"
                style={inputStyle}
              />
              <TextField
                label="Passord"
                type="password"
                placeholder="Velg passord"
                required
                onChange={onChange}
                fullWidth
                id="password"
                style={inputStyle}
              />
              <TextField
                label="Bekreft passord"
                type="password"
                placeholder="Bekreft valgt passord"
                required
                onChange={onChange}
                fullWidth
                id="ComfirmedPassword"
                style={inputStyle}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="success"
              >
                Registrer deg
              </Button>
              <Link to="/">Allerede bruker? Logg inn</Link>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </main>
  );
}

export default Register;
