import { login, reset } from '../features/auth/authSlice';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

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
        <Grid
          container
          spacing={2}
          columnSpacing={{ xs: 0, sm: 0, md: 0 }}
          direction="column"
          alignItems="center"
        >
          <Grid item xs={12}>
            <h1 className="">Logg inn</h1>
          </Grid>

          <Grid item xs={12}>
            <TextField required id="email" label="Email" variant="outlined" onChange={onChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="password" label="Passord" type="password" />
          </Grid>
          <Grid item xs={5}>
            <Button variant="contained" id="onSubmit" color="success">
              Logg inn
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Link to="/register">Registrer bruker</Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
