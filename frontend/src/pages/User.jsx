import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { Divider, Chip, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import TripCard from '../components/TripCard';
import { getUser, reset as userReset } from '../features/users/userSlice';
import { getUserTrips, reset as tripReset } from '../features/trips/tripSlice';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

function User() {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { user, isError, isLoading, message, isSuccess } = useSelector((state) => state.users);
  const { userTrips, isLoading: tripsIsLoading } = useSelector((state) => state.trips);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate('/notfound');
      dispatch(userReset());
      dispatch(tripReset());
      return;
    }

    dispatch(getUser(id));
    dispatch(getUserTrips(id));
  }, [isError, message, id]);

  if (isLoading || tripsIsLoading) {
    return <h1>Loading...</h1>;
  }

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
          {user.firstName} {user.lastName}
        </h1>
        <p style={{ width: '100%', textAlign: 'center' }}>{user.email}</p>
        {loggedInUser && loggedInUser.id === user.id && (
          <Button variant="outlined" onClick={() => navigate('/profile')} endIcon={<EditIcon />}>
            Rediger Profil
          </Button>
        )}
      </Box>
      <Grid
        width="80%"
        container
        sx={{ gap: '10px', marginTop: '10px', marginRight: '0px', flexDirection: 'row' }}
      >
        <Grid xs={4} flex={1} item>
          <Img alt="En kul tur med gode venner" src="../assets/Turvenn-2.png" />
        </Grid>
        <Grid width="50%" flex={3} item>
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
        {userTrips.map((item) => (
          <TripCard
            title={item.name}
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
