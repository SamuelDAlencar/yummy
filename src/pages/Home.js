import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Recipe from '../components/Recipe';
import homeContext from '../contexts/homeContext';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const MIN_RECIPES_INDEX = 12;

  const {
    handleInput,
    searchRecipes,
    recipes,
  } = useContext(homeContext);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!recipes && isMounted === true) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes]);

  return (
    <>
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
      {recipes
        && recipes.map((recipe, i) => i < MIN_RECIPES_INDEX
          && <Recipe key={ recipe.idMeal } data={ recipe } i={ i } />)}
    </>
  );
}
