import React, { useState } from 'react';
import Header from '../components/Header';
import fetchRecipes from '../services/fetchApi';

export default function Home() {
  const [filter, setFilter] = useState();
  const [searchValue, setSearchValue] = useState();
  const [recipes, setRecipes] = useState();

  const searchRecipes = async () => {
    const apiReturn = await fetchRecipes(searchValue, filter);
    setRecipes(apiReturn);
    console.log(recipes);
  };

  const handleInput = ({ target: { type, value, id } }) => {
    if (type === 'text') {
      setSearchValue(value);
    } else {
      setFilter(id);
    }
  };

  return (
    <main>
      <input
        onChange={ handleInput }
        type="text"
        id="input_only_for_testing"
      />
      <Header />
      <label htmlFor="Ingredient">
        Ingredient
        <input
          name="filter-radio"
          type="radio"
          id="Ingredient"
          data-testid="ingredient-search-radio"
          onClick={ handleInput }
        />
      </label>
      <label htmlFor="Name">
        Name
        <input
          name="filter-radio"
          type="radio"
          id="Name"
          data-testid="name-search-radio"
          onClick={ handleInput }
        />
      </label>
      <label htmlFor="First letter">
        First letter
        <input
          name="filter-radio"
          type="radio"
          id="First letter"
          data-testid="first-letter-search-radio"
          onClick={ handleInput }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchRecipes }
      >
        Search
      </button>
    </main>
  );
}
