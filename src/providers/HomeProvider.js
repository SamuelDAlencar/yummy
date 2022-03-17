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
  const [toggleInput, setToggleInput] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [attemptedSearch, setAttemptedSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDefault = async (api) => {
    setLoading(true);
    const data = await fetchRecipes(api);
    const arr = Object.values(data)[0];
    setRecipes(arr);
  };

  const fetchDefaultCategories = async (type) => {
    setLoading(true);
    const categoriesReturn = await fetchCategories(type);
    setCategories(categoriesReturn);
  };

  const searchRecipes = async (value, type, api) => {
    if (type === 'First letter' && value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (value.length > 0) {
      setToggleInput(false);
      setLoading(true);
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
        loading,
        recipes,
        attemptedSearch,
        apiType,
        categories,
        searchType,
        searchValue,
        toggleInput,
        setToggleInput,
        setLoading,
        setAttemptedSearch,
        searchRecipes,
        handleInput,
        setRecipes,
        setApiType,
        fetchDefault,
        fetchDefaultCategories,
      } }
    >
      { children }
    </homeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
