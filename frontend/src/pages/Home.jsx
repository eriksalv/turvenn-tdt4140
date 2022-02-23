import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import TripCard from '../components/TripCard';
import { getTrips } from '../features/trips/tripSlice';

function Home() {
  const { trips, isError } = useSelector((state) => state.trips);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrips());

    if (isError) {
      toast.error('Something went wrong');
    }
  }, [dispatch, isError]);

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
      {trips.map((item) => (
        <TripCard
          title={item.name}
          difficulty={item.difficulty}
          duration={item.duration}
          date={item.date}
          key={item.id}
        />
      ))}
    </Box>
  );
}

export default Home;
