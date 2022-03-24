import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingButton from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { Paper, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';

function ProfilePage() {
  // Burde hente fra en userSlice i redux med alle brukere, men dette fungerer foreløpig
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

  const inputStyle = { margin: '0px 0px 20px' };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onCheck = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.checked
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password, firstName, lastName, isCommercial };

    if (password !== confirmedPassword) {
      toast.error('Passordene var ikke like');
    } else {
      console.log(userData);
    }
  };

  if (!user || isLoading) return <h1>Loading...</h1>;

  return (
    <Box
      sx={{
        width: '350px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
      }}
    >
      <Avatar
        sx={{ width: 150, height: 150, marginTop: '30px' }}
        alt="En kul tur med gode venner"
        src="../assets/Turvenn-2.png"
      />
      <h1 style={{ width: '100%', textAlign: 'center', marginBottom: '3px' }}>
        {user.firstName} {user.lastName}
      </h1>
      <p style={{ width: '100%', textAlign: 'center', marginBottom: '1px' }}>{user.email}</p>
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
        <Box className="experienceBox">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Erfaringsnivå</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={2}
              label="Erfaringsnivå"
            >
              <MenuItem value={1}>Nybegynner</MenuItem>
              <MenuItem value={2}>Erfaren</MenuItem>
              <MenuItem value={3}>Ekspert</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox id="isCommercial" value={isCommercial} onChange={onCheck} />}
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
          Oppdater
        </Button>
      </form>
    </Box>
  );
}

export default ProfilePage;
