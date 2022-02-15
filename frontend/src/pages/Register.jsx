import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmedPassword: ''
  });

  const { email, password, confirmedPassword } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}, Confirmed Password: ${confirmedPassword}`);
  };

  return (
    <main>
      <h1>Bli en Turvenn: {message}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Epost</label>
        <input type="text" value={email} id="email" name="email" onChange={onChange} />
        <label htmlFor="password">Passord</label>
        <input type="password" value={password} id="password" name="password" onChange={onChange} />
        <label htmlFor="confirmedPassword">Bekreft Passord</label>
        <input
          type="password"
          value={confirmedPassword}
          id="confirmedPassword"
          name="confirmedPassword"
          onChange={onChange}
        />
        <button type="submit">Registrer deg</button>
      </form>
    </main>
  );
}

export default Register;
