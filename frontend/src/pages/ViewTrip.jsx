import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
  Divider,
  Chip,
  Box,
  Typography
} from '@mui/material';

import { getTrip } from '../features/trips/tripSlice';

import ProfileCard from '../components/ProfileCard';

function ViewTrip() {
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  });
  const paperStyle = { padding: 20, width: 900, margin: '20px auto' };
  const mockData = [
    {
      name: 'Sondre',
      experienceLevel: 'ekspert',
      id: 'a'
    },
    {
      name: 'Erik',
      experienceLevel: 'ekspert',
      id: 'b'
    },
    {
      name: 'Ola',
      experienceLevel: 'ekspert',
      id: 'c'
    },
    {
      name: 'Andrea',
      experienceLevel: 'ekspert',
      id: 'd'
    },
    {
      name: 'Trygve',
      experienceLevel: 'ekspert',
      id: 'e'
    },
    {
      name: 'Andreas',
      experienceLevel: 'ekspert',
      id: 'f'
    },
    {
      name: 'Alva',
      experienceLevel: 'ekspert',
      id: 'g'
    }
  ];

  const { trip } = useSelector((state) => state.trips);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrip(1));
  }, [dispatch]);

  return (
    <main>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="left">
            <h2>{trip.name}</h2>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Img alt="logo" src="../Turvenn-logo.png" />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5" component="h4" margin="20px auto">
                Mål
              </Typography>
              <Typography variant="body1" component="body2" margin="20px auto">
                {trip.goal}
              </Typography>
              <Typography variant="h5" component="h2" margin="20px auto">
                Startpunkt
              </Typography>
              <Typography variant="body1" component="body2" margin="20px auto">
                {trip.start}
              </Typography>
              <Typography variant="h5" component="h2" margin="20px auto">
                Dato
              </Typography>
              {/* <FormControl id="difficulty" fullWidth>
                <InputLabel>Vanskelighetsgrad</InputLabel>
                <Select
                  labelId="difficulty"
                  id="difficulty"
                  //   value={difficulty}
                  label="Vanskelighetsgrad"
                >
                  <MenuItem value="enkel">Enkel</MenuItem>
                  <MenuItem value="middels">Middels</MenuItem>
                  <MenuItem value="krevende">Krevende</MenuItem>
                  <MenuItem value="ekstraKrevende">Ekstra krevende</MenuItem>
                </Select>
              </FormControl> */}
              <Typography variant="h5" component="h2" margin="20px auto">
                Vanskelighetsgrad:
              </Typography>
              {/* <TextField
                id="duration"
                label="Varighet"
                placeholder="Hvor lenge varer turen?"
                fullWidth
                // value={duration}
                margin="normal"
              /> */}
              <Typography variant="h5" component="h2" margin="20px auto">
                Varighet:
              </Typography>
              {/* <TextField
                id="descrition"
                label="Beskrivelse"
                placeholder="Beskriv turarrangementet her"
                rows={6}
                multiline
                fullWidth
                // value={description}
                margin="normal"
              /> */}
            </Grid>
          </Grid>
          <Typography variant="body1" component="h2" margin="20px auto">
            Beskrivelse:
          </Typography>
          <Grid
            container
            alignItems="flex-end"
            justifyContent="flex-end"
            sx={{ mt: '4rem', mb: '0.5rem' }}
          >
            <Divider sx={{ width: '100%' }}>
              <Chip label="Turgåere" />
            </Divider>
            <Box
              id="profileCardContainer"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {mockData.map((item) => (
                <ProfileCard
                  name={item.name}
                  experienceLevel={item.experienceLevel}
                  key={item.id}
                />
              ))}
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </main>
  );
}
export default ViewTrip;
