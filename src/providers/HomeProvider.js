import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import homeContext from '../contexts/homeContext';
import fetchRecipes from '../services/fetchApi';

export default function HomeProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState();
  const [searchValue, setSearchValue] = useState();
  const [recipes, setRecipes] = useState();

  const history = useHistory();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const searchRecipes = async () => {
    const apiReturn = await fetchRecipes(searchValue, filter);
    setRecipes(apiReturn.meals);
  };

  const handleInput = ({ target: { type, value, id } }) => {
    if (type === 'text') {
      setSearchValue(value);
    } else {
      setFilter(id);
    }
  };

  useEffect(() => {
    if (isMounted && recipes.length === 1) {
      history.push(`/foods/${recipes[0].idMeal}`);
    }
  }, [recipes]);

  return (
    <homeContext.Provider
      value={ {
        searchRecipes,
        handleInput,
        recipes,
      } }
    >
      { children }
    </homeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
