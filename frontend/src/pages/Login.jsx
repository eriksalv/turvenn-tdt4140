import React, {useState} from 'react';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      };

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(`Email: ${email}, Password: ${password}`);
    }

  return <div>
      <h1>Logg inn</h1>
      <form onSubmit={onSubmit}>
          <label htmlFor="email">Epost</label>
          <input type="text" value={email} id="email" name='email' onChange={onChange}/>
          <label htmlFor="password">Passord</label>
          <input type="password" value={password} id="password" name='password' onChange={onChange} />
          <button>Logg inn</button>
      </form>
  </div>;
}

export default Login;
