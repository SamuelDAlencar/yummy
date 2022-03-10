import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import homeContext from '../contexts/homeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipe from '../components/Recipe';
import '../css/home.css';
import fetchRecipes from '../services/fetchRecipes';

export default function Home() {
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const [categoryControl, setCategoryControl] = useState('');
  const [categoryCondition, setCategoryCondition] = useState(true);
  // const [controlAllCategory, setControlAllCategory] = useState(true);

  const INITIAL_RECIPES_AMOUNT = 12;

  const {
    handleInput,
    searchRecipes,
    recipes,
    redirected,
    attemptedSearch,
    fetchDefault,
    fetchDefaultCategories,
    categories,
    setRecipes,
  } = useContext(homeContext);

  useEffect(() => {
    const api = pathname === '/foods'
      ? 'themealdb'
      : 'thecocktaildb';

    fetchDefault(api);
    fetchDefaultCategories(api);
  }, [redirected]);

  useEffect(() => {
    if (recipes && recipes.length === 1 && categoryCondition) {
      if (history.location.pathname === '/foods') {
        history.push(`/foods/${recipes[0].idMeal}`);
      } else {
        history.push(`/drinks/${recipes[0].idDrink}`);
      }
    }
    if (!categoryCondition) setCategoryCondition(true);
  }, [recipes]);

  useEffect(() => {
    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [attemptedSearch]);

  // const setRecipesAllHome = () => {
  //   setRecipes(recipes.filter((o) => (
  //     categories.some((obj) => obj.strCategory === o.strCategory)
  //   )));
  // };

  const handleClickAllCategory = () => {
    const api = pathname === '/foods' ? 'themealdb' : 'thecocktaildb';
    // if (!categoryControl && controlAllCategory) {
    //   setRecipesAllHome();
    //   setControlAllCategory(false);
    // } else if (controlAllCategory) {
    //   fetchDefault(api, true);
    //   setControlAllCategory(false);
    // } else {
    //   fetchDefault(api);
    //   setControlAllCategory(true);
    // }
    // setCategoryControl('');
    fetchDefault(api);
  };

  const handleClickCategory = async ({ target: { id } }) => {
    setCategoryCondition(false);
    const api = pathname === '/foods' ? 'themealdb' : 'thecocktaildb';
    if (categoryControl !== id) {
      const apiReturn = await fetchRecipes(api, id, 'Category');
      setRecipes(Object.values(apiReturn)[0]);
      setCategoryControl(id);
    } else {
      fetchDefault(api);
      setCategoryControl('');
    }
  };

  return (
    <>
      <Header />
      <section>
        <section>
          { categories.length > 0 && categories.map((o) => (
            <button
              type="button"
              id={ o.strCategory }
              data-testid={ `${o.strCategory}-category-filter` }
              key={ o.strCategory }
              onClick={ handleClickCategory }
            >
              {o.strCategory}
            </button>
          )) }
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleClickAllCategory }
          >
            All Categories
          </button>
        </section>
        <section className="searchFilters-section">
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
        </section>
      </section>
      {recipes
        && recipes.map((recipe, i) => i < INITIAL_RECIPES_AMOUNT
          && <Recipe
            key={ pathname === '/foods' ? recipe.idMeal : recipe.idDrink }
            id={ pathname === '/foods' ? recipe.idMeal : recipe.idDrink }
            data={ recipe }
            i={ i }
            type={ pathname }
          />)}
      <Footer />
    </>
  );
}
