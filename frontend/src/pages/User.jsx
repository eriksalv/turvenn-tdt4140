import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { Divider, Chip, Typography, Grid, Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TripCard from '../components/TripCard';
import { getUser, changeRoleAdmin, reset as userReset } from '../features/users/userSlice';
import { getUserTrips, reset as tripReset } from '../features/trips/tripSlice';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

function User() {
  const today = moment().format();
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { user, isError, isLoading, message, isSuccess } = useSelector((state) => state.users);
  const {
    userTrips,
    isLoading: tripsIsLoading,
    isSuccess: tripsIsSuccess
  } = useSelector((state) => state.trips);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const futureTrips = userTrips.filter((item) => item.date > today);
  const pastTrips = userTrips.filter((item) => item.date < today);

  useEffect(() => {
    if (isSuccess) {
      dispatch(userReset());
    }
    if (tripsIsSuccess) {
      dispatch(tripReset());
    }
  }, [dispatch, isSuccess, tripsIsSuccess]);

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
  const onAdmin = (role) => {
    const userData = {
      userId: id,
      role
    };
    dispatch(changeRoleAdmin(userData));
  };

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
          {user.firstName} {user.lastName}&nbsp;
          {user.role === 'admin' && (
            <Tooltip title="admin" arrow>
              <AdminPanelSettingsOutlinedIcon />
            </Tooltip>
          )}
        </h1>
        <p style={{ width: '100%', textAlign: 'center' }}>{user.email}</p>
        {loggedInUser && loggedInUser.id === user.id && (
          <Button variant="outlined" onClick={() => navigate('/profile')} endIcon={<EditIcon />}>
            Rediger Profil
          </Button>
        )}
        {loggedInUser &&
          user.email !== 'turvenn.turvenn@gmail.com' &&
          loggedInUser.email === 'turvenn.turvenn@gmail.com' && (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {user.role !== 'admin' ? (
                <Button
                  onClick={() => onAdmin('admin')}
                  variant="outlined"
                  startIcon={<AdminPanelSettingsOutlinedIcon />}
                >
                  Gi adminrettigheter
                </Button>
              ) : (
                <Button
                  onClick={() => onAdmin('user')}
                  variant="contained"
                  startIcon={<AdminPanelSettingsIcon />}
                >
                  Fjern adminrettigheter
                </Button>
              )}
            </>
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
        <Chip label="Kommende turer" />
      </Divider>

      <Box
        id="tripComingContainer"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {futureTrips.map((item) => (
          <TripCard
            id={item.id}
            title={item.name}
            difficulty={item.difficulty}
            duration={item.duration}
            date={item.date}
            key={item.id}
          />
        ))}
      </Box>

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
        {pastTrips.map((item) => (
          <TripCard
            id={item.id}
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
