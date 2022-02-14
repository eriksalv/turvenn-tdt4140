import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const { firstName, lastName, email, password, confirmedPassword } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Email: ${email}, Password: ${password}, Confirmed Password: ${confirmedPassword}`
    );
  };

  return (
    <main>
      <h1>Bli en Turvenn: {message}</h1>
      <form onSubmit={onSubmit}>
        <div className="info">
          <TextField 
            label="Fornavn" 
            variant="filled" 
            required
            value={firstName}
            />
          <TextField 
            label="Etternavn" 
            variant="filled" 
            required
            value={lastName}
            />
          <TextField 
            label="Email" 
            variant="filled" 
            type="email" 
            required
            value={email}
            />
          <TextField 
            label="Passord" 
            variant="filled" 
            type="password" 
            required
            value={password}
            />
          <TextField 
          label="Bekreft passord" 
          variant="filled" 
          type="password" 
          required
          value={confirmedPassword}/>
        </div>
        
        
        
        <div className="Register">
          <button type="submit" variant="contained" color="primary">
            Registrer deg
          </button>
        </div>
      </form>
    </main>
  );
}

export default Register;
