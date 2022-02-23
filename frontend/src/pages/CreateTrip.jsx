import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import { createTrip, reset } from '../features/trips/tripSlice';

function CreateTrip() {
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
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.trips);
  const navigate = useNavigate();

  const { name, goal, start, date, difficulty, duration, description } = formData;
  const paperStyle = { padding: 20, maxWidth: 900, margin: '20px auto' };

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/home');
      toast.success('Turen ble opprettet');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const tripData = { name, goal, start, date, difficulty, duration, description };

    dispatch(createTrip(tripData));
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
            <h2>Opprett turarrangement</h2>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Img alt="logo" src="../Turvenn-logo.png" />
            </Grid>
            <Grid item xs={8}>
              <form onSubmit={onSubmit}>
                <TextField
                  id="name"
                  label="Tittel"
                  placeholder="Navn på turen"
                  required
                  fullWidth
                  value={name}
                  margin="normal"
                  onChange={onChange}
                />
                <TextField
                  id="goal"
                  label="Turmål"
                  placeholder="Hvor går turen?"
                  required
                  fullWidth
                  value={goal}
                  margin="normal"
                  onChange={onChange}
                />
                <TextField
                  id="start"
                  label="Startpunkt"
                  placeholder="Hvor starter turen?"
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
                  placeholder="Hvor lenge varer turen?"
                  fullWidth
                  value={duration}
                  margin="normal"
                  onChange={onChange}
                />
                <TextField
                  id="descrition"
                  label="Beskrivelse"
                  placeholder="Beskriv turarrangementet her"
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
            >
              Opprett turarrangement
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </main>
  );
}

export default CreateTrip;
