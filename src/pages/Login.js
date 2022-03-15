import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import key from '../images/key.svg';
import '../css/login.css';

export default function Login({ history }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [validator, setValidator] = useState(true);
  const [passwordVisibility, setPassVisibility] = useState(false);

  useEffect(() => {
    const { email, password } = login;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm
      .test(email);
    const magicNumber = 6;
    const validation = regex && password.length > magicNumber;
    setValidator(!validation);
  }, [login]);

  const handleChange = ({ target: { value, name } }) => {
    setLogin({ ...login, [name]: value });
  };

  const handleClick = () => {
    const { email } = login;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <main className="login-main">
      <h3 className="login-main__app-h1">Nome/logo do app</h3>
      <div className="login-div-image">
        <section className="login-div_section">
          <label
            className="login-label"
            htmlFor="email"
          >
            <img
              className="profile-img"
              alt="input_icon"
              src={ profileIcon }
            />
            <input
              placeholder="Email"
              className="login-label__email-input login-label__input"
              type="text"
              data-testid="email-input"
              name="email"
              value={ login.email }
              id="email"
              onChange={ (e) => handleChange(e) }
              autoComplete="off"
            />
          </label>
          <label
            className="login-label"
            htmlFor="password"
          >
            <img
              className="key-img"
              alt="input_icon"
              src={ key }
            />
            <input
              placeholder="Password"
              className="login-label__password-input login-label__input"
              type={ passwordVisibility
                ? 'text'
                : 'password' }
              data-testid="password-input"
              name="password"
              value={ login.password }
              id="password"
              onChange={ (e) => handleChange(e) }
              autoComplete="off"
            />
            <input
              type="checkbox"
              className="password-visibility"
              onClick={
                () => setPassVisibility((prevState) => !prevState)
              }
            />
          </label>
          <button
            className="login-button"
            type="button"
            data-testid="login-submit-btn"
            disabled={ validator }
            onClick={ handleClick }
          >
            Log-In
          </button>
        </section>
      </div>
    </main>

  );
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
