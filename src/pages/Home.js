import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import homeContext from '../contexts/homeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipe from '../components/Recipe';
import '../css/home.css';
import fetchRecipes from '../services/fetchRecipes';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
// import Loading from '../components/Loading';

export default function Home() {
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const [categoryControl, setCategoryControl] = useState('');
  const [categoryCondition, setCategoryCondition] = useState(true);

  const INITIAL_RECIPES_AMOUNT = 12;

  const {
    handleInput,
    searchRecipes,
    recipes,
    attemptedSearch,
    fetchDefault,
    fetchDefaultCategories,
    categories,
    setRecipes,
    searchValue,
    searchType,
  } = useContext(homeContext);

  const {
    KEY_STR,
  } = useContext(detailedRecipeContext);

  useEffect(() => {
    const api = pathname.includes('/food')
      ? 'themealdb'
      : 'thecocktaildb';

    fetchDefaultCategories(api);
    let prevWay = localStorage.getItem('prevWay');
    if (prevWay) {
      prevWay = JSON.parse(prevWay);
      searchRecipes(prevWay.filt, prevWay.type, api);
      localStorage.setItem('prevWay', '');
    } else { fetchDefault(api); }
  }, [pathname]);

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

  const handleClickAllCategory = () => {
    const api = pathname === '/foods' ? 'themealdb' : 'thecocktaildb';
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
      <Header
        namePage={
          pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2)
        }
      />
      <section className="home-section">
        <h4 className="searchby-title">Search By:</h4>
        <section className="searchFilters-section">
          <label htmlFor="Ingredient">
            Ingredient
            <input
              name="filter-radio"
              type="radio"
              id="Ingredient"
              data-testid="ingredient-search-radio"
              onClick={ handleInput }
              className="filter-options-input"
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
              className="filter-options-input"
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
              className="filter-options-input"
            />
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => {
              const api = pathname === '/foods'
                ? 'themealdb'
                : 'thecocktaildb';
              searchRecipes(searchValue, searchType, api);
            } }
            className="home-button"
          >
            Search
          </button>
        </section>
        <section className="categories-filters">
          <h4 className="filter-title">Categories:</h4>
          { recipes && categories.length > 0 && categories.map((o) => (
            <button
              type="button"
              id={ o.strCategory }
              data-testid={ `${o.strCategory}-category-filter` }
              key={ o.strCategory }
              onClick={ handleClickCategory }
              className="home-button"
            >
              {o.strCategory}
            </button>
          )) }
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleClickAllCategory }
            className="home-button"
          >
            All Categories
          </button>
        </section>
      </section>
      <section className="recipes-section">
        {recipes && recipes.slice(0, INITIAL_RECIPES_AMOUNT).map((recipe, i) => (
          <Recipe
            key={ pathname === '/foods' ? recipe.idMeal : recipe.idDrink }
            id={ pathname === '/foods' ? recipe.idMeal : recipe.idDrink }
            data={ recipe }
            i={ i }
            type={ pathname }
            keyStrType={ KEY_STR }
          />
        ))}
      </section>
      <Footer />
    </>
  );
}
