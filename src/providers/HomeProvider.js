import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import homeContext from '../contexts/homeContext';
import fetchRecipes from '../services/fetchRecipes';

export default function HomeProvider({ children }) {
  const [apiType, setApiType] = useState();
  const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchAttempt, setSearchAttempt] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname === '/foods') {
      setApiType('themealdb');
    } else {
      setApiType('thecocktaildb');
    }
  });

  const searchRecipes = async () => {
    if (filter === 'First letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (searchValue.length > 0) {
      const apiReturn = await fetchRecipes(apiType, searchValue, filter);
      if (apiReturn !== undefined) {
        setRecipes(Object.values(apiReturn)[0]);
      }
      setSearchAttempt(!searchAttempt);
    }
  };

  const handleInput = ({ target: { type, value, id } }) => {
    if (type === 'text') {
      setSearchValue(value);
    } else {
      setFilter(id);
    }
  };

  useEffect(() => {
    if (recipes
      && isMounted
      && recipes.length === 1) {
      if (history.location.pathname === '/foods') {
        history.push(`/foods/${recipes[0].idMeal}`);
      } else {
        history.push(`/drinks/${recipes[0].idDrink}`);
      }
    }
  }, [recipes]);

  return (
    <homeContext.Provider
      value={ {
        searchRecipes,
        handleInput,
        recipes,
        searchAttempt,
      } }
    >
      { children }
    </homeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
