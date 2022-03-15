import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import favoriteContext from '../contexts/favoriteContext';

export default function FavoriteProvider({ children }) {
  const [favorite, setFavorite] = useState([]);
  const [filteredType, setFiltredType] = useState('All');

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
    <favoriteContext.Provider
      value={ {
        favorite,
        setFavorite,
        filteredType,
        setFiltredType,
      } }
    >
      {children}
    </favoriteContext.Provider>
  );
}
FavoriteProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
