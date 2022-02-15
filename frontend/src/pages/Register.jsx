import { inputUnstyledClasses } from '@mui/base';
import { TextField, Grid, Paper, Avatar, Button } from '@mui/material';
import { padding } from '@mui/system';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: ''
  });

  const { firstName, lastName, email, password, confirmedPassword } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto' };
  const inputStyle = { margin: '0px 0px 20px' };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
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
            <Avatar>T</Avatar>
            <h2>Bli en Turvenn: {message}</h2>
          </Grid>
          <Grid className="flex-container">
            <form onSubmit={onSubmit}>
              <TextField
                label="Fornavn"
                placeholder="Skriv inn fornavn"
                required
                fullWidth
                value={firstName}
                style={inputStyle}
              />
              <TextField
                label="Etternavn"
                placeholder="Skriv inn etternavn"
                required
                fullWidth
                value={lastName}
                style={inputStyle}
              />
              <TextField
                label="Email"
                type="email"
                placeholder="Skriv inn email"
                required
                fullWidth
                value={email}
                style={inputStyle}
              />
              <TextField
                label="Passord"
                type="password"
                placeholder="Velg passord"
                required
                fullWidth
                value={password}
                style={inputStyle}
              />
              <TextField
                label="Bekreft passord"
                type="password"
                placeholder="Bekreft valgt passord"
                required
                fullWidth
                value={confirmedPassword}
                style={inputStyle}
              />

              <Button type="submit" variant="contained" fullWidth>
                Registrer deg
              </Button>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </main>
  );
}

export default Register;
