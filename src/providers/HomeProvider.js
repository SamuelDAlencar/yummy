import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import homeContext from '../contexts/homeContext';
import fetchRecipes from '../services/fetchRecipes';
import fetchCategories from '../services/fetchCategories';

export default function HomeProvider({ children }) {
  const history = useHistory();
  const { pathname } = history.location;

  const [apiType, setApiType] = useState(
    pathname === '/foods' ? 'themealdb' : 'thecocktaildb',
  );
  const [searchType, setSearchType] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [attemptedSearch, setAttemptedSearch] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const [categories, setCategories] = useState([]);

  // const setRecipesAll = (arr) => {
  //   setRecipes(arr.filter((o) => (
  //     categories.some((obj) => obj.strCategory === o.strCategory)
  //   )));
  // };

  const fetchDefault = async (api) => {
    const data = await fetchRecipes(api);
    const arr = Object.values(data)[0];
    // if (!filters) {
    //   setRecipes(arr);
    // } else setRecipesAll(arr);
    setRecipes(arr);
  };

  const fetchDefaultCategories = async (type) => {
    const categoriesReturn = await fetchCategories(type);
    setCategories(categoriesReturn);
  };

  const searchRecipes = async (value, type, api) => {
    if (type === 'First letter' && value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (value.length > 0) {
      const apiReturn = await fetchRecipes(api, value, type);

      if (apiReturn === undefined) {
        setRecipes(null);
      } else {
        setRecipes(Object.values(apiReturn)[0]);
      }

      setAttemptedSearch(!attemptedSearch);
    }
  };

  const handleInput = ({ target: { type, value, id } }) => {
    if (type === 'text') {
      setSearchValue(value);
    } else {
      setSearchType(id);
    }
  };

  return (
    <homeContext.Provider
      value={ {
        recipes,
        attemptedSearch,
        apiType,
        redirected,
        categories,
        setRedirected,
        setAttemptedSearch,
        searchRecipes,
        handleInput,
        setRecipes,
        setApiType,
        fetchDefault,
        fetchDefaultCategories,
        searchType,
        searchValue,
      } }
    >
      { children }
    </homeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
