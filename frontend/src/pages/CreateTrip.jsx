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
    destination: '',
    startpoint: '',
    date: '',
    difficulty: '',
    duration: '',
    description: ''
  });

  const { destination, startpoint, date, difficulty, duration, description } = formData;
  const paperStyle = { padding: 20, height: '90vh', width: 350, margin: '20px auto' };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Destination: ${destination}, Startpoint: ${startpoint}, Date: ${date}`);
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
                label="Turmål"
                placeholder="Hvor går turen?"
                required
                fullWidth
                value={destination}
                margin="normal"
                onChange={onChange}
              />
              <TextField
                label="Startpunkt"
                placeholder="Hvor starter turen?"
                required
                fullWidth
                value={startpoint}
                margin="normal"
                onChange={onChange}
              />
              <TextField
                id="datetime-local"
                label="Dato og tid"
                type="datetime-local"
                required
                fullWidth
                value={date}
                margin="normal"
                onChange={onChange}
              />
              <FormControl fullWidth>
                <InputLabel id="difficulty">Vanskelighetsgrad</InputLabel>
                <Select
                  labelId="difficulty"
                  id="difficulty"
                  value={difficulty}
                  label="Vanskelighetsgrad"
                  onChange={onChange}
                >
                  <MenuItem>Enkel</MenuItem>
                  <MenuItem>Middels</MenuItem>
                  <MenuItem>Krevende</MenuItem>
                  <MenuItem>Ekstra krevende</MenuItem>
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
