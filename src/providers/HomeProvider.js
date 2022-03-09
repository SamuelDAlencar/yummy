import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import homeContext from '../contexts/homeContext';
import fetchFoods from '../services/fetchFoods';
import fetchDrinks from '../services/fetchDrinks';

export default function HomeProvider({ children }) {
  // const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchAttempt, setSearchAttempt] = useState(false);

  const history = useHistory();

  // useEffect(() => {
  //   // setIsMounted(true);
  //   // console.log(fetchDefault());
  //   console.log('y');
  // }, []);

  const searchRecipes = async () => {
    if (filter === 'First letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (searchValue.length > 0) {
      if (history.location.pathname === '/foods') {
        const apiReturn = await fetchFoods(searchValue, filter);
        if (apiReturn !== undefined) {
          setRecipes(apiReturn.meals);
        }
        setSearchAttempt(!searchAttempt);
      } else {
        const apiReturn = await fetchDrinks(searchValue, filter);
        if (apiReturn !== undefined) {
          setRecipes(apiReturn.drinks);
        }
        setSearchAttempt(!searchAttempt);
      }
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
      // && isMounted
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
        setRecipes,
      } }
    >
      { children }
    </homeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
