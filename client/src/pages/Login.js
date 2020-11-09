import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className='container'>
      <Link to='/signup'>SignUp Here!!</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className='flex-row space-between my-2'>
          <label htmlFor='email'>Email address:</label>
          <input
            placeholder='thisisnotmyemail@test.com'
            name='email'
            type='email'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='pasword'>Password:</label>
          <input
            placeholder='******'
            name='password'
            type='password'
            id='password'
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className='error-text'>Incorrect Passord or Email.</p>
          </div>
        ) : null}
        <div className='flex-row flex-end'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
