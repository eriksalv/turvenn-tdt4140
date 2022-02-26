import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Paper, styled, Divider, Chip, Box, Typography, Button } from '@mui/material';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import useSignedUpStatus from '../hooks/useSignedUpStatus';

import { getTrip, reset, signUp, signOff } from '../features/trips/tripSlice';

import ProfileCard from '../components/ProfileCard';

function ViewTrip() {
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  });
  const paperStyle = { padding: 20, maxWidth: 900, margin: '20px auto' };

  const [signedUp, setSignedUp] = useSignedUpStatus()[0];
  const [checkingStatus] = useSignedUpStatus()[1];

  const { trip, isError, message, isLoading, isSuccess } = useSelector((state) => state.trips);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate('/notfound');
      dispatch(reset());
      return;
    }

    dispatch(getTrip(id));
  }, [isError, message, id, signedUp]);

  const onSignUp = async () => {
    await Promise.resolve(dispatch(signUp(trip.id)));
    setSignedUp(true);
  };

  const onSignOff = async () => {
    await Promise.resolve(dispatch(signOff(trip.id)));
    setSignedUp(false);
  };

  if (isLoading || checkingStatus || !trip) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid container alignItems="flex-start" justifyContent="space-between">
            <h2>{trip.name}</h2>
            <Grid>
              <Fab sx={{ mr: 1 }} size="small" color="secondary" aria-label="delete">
                <EditIcon />
              </Fab>
              <Fab size="small" color="primary" aria-label="edit">
                <DeleteIcon />
              </Fab>
            </Grid>
          </Grid>

          <Grid align="left" sx={{ marginBottom: '10px' }}>
            {!signedUp ? (
              <Button onClick={onSignUp} variant="outlined" startIcon={<GroupAddOutlinedIcon />}>
                Meld deg på
              </Button>
            ) : (
              <Button onClick={onSignOff} variant="contained" startIcon={<GroupAddIcon />}>
                Meld deg av
              </Button>
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Img alt="logo" src="../Turvenn-logo.png" />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" component="h6">
                Mål
              </Typography>
              <Typography variant="body1" component="h2">
                {trip.goal}
              </Typography>
              <Typography variant="h6" component="h6" marginTop="20px">
                Startpunkt
              </Typography>
              <Typography variant="body1" component="h2">
                {trip.start}
              </Typography>
              <Typography variant="h6" component="h6" marginTop="20px">
                Dato
              </Typography>
              <Typography variant="body1" component="h2">
                {moment(trip.date).format('yyyy-MM-DD HH:mm')}
              </Typography>
              <Typography variant="h6" component="h6" marginTop="20px">
                Vanskelighetsgrad
              </Typography>
              <Typography variant="body1" component="h2">
                {trip.difficulty}
              </Typography>
              <Typography variant="h6" component="h6" marginTop="20px">
                Varighet
              </Typography>
              <Typography variant="body1" component="h2">
                {trip.duration}
              </Typography>
              <Typography variant="h6" component="h6" marginTop="20px">
                Opprettet av
              </Typography>
              <Typography variant="body1" component="h2">
                {trip.user.firstName} {trip.user.lastName} <br /> {trip.user.email}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" component="h6">
            Om turen
          </Typography>
          <Typography variant="body1" component="h2">
            {trip.description}
          </Typography>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="flex-start"
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
              {trip.participators && trip.participators.length > 0 ? (
                trip.participators.map((item) => (
                  <ProfileCard
                    id={item.id}
                    name={`${item.firstName} ${item.lastName}`}
                    key={item.id}
                  />
                ))
              ) : (
                <p>Ingen deltakere enda</p>
              )}
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </main>
  );
}
export default ViewTrip;
