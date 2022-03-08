import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import homeContext from '../contexts/homeContext';
import fetchRecipes from '../services/fetchApi';

export default function HomeProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchAttempt, setSearchAttempt] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const searchRecipes = async () => {
    if (filter === 'First letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (searchValue.length > 0) {
      const apiReturn = await fetchRecipes(searchValue, filter);
      if (apiReturn !== undefined) {
        setRecipes(apiReturn.meals);
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
    console.log(recipes);
    if (recipes && isMounted && recipes.length === 1) {
      history.push(`/foods/${recipes[0].idMeal}`);
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
