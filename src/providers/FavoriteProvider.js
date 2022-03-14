import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import favoriteContext from '../contexts/favoriteContext';

export default function FavoriteProvider({ children }) {
  const [favorite, setFavorite] = useState([]);

  const getFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      setFavorite(favoriteRecipes);
    }
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  return (
    <favoriteContext.Provider value={ { favorite, setFavorite } }>
      { children }
    </favoriteContext.Provider>
  );
}
FavoriteProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
