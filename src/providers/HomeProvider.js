import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import homeContext from '../contexts/homeContext';
import fetchRecipes from '../services/fetchRecipes';

export default function HomeProvider({ children }) {
  const history = useHistory();
  const { pathname } = history.location;

  // State variables
  const [apiType, setApiType] = useState(
    pathname === '/foods' ? 'themealdb' : 'thecocktaildb',
  );
  const [searchType, setSearchType] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [attemptedSearch, setAttemptedSearch] = useState(false);

  const fetchDefault = async () => {
    const data = await fetchRecipes(apiType);
    setRecipes(Object.values(data)[0]);
  };

  const searchRecipes = async () => {
    if (searchType === 'First letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (searchValue.length > 0) {
      const apiReturn = await fetchRecipes(apiType, searchValue, searchType);

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
        searchRecipes,
        handleInput,
        recipes,
        attemptedSearch,
        setRecipes,
        apiType,
        setApiType,
        fetchDefault,
      } }
    >
      { children }
    </homeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
