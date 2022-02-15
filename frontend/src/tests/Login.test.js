import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';

test('renders Login component', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Epost/i);
  expect(linkElement).toBeInTheDocument();
});
