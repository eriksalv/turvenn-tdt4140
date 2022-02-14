import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      // Bruker /register som placeholder foreløpig
      navigate('/register');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
  };

  if (isLoading) {
    // TODO: Erstatt med spinner
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="">Logg inn</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Epost</label>
        <input
          type="email"
          value={email}
          id="email"
          name="email"
          onChange={onChange}
          placeholder="Skriv inn eposten din"
          required
        />
        <label htmlFor="password">Passord</label>
        <input
          type="password"
          value={password}
          id="password"
          name="password"
          onChange={onChange}
          placeholder="Skriv inn passordet ditt"
          required
        />
        <button className="btn btn-success" type="submit">
          Logg inn
        </button>
      </form>
    </div>
  );
}

export default Login;
