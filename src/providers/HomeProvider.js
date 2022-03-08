import PropTypes from 'prop-types';
import React, { useState } from 'react';
import homeContext from '../contexts/homeContext';
import fetchRecipes from '../services/fetchApi';

export default function HomeProvider({ children }) {
  const [filter, setFilter] = useState();
  const [searchValue, setSearchValue] = useState();
  const [recipes, setRecipes] = useState();

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
