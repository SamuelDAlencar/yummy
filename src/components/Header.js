import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import homeContext from '../contexts/homeContext';

export default function Header({ namePage }) {
  const [toggleInput, setToggleInput] = useState();
  const history = useHistory();

  const {
    handleInput,
  } = useContext(homeContext);

  return (
    <header className="header">
      <button
        type="button"
        id="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="profile-top-btn"
        />
      </button>
      <h2 data-testid="page-title">{ namePage }</h2>
      { toggleInput
           && (
             <label htmlFor="search-input">
               <input
                 data-testid="search-input"
                 id="search-input"
                 onChange={ handleInput }
               />
             </label>)}
      { (namePage === 'Foods' || namePage === 'Drinks' || namePage.includes('Natio')) && (
        <button
          type="button"
          id="search-top-btn"
          onClick={ () => setToggleInput(!toggleInput) }
        >
          <img src={ searchIcon } alt="search-top-btn" data-testid="search-top-btn" />
        </button>)}
    </header>
  );
}

Header.propTypes = {
  history: propTypes.string,
}.isRequired;
