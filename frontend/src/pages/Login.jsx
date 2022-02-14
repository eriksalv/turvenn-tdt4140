import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);

    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div>
      <h1 className="">Logg inn</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Epost</label>
        <input type="text" value={email} id="email" name="email" onChange={onChange} />
        <label htmlFor="password">Passord</label>
        <input type="password" value={password} id="password" name="password" onChange={onChange} />
        <button className="btn btn-success" type="submit">
          Logg inn
        </button>
      </form>
    </div>
  );
}

export default Login;
