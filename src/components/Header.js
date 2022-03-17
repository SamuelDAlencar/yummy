import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import __perfil from '../images/__perfil.svg';
import __lupa from '../images/__lupa.svg';
import __lupaRosa from '../images/__lupaRosa.svg';
import homeContext from '../contexts/homeContext';

export default function Header({ namePage }) {
  const { toggleInput, setToggleInput } = useContext(homeContext);
  const history = useHistory();

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
          className="headerButton-button"
        >
          <img
            src={ __perfil }
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
            className="headerButton-button"
          >
            <img
              src={ toggleInput ? __lupaRosa : __lupa }
              alt="search-top-btn"
              data-testid="search-top-btn"
              className={ toggleInput
                ? 'activePageSearchButton-img'
                : 'inactivePageSearchButton-img' }
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
