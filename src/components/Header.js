import React from 'react';

export default function Header() {
  return (
    <header>
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
