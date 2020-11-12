import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup() {
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
    <div className="split-screen">
      <div className="lefty signup"></div>
      <div className="right">
        <form onSubmit={handleFormSubmit}>
          <section className="copy">
            <h2>Sign Up!</h2>
            <div className="login-container">
              <p>
                Already Have An Account?{' '}
                <Link as={Link} to="/login">
                  Login
                </Link>
              </p>
              <p>
                Not Ready For An Account?{' '}
                <Link as={Link} to="/">
                  Back To Home!
                </Link>
              </p>
            </div>
          </section>
          <label htmlFor="username">Username:</label>
          <input
            placeholder="Please Enter A Username"
            name="username"
            type="username"
            onChange={handleChange}
          ></input>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Please Enter A Valid Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Please Enter A Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <button className="signup-btn" type="submit">
            Sign Up!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
