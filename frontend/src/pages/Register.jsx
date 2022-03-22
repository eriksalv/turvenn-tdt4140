import { TextField, Paper, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: '',
    isCommercial: false
  });

  const { firstName, lastName, email, password, confirmedPassword, isCommercial } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const paperStyle = {
    padding: 20,
    width: 350,
    margin: '20px auto'
  };
  const inputStyle = { margin: '0px 0px 20px' };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/home');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password, firstName, lastName, isCommercial };

    if (password !== confirmedPassword) {
      toast.error('Passordene var ikke like');
    } else {
      dispatch(register(userData));
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <main>
      <Paper
        elevation={10}
        style={paperStyle}
        sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
      >
        <h2 style={{ width: '100%', textAlign: 'center' }}>Bli en Turvenn</h2>
        <form onSubmit={onSubmit}>
          <TextField
            label="Fornavn"
            placeholder="Skriv inn fornavn"
            required
            onChange={onChange}
            fullWidth
            id="firstName"
            style={inputStyle}
          />
          <TextField
            required
            id="lastName"
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
            id="confirmedPassword"
            style={inputStyle}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox id="isCommercial" />}
              label="Kommersiell bruker?"
            />
          </FormGroup>

          <Button
            style={{ marginBottom: '10px' }}
            type="submit"
            variant="contained"
            fullWidth
            color="success"
            onClick={onSubmit}
          >
            Registrer deg
          </Button>
          <Link to="/">Allerede bruker? Logg inn</Link>
        </form>
      </Paper>
    </main>
  );
}

export default Register;
