import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LogIn({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <>
      <div className="login-form" onSubmit={handleSubmit}>
        <form autoComplete="off" >
          <input className="login-inputs" placeholder="Email" type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <br />
          <input className="login-inputs" placeholder="Password" type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <div className="login">
            <button className="login-btn" type="submit">Login</button>
          </div>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}