import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {  
  return (
    <div>
      <label htmlFor="email">
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={ email }
          id="email"
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          id="password"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        >
        entrar
      </button>
    </div>
  );
}
