import { Box, Typography, TextField } from '@mui/material';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TripCard from '../components/TripCard';
import { getTrips, reset, searchTripByName } from '../features/trips/tripSlice';

function Home() {
  const { trips, isSuccess, isLoading, isError, message } = useSelector((state) => state.trips);
  const [formData, setFormData] = useState({
    searchWord: '',
    dateStart: '',
    dateEnd: ''
  });
  const { searchWord, dateStart, dateEnd } = formData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    dispatch(getTrips());
  }, [dispatch, isError]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(searchTripByName(searchWord));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Typography sx={{ width: '100%', margin: '20px' }} align="center" variant="h2">
        Hjem
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <form style={{ display: 'flex', alignItems: 'center', width: '50%' }} onSubmit={onSubmit}>
            <TextField
              id="searchWord"
              label="Søkefelt"
              placeholder="Søk etter turer"
              fullWidth
              value={searchWord}
              margin="normal"
              onChange={onChange}
              sx={{ width: '90%', height: '60px', marginRight: '10px' }}
            />
            <Button
              color="primary"
              aria-label="search"
              component="span"
              variant="outlined"
              onClick={onSubmit}
              sx={{ width: '10%', height: '60px' }}
            >
              <SearchIcon />
            </Button>
          </form>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
          <TextField
            id="dateStart"
            label="Dato og tid fra"
            type="datetime-local"
            fullWidth
            value={dateStart}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            sx={{ width: '50%', marginRight: '20px' }}
          />
          <TextField
            id="dateEnd"
            label="Dato og tid til"
            type="datetime-local"
            fullWidth
            value={dateEnd}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            sx={{ width: '50%' }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px'
        }}
      >
        {[...trips]
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .reverse()
          .map((item) => (
            <div key={item.id}>
              <Typography sx={{ display: 'inline' }} variant="p">
                <b>{item.user.firstName}</b> publiserte en ny tur
              </Typography>
              <Typography
                sx={{ display: 'inline', fontSize: 12, color: '#b5b5b5', marginLeft: '5px' }}
                variant="p"
              >
                <Moment format="Do MMMM YYYY, HH:mm">{item.createdAt}</Moment>
              </Typography>
              <TripCard
                id={item.id}
                title={item.name}
                difficulty={item.difficulty}
                duration={item.duration}
                date={item.date}
                key={item.id}
              />
            </div>
          ))}
      </Box>
    </Box>
  );
}

export default Home;
