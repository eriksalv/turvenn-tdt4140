import { Box, Typography } from '@mui/material';
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
      <Typography sx={{ width: '100%', margin: '20px' }} align="center" variant="h2">
        Turer
      </Typography>
      {[...trips]
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .reverse()
        .map((item) => (
          <div key={item.createdAt}>
            <Typography sx={{ display: 'inline' }} variant="p">
              <b>{item.user.firstName}</b> publiserte en ny tur
            </Typography>
            <Typography sx={{ display: 'inline', fontSize: 13, color: '#b5b5b5' }} variant="p">
              <i>I dag kl 23:03</i>
            </Typography>
            <TripCard
              title={item.name}
              difficulty={item.difficulty}
              duration={item.duration}
              date={item.date}
              key={item.id}
            />
          </div>
        ))}
    </Box>
  );
}

export default Home;
