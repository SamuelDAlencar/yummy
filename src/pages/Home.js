import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import homeContext from '../contexts/homeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipe from '../components/Recipe';

export default function Home() {
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const INITIAL_RECIPES_AMOUNT = 12;

  // Context variables
  const {
    handleInput,
    searchRecipes,
    recipes,
    attemptedSearch,
    apiType,
    setApiType,
    fetchDefault,
  } = useContext(homeContext);

  // Set the first 12 recipes
  useEffect(() => {
    fetchDefault();
  }, []);

  // Re-set the recipes when changing recipe types
  useEffect(() => {
    fetchDefault();
  }, [apiType]);

  // Update the apiType depending on the page url (foods/drinks)
  useEffect(() => {
    if (pathname === '/foods') {
      setApiType('themealdb');
    } else {
      setApiType('thecocktaildb');
    }
    fetchDefault();
  });

  // Redirect to the detailed recipe page if the api returns only one result
  useEffect(() => {
    if (recipes && recipes.length === 1) {
      if (history.location.pathname === '/foods') {
        history.push(`/foods/${recipes[0].idMeal}`);
      } else {
        history.push(`/drinks/${recipes[0].idDrink}`);
      }
    }
  }, [recipes]);

  // Trigger alert if there's no results
  useEffect(() => {
    console.log(recipes, !recipes);
    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [attemptedSearch]);

  return (
    <>
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
        && recipes.map((recipe, i) => i < INITIAL_RECIPES_AMOUNT
          && <Recipe
            key={ pathname === '/foods' ? recipe.idMeal : recipe.idDrink }
            data={ recipe }
            i={ i }
            type={ pathname }
          />)}
      <Footer />
    </>
  );
}
