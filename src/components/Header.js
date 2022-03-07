import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header>
      <section>
        <button
          type="submit"
          data-testid="profile-top-btn"
          id="profile-top-btn"
        >
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile-top-btn" />
        </button>
        <h2 data-testid="page-title">Foods</h2>
        <button
          type="submit"
          data-testid="search-top-btn"
          id="search-top-btn"
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="search-top-btn" />

        </button>
      </section>
      <label htmlFor="ingredients-search">
        Search by Ingredients
        <input
          type="radio"
          id="ingredients-search"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search">
        Search by Name
        <input
          type="radio"
          id="name-search"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="letter-search">
        Search by first letter
        <input
          type="radio"
          id="letter-search"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </header>
  );
}
