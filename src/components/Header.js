import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import homeContext from '../contexts/homeContext';

export default function Header({ namePage }) {
  const [toggleInput, setToggleInput] = useState();
  const history = useHistory();
  const INACTIVE = 'header-button';
  const ACTIVE = 'activePage-header-button';

  const {
    handleInput,
  } = useContext(homeContext);

  return (
    <header className="header">
      <section className="header-main-content">
        <button
          type="button"
          id="profile-top-btn"
          onClick={ () => history.push('/profile') }
          className={ INACTIVE }
        >
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile-top-btn"
          />
        </button>
        <h2
          data-testid="page-title"
          className="header-h1"
        >
          { namePage }
        </h2>
        { (namePage === 'Foods'
        || namePage === 'Drinks'
        || namePage.includes('Natio')) && (
          <button
            type="button"
            id="search-top-btn"
            onClick={ () => setToggleInput(!toggleInput) }
            className={ toggleInput ? ACTIVE : INACTIVE }
          >
            <img
              src={ searchIcon }
              alt="search-top-btn"
              data-testid="search-top-btn"
              className={ toggleInput
                ? 'active-search-button-img'
                : 'iactive-search-button-img' }
            />
          </button>)}
      </section>
      { toggleInput
           && (
             <input
               placeholder="What are we preparing today?"
               data-testid="search-input"
               id="search-input"
               onChange={ handleInput }
               className="header__search-input"
               autoComplete="off"
             />)}
    </header>
  );
}

Header.propTypes = {
  history: propTypes.string,
}.isRequired;
