import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { login, reset } from '../features/auth/authSlice';

const paperStyle = {
  padding: 20,
  height: 330,
  width: 350,
  margin: '20px auto'
};
const inputStyle = { margin: '0px 0px 20px' };

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      // Bruker /register som placeholder foreløpig
      navigate('/register');
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
    console.log('clicked');
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
  };

  if (isLoading) {
    // TODO: Erstatt med spinner
    return <h1>Loading...</h1>;
  }

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
              onChange={onChange}
            />

            <Button
              style={inputStyle}
              fullWidth
              variant="contained"
              id="onSubmit"
              color="success"
              onClick={onSubmit}
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
