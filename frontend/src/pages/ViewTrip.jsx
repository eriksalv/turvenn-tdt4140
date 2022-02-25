import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Paper, styled, Divider, Chip, Box, Typography, Button } from '@mui/material';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { toast } from 'react-toastify';

import { getTrip, reset } from '../features/trips/tripSlice';

import ProfileCard from '../components/ProfileCard';

function ViewTrip() {
  // TODO: erstatt med redux state
  const [isSignedUp, setIsSignedUp] = useState(false);
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  });
  const paperStyle = { padding: 20, maxWidth: 900, margin: '20px auto' };

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
  }, [isError, message, id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="left">
            <h2>{trip.name}</h2>
          </Grid>
          <Grid align="left" sx={{ marginBottom: '10px' }}>
            <Button
              onClick={() => setIsSignedUp((prevState) => !prevState)}
              variant={!isSignedUp ? 'outlined' : 'contained'}
              startIcon={!isSignedUp ? <GroupAddOutlinedIcon /> : <GroupAddIcon />}
            >
              {!isSignedUp ? 'Meld deg på' : 'Meld deg av'}
            </Button>
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
                {trip.date}
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
