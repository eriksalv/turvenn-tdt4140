import 'regenerator-runtime/runtime';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import AxiosMockAdapter from 'axios-mock-adapter';
import tripReducer, { getTrips } from '../features/trips/tripSlice';

it('should return the initial state', () => {
  expect(tripReducer(undefined, {})).toEqual({
    trips: [],
    trip: {},
    userTrips: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  });
});

// Integration test: tripSlice + tripService + getError
describe('TripSlice - getTrips', () => {
  let mock;

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should set error to true if rejected', async () => {
    const previousState = {
      trips: [],
      trip: {},
      userTrips: [],
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: ''
    };
    const store = configureStore({ reducer: { trip: tripReducer }, previousState });
    mock.onGet('/api/trips').reply(500, { message: 'Rejected' });

    await store.dispatch(getTrips());

    const { trip } = store.getState();

    expect(mock.history.get.length).toEqual(1);
    expect(mock.history.get[0].url).toEqual(`/api/trips`);
    expect(trip).toEqual({
      trips: [],
      trip: {},
      userTrips: [],
      isError: true,
      isSuccess: false,
      isLoading: false,
      message: 'Rejected'
    });
  });
});
