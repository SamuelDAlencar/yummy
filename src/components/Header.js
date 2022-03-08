import React, { useState } from 'react';
import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ history }) {
  const [toggleInput, setToggleInput] = useState();

  return (
    <header>
      <section>
        <button
          type="submit"
          data-testid="profile-top-btn"
          id="profile-top-btn"
          onClick={ () => history.push('/profile') }
        >
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile-top-btn"
          />
        </button>
        <h2 data-testid="page-title">Foods</h2>
        { toggleInput
           && (
             <label htmlFor="search-input">
               <input data-testid="search-input" id="search-input" />
             </label>)}
        <button
          type="submit"
          data-testid="search-top-btn"
          id="search-top-btn"
          onClick={ () => setToggleInput(!toggleInput) }
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="search-top-btn" />
        </button>
      </section>
    </header>
  );
}

Header.propTypes = {
  history: propTypes.string,
}.isRequired;
