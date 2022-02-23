import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingButton from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Divider, Chip, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import TripCard from '../components/TripCard';
import { register } from '../features/auth/authSlice';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

function User() {
  const mockData = [
    {
      difficulty: 1,
      duration: '2 days',
      date: '25.02.2022',
      id: 'dkawdopwa'
    },
    {
      difficulty: 3,
      duration: '4 days',
      date: '15.03.2022',
      id: 'jdpowadjwpa'
    },
    {
      difficulty: 5,
      duration: '3 days',
      date: '01.04.2022',
      id: 'jdiwajdipaw'
    }
  ];

  // Burde hente fra en userSlice i redux med alle brukere, men dette fungerer foreløpig
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

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
        <h1 style={{ width: '100%', textAlign: 'center', marginBottom: '3px' }}>
          {user.firstName} {user.lastName} {id}
        </h1>
        <p style={{ width: '100%', textAlign: 'center' }}>{user.email}</p>
      </Box>
      <Grid
        width="80%"
        container
        sx={{ gap: '10px', marginTop: '10px', marginRight: '0px', flexDirection: 'row' }}
      >
        <Grid xs={4} flex={1}>
          <Img alt="En kul tur med gode venner" src="../assets/Turvenn-2.png" />
        </Grid>
        <Grid width="50%" flex={3}>
          <Typography className="aboutText" id="outlined-multiline-static">
            Biografi: her står det noe veldig kult om personene.
          </Typography>
          <Typography variant="h5" component="h2" margin="20px auto">
            Erfaringsnivå
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ width: '100%' }}>
        <Chip label="Turhistorikk" />
      </Divider>
      <Box
        id="tripHistoryContainer"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {mockData.map((item) => (
          <TripCard
            difficulty={item.difficulty}
            duration={item.duration}
            date={item.date}
            key={item.id}
          />
        ))}
      </Box>

      <div id="history" />
    </Box>
  );
}

export default User;
