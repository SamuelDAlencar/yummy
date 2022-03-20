import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import homeContext from '../contexts/homeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipe from '../components/Recipe';
import '../css/home.css';
import fetchRecipes from '../services/fetchRecipes';
import detailedRecipeContext from '../contexts/detailedRecipeContext';

export default function Home() {
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const [categoryControl, setCategoryControl] = useState('');
  const [categoryCondition, setCategoryCondition] = useState(true);

  const INITIAL_RECIPES_AMOUNT = 12;

  const {
    setLoading,
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
    toggleInput,
  } = useContext(homeContext);

  const {
    KEY_STR,
    API_TYPE,
  } = useContext(detailedRecipeContext);

  useEffect(() => setLoading(true), [recipes]);

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
    setLoading(false);
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
    setLoading(false);
  }, [recipes]);

  useEffect(() => {
    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [attemptedSearch]);

  const handleClickAllCategory = () => {
    setLoading(true);
    const api = pathname === '/foods' ? 'themealdb' : 'thecocktaildb';
    fetchDefault(api);
  };

  const handleClickCategory = async ({ target: { id } }) => {
    setLoading(true);
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
        {toggleInput && (
          <section className="search-section">
            <h3 className="searchButton-title">
              <button
                type="button"
                data-testid="exec-search-btn"
                onClick={ () => {
                  const api = pathname === '/foods'
                    ? 'themealdb'
                    : 'thecocktaildb';
                  searchRecipes(searchValue, searchType, api);
                } }
                className="search-button"
              >
                <b>Search by:</b>
              </button>
            </h3>
            <section className="searchOptions-section">
              <label
                htmlFor="Ingredient"
                className="searchOption-label"
              >
                <input
                  name="filter-radio"
                  type="radio"
                  id="Ingredient"
                  data-testid="ingredient-search-radio"
                  onClick={ handleInput }
                  className="searchOption-input"
                />
                Ingredient
              </label>
              <label
                htmlFor="Name"
                className="searchOption-label"
              >
                <input
                  name="filter-radio"
                  type="radio"
                  id="Name"
                  data-testid="name-search-radio"
                  onClick={ handleInput }
                  className="searchOption-input"
                />
                Name
              </label>
              <label
                htmlFor="First letter"
                className="searchOption-label"
              >
                <input
                  name="filter-radio"
                  type="radio"
                  id="First letter"
                  data-testid="first-letter-search-radio"
                  onClick={ handleInput }
                  className="searchOption-input"
                />
                First letter
              </label>
            </section>
          </section>)}
        <h3 className="categoriesTitle-h3">Categories:</h3>
        <section className="recipesCategories-section">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleClickAllCategory }
            className="genericHome-button"
          >
            All Categories
          </button>
          { recipes && categories.length > 0 && categories.map((o) => (
            <button
              type="button"
              id={ o.strCategory }
              data-testid={ `${o.strCategory}-category-filter` }
              key={ o.strCategory }
              onClick={ handleClickCategory }
              className="genericHome-button"
            >
              {o.strCategory}
            </button>
          )) }
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
            cardType="recipe"
            keyStrType={ KEY_STR }
            apiType={ API_TYPE }
          />
        ))}
      </section>
      <Footer />
    </>
  );
}
