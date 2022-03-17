import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  styled,
  Divider,
  Chip,
  Box,
  Typography,
  Button,
  Avatar,
  TextField
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PublishIcon from '@mui/icons-material/Publish';
import useSignedUpStatus from '../hooks/useSignedUpStatus';
import { getTrip, reset, signUp, signOff, deleteTrip } from '../features/trips/tripSlice';

import ProfileCard from '../components/ProfileCard';
import LogCard from '../components/LogCard';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

function ViewTrip() {
  const mockData = [
    {
      text: 'Nydelig tur!',
      imgurl: '../assets/defaultHike.jpeg',
      id: 'dkawdopwa'
    },
    {
      text: 'Ut på tur aldri sur!',
      imgurl: '../assets/defaultHike.jpeg',
      id: 'bcjhscfre'
    },
    {
      text: 'Utrolig vær og utrolige turkammerater!',
      imgurl: '../assets/defaultHike.jpeg',
      id: 'fewjbhjrwfr'
    }
  ];
  const paperStyle = { padding: 20, maxWidth: 900, margin: '20px auto' };
  const [formData, setFormData] = useState({
    text: '',
    imgurl: ''
  });
  const { text, imgurl } = formData;

  const [signedUp, setSignedUp] = useSignedUpStatus()[0];
  const [checkingStatus] = useSignedUpStatus()[1];

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { trip, isError, message, isLoading, isSuccess, status } = useSelector(
    (state) => state.trips
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      if (status === 'deleted') {
        toast.info('Turen ble slettet');
        navigate('/home');
      }
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (status === '') navigate('/notfound');
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

  const onDelete = () => {
    dispatch(deleteTrip(trip.id));
  };

  const onChangeLog = (e) => {
    setFormData((prevState) => ({ ...prevState, description: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const logData = { text, imgurl };

    // dispatch(createLog(logData));
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
            {user && (trip.user.id === user.id || user.role === 'admin') && (
              <Grid>
                <Fab
                  sx={{ mr: 1 }}
                  size="small"
                  color="secondary"
                  aria-label="delete"
                  onClick={() => navigate(`/trips/${id}/edit`)}
                >
                  <EditIcon />
                </Fab>
                <Fab size="small" color="primary" aria-label="edit" onClick={handleOpen}>
                  <DeleteIcon />
                </Fab>
              </Grid>
            )}
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
                Type
              </Typography>
              <Typography variant="body1" component="h2">
                {trip.type}
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
              <Chip label="Innlegg" />
            </Divider>

            <Paper
              sx={{ mt: '1rem', mb: '1rem' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: '10px'
              }}
            >
              <Grid
                container
                spacing={2}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <Grid item xs={1}>
                  <Avatar size="large">
                    <AccountCircleIcon />
                  </Avatar>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    id="text"
                    label="Innlegg"
                    placeholder="Hvordan gikk turen?"
                    multiline
                    fullWidth
                    margin="normal"
                    size="small"
                    value={text}
                    onChange={onChangeLog}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    id="imgurl"
                    variant="contained"
                    component="label"
                    size="large"
                    margin="normal"
                  >
                    <AddPhotoAlternateIcon />
                    <input type="file" hidden value={imgurl} />
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-end"
                justifyContent="flex-end"
                sx={{ mt: '0.5rem', mb: '0.2rem' }}
              >
                <Button
                  onClick={onSubmit}
                  className="btn btn-success"
                  type="submit"
                  variant="contained"
                  endIcon={<PublishIcon />}
                >
                  Publiser innlegg
                </Button>
              </Grid>
            </Paper>
            <Box
              id="postCardContainer"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContant: 'center',
                alignItems: 'center'
              }}
            >
              {mockData.map((item) => (
                <LogCard key={item.id} id={item.id} text={item.text} imgurl={item.imgurl} />
              ))}
            </Box>

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
                    role={item.role}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bekreft sletting</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Er du sikker på at du vil slette turen for godt?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nei</Button>
          <Button onClick={onDelete} autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
export default ViewTrip;
