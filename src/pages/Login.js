import React, { useState, useEffect } from 'react';

export default function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [validator, setValidator] = useState(true);

  useEffect(() => {
    const { email, password } = login;
    const regex = /\S+@\S+.\S+/.test(email);
    const magicNumber = 5;
    const validation = regex && password.length > magicNumber;
    setValidator(!validation);
  }, [login]);

  const handleChange = ({ target: { value, name } }) => {
    setLogin({ ...login, [name]: value });
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
      >
        entrar
      </button>
    </div>
  );
}
