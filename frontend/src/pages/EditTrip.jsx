import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Grid,
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getTrip, editTrip, reset } from '../features/trips/tripSlice';

function EditTrip() {
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    start: '',
    date: '',
    difficulty: '',
    duration: '',
    description: ''
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { trip, isError, isSuccess, message, status } = useSelector((state) => state.trips);
  const navigate = useNavigate();
  const { id } = useParams();

  const { name, goal, start, date, difficulty, duration, description } = formData;
  const paperStyle = { padding: 20, maxWidth: 900, margin: '20px auto' };

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  });

  useEffect(() => {
    if (trip && trip.user.id !== user.id) {
      toast.error('Du kan bare redigere dine egne turer');
      navigate('/home');
      dispatch(reset());
    }
  }, [user, trip]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      if (status === 'updated') {
        toast.success('Turen ble oppdatert');
        navigate(`/trips/${id}`);
      }
    }
  }, [dispatch, isSuccess, status]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (status === '') {
        navigate('/notfound');
      }
      dispatch(reset());
      return;
    }

    dispatch(getTrip(id));
  }, [dispatch, isError, navigate, message, id, status]);

  useEffect(() => {
    if (trip) {
      setFormData(() => ({
        name: trip.name || '',
        goal: trip.goal || '',
        start: trip.start || '',
        date: moment(trip.date).format('yyyy-MM-DDTHH:mm') || '',
        difficulty: trip.difficulty || '',
        duration: trip.duration || '',
        description: trip.description || ''
      }));
    }
  }, [trip]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const tripData = { id, name, goal, start, date, difficulty, duration, description };

    dispatch(editTrip(tripData));
  };

  const onChangeDifficulty = (e) => {
    setFormData((prevState) => ({ ...prevState, difficulty: e.target.value }));
  };

  const onChangeDescription = (e) => {
    setFormData((prevState) => ({ ...prevState, description: e.target.value }));
  };

  return (
    <main>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="left">
            <h2>Rediger turarrangement</h2>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Img alt="logo" src="../../Turvenn-logo.png" />
            </Grid>
            <Grid item xs={8}>
              <form onSubmit={onSubmit}>
                <TextField
                  id="name"
                  label="Tittel"
                  required
                  fullWidth
                  value={name}
                  margin="normal"
                  onChange={onChange}
                />
                <TextField
                  id="goal"
                  label="Turmål"
                  required
                  fullWidth
                  value={goal}
                  margin="normal"
                  onChange={onChange}
                />
                <TextField
                  id="start"
                  label="Startpunkt"
                  required
                  fullWidth
                  value={start}
                  margin="normal"
                  onChange={onChange}
                />
                <TextField
                  id="date"
                  label="Dato og tid"
                  type="datetime-local"
                  required
                  fullWidth
                  value={date}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={onChange}
                />
                <FormControl id="difficulty" fullWidth>
                  <InputLabel>Vanskelighetsgrad</InputLabel>
                  <Select
                    labelId="difficulty"
                    id="difficulty"
                    value={difficulty}
                    label="Vanskelighetsgrad"
                    onChange={onChangeDifficulty}
                  >
                    <MenuItem value="enkel">Enkel</MenuItem>
                    <MenuItem value="middels">Middels</MenuItem>
                    <MenuItem value="krevende">Krevende</MenuItem>
                    <MenuItem value="ekstraKrevende">Ekstra krevende</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="duration"
                  label="Varighet"
                  fullWidth
                  value={duration}
                  margin="normal"
                  onChange={onChange}
                />
                <TextField
                  id="descrition"
                  label="Beskrivelse"
                  rows={6}
                  multiline
                  fullWidth
                  value={description}
                  margin="normal"
                  onChange={onChangeDescription}
                />
              </form>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="flex-end"
            justifyContent="flex-end"
            sx={{ mt: '4rem', mb: '0.5rem' }}
          >
            <Button
              onClick={onSubmit}
              className="btn btn-success"
              type="submit"
              variant="contained"
              endIcon={<SaveIcon />}
            >
              Lagre endringer
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </main>
  );
}

export default EditTrip;
