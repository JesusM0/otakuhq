import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
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
    <div className="split-screen">
      <div className="lefty login"></div>
      <div className="right">
        <form onSubmit={handleFormSubmit}>
          <section className="copy">
            <h2>Login!</h2>
            <div className="login-container">
              <p>
                Don't Have An Account?{' '}
                <Link as={Link} to="/signup">
                  Signup
                </Link>
              </p>
              <p>
                Just Browsing?{' '}
                <Link as={Link} to="/">
                  Back To Home!
                </Link>
              </p>
            </div>
          </section>
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="Please Enter Your Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <label htmlFor="pasword">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            onChange={handleChange}
          />
          {error ? (
            <div>
              <p className="error-text">Incorrect Credentials.</p>
            </div>
          ) : null}
          <button className="signup-btn" type="submit">
            Login!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
