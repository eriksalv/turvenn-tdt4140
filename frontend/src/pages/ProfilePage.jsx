import React, { useState } from 'react';
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
import { Divider, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import TripCard from '../components/TripCard';
import { register } from '../features/auth/authSlice';

import './ProfilePage.css';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

function ProfilePage() {

  // Burde hente fra en userSlice i redux med alle brukere, men dette fungerer foreløpig
  const { user } = useSelector((state) => state.auth);

  if (!user) return <h1>Loading...</h1>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
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
        <p style={{ width: '100%', textAlign: 'center' }}>{user.email}</p>
        <Box sx={{ width: '500px' }}>
          <form id="about" sx={{ width: '100%' }}>
            <Box sx={{ minWidth: 120, ml: 1 }} className="experienceBox">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Erfaringsnivå</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={20}
                  label="Erfaringsnivå"
                >
                  <MenuItem value={10}>Nybegynner</MenuItem>
                  <MenuItem value={20}>Erfaren</MenuItem>
                  <MenuItem value={30}>Ekspert</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <LoadingButton id="aboutSave" loading="false" startIcon={<SaveIcon />} variant="outlined">
              {' '}
              Lagre
            </LoadingButton>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
