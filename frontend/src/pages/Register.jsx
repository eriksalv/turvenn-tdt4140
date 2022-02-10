import React, {useState} from 'react';

function Register() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmedPassword: ''
    });

    const {email, password, confirmedPassword} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      };

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(`Email: ${email}, Password: ${password}, Confirmed Password: ${confirmedPassword}`);
    }

  return <div>
      <h1>Bli en Turvenn</h1>
      <form onSubmit={onSubmit}>
          <label htmlFor="email">Epost</label>
          <input type="text" value={email} id="email" name='email' onChange={onChange}/>
          <label htmlFor="password">Passord</label>
          <input type="password" value={password} id="password" name='password' onChange={onChange} />
          <label htmlFor="confirmedPassword">Bekreft Passord</label>
          <input type="password" value={confirmedPassword} id="confirmedPassword" name='confirmedPassword' onChange={onChange} />
          <button>Registrer deg</button>
      </form>
  </div>;
}

export default Register;
