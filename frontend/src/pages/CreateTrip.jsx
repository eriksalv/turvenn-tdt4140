import React, { useState } from 'react';
import {
  Grid,
  Button,
  Paper,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function CreateTrip() {
  const [formData, setFormData] = useState({
    goal: '',
    start: '',
    date: '',
    difficulty: '',
    duration: '',
    description: ''
  });

  const { goal, start, date, difficulty, duration, description } = formData;
  const paperStyle = { padding: 20, height: '90vh', width: 350, margin: '20px auto' };

  const onChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.id);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Goal: ${goal}, Start: ${start}, Date: ${date}`);
  };

  const onChangeDifficulty = (e) => {
    setFormData((prevState) => ({ ...prevState, difficulty: e.target.value }));
  };

  return (
    <main>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar>T</Avatar>
            <h2>Opprett turarrangement</h2>
          </Grid>

          <Grid>
            <form onSubmit={onSubmit}>
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
              <textarea
                id="descrition"
                label="Beskrivelse"
                placeholder="Beskriv turarrangementet her"
                rows={6}
                cols={41}
                value={description}
                margin="normal"
                onChange={onChange}
              />
              <Button className="btn btn-success" type="submit" variant="contained" fullWidth>
                Opprett turarrangement
              </Button>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </main>
  );
}

export default CreateTrip;
