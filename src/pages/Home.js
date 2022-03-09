import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipe from '../components/Recipe';
import homeContext from '../contexts/homeContext';
import fetchRecipes from '../services/fetchRecipes';

export default function Home() {
  const MIN_RECIPES_INDEX = 12;
  const { location: { pathname } } = useHistory();

  const {
    handleInput,
    searchRecipes,
    recipes,
    searchAttempt,
    setRecipes,
    apiType,
  } = useContext(homeContext);

  const fetchDefault = async () => {
    const data = await fetchRecipes(apiType);
    setRecipes(Object.values(data)[0]);
  };

  useEffect(() => {
    fetchDefault();
  }, []);

  useEffect(() => {
    if (!recipes && isMounted) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [searchAttempt]);

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
      {/* { console.log(recipes) } */}
      {recipes
        && recipes.map((recipe, i) => i < MIN_RECIPES_INDEX
          && <Recipe
            key={ pathname === '/foods' ? recipe.idMeal : recipe.idDrink }
            data={ recipe }
            i={ i }
          />)}
      <Footer />
    </>
  );
}
