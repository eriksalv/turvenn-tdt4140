import { Box, Typography } from '@mui/material';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import TripCard from '../components/TripCard';
import { getTrips, reset } from '../features/trips/tripSlice';

function Home() {
  const { trips, isSuccess, isLoading } = useSelector((state) => state.trips);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTrips());
  }, [dispatch]);

  if (isLoading) {
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
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography sx={{ width: '100%', margin: '20px' }} align="center" variant="h2">
          Hjem
        </Typography>
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
