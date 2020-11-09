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
    <div className='container my-1'>
      <Link to='/login'>Login!</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className='flex-row space-between my-2'>
          <label htmlFor='username'>Username:</label>
          <input
            placeholder='username'
            name='username'
            type='username'
            id='username'
            onChange={handleChange}
          ></input>
        </div>
        <div className='flex-row space-between my-2'>
          <label htmlFor='email'>Email:</label>
          <input
            placeholder='youremail@test.com'
            name='email'
            type='email'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div className='flex-row space-between my-2'>
          <label htmlFor='password'>Password:</label>
          <input
            placeholder='******'
            name='password'
            type='password'
            id='password'
            onChange={handleChange}
          />
        </div>
        <div className='flex-row flex-end'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
