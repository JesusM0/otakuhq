import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className='split-screen'>
      <div className='lefty'>
        <section className='copy'></section>
      </div>
      <div className='right'>
        <form>
          <section className='copy'>
            <h2>Sign Up!</h2>
            <div className='login-container'>
              <p>
                Alrady Have An Account?{' '}
                <Link as={Link} to='/login'>
                  Login
                </Link>
              </p>
              <p>
                Not Ready For An Account?{' '}
                <Link as={Link} to='/'>
                  Back To Home!
                </Link>
              </p>
            </div>
          </section>
          <div className='input-container name'>
            <label htmlFor='username'>Username:</label>
            <input
              className='fname'
              placeholder=''
              name='username'
              type='username'
              id='username'
              onChange={handleChange}
            ></input>
          </div>
          <div className='input-container email'>
            <label htmlFor='email'>Email:</label>
            <input
              className='email'
              placeholder=''
              name='email'
              type='email'
              id='email'
              onChange={handleChange}
            />
          </div>
          <div className='input-container password'>
            <label htmlFor='password'>Password:</label>
            <input
              className='password'
              placeholder=''
              name='password'
              type='password'
              id='password'
              onChange={handleChange}
            />
          </div>
          <button className='signup-btn' type='submit'>
            Sign Up!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
