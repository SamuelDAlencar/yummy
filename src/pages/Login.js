import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Login({ history }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [validator, setValidator] = useState(true);

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
    <div>
      <label htmlFor="email">
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={ login.email }
          id="email"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ login.password }
          id="password"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ validator }
        onClick={ handleClick }
      >
        entrar
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
