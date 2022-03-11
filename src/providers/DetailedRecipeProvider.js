import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import fetchRecipe from '../services/fetchRecipe';
import fetchRecipes from '../services/fetchRecipes';
import detailedRecipeContext from '../contexts/detailedRecipeContext';

export default function DetailedRecipeProvider({ children }) {
  const history = useHistory();
  const { pathname } = history.location;

  const MAX_RECOMENDATIONS = 6;
  const MESSAGE_TIMEOUT = 5000;

  const [recipe, setRecipe] = useState();
  const [recomendations, setRecomendations] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [copied, setCopied] = useState(false);

  const currPage = pathname.includes('foods') ? 'meals' : 'drinks';
  const apiType = pathname.includes('foods') ? 'themealdb' : 'thecocktaildb';

  const getRecipe = async () => {
    const id = pathname.replace(/\D/g, '');
    const recipeData = await fetchRecipe(apiType, id);

    setRecipe(recipeData[currPage][0]);

    Object.entries(recipeData[currPage][0]).forEach((entrie) => {
      if (entrie[0]
        .includes('strIngredient')
          && entrie[1] !== ''
          && entrie[1] !== null) {
        setIngredients((prevState) => [
          ...prevState,
          { [entrie[0]]: entrie[1] },
        ]);
      }

      if (entrie[0]
        .includes('strMeasure')
          && entrie[1] !== ''
          && entrie[1] !== null) {
        setMeasures((prevState) => [
          ...prevState,
          entrie[1],
        ]);
      }
    });
  };

  const getRecomendations = async () => {
    const recomendationsData = await fetchRecipes(
      pathname.includes('foods')
        ? 'thecocktaildb'
        : 'themealdb', '', 'Name',
    );
    setRecomendations(Object.values(recomendationsData)[0]);
  };

  const startRecipeButton = () => {
    history.push(`${pathname}/in-progress`);
  };

  const handleFavorite = () => {
    const newFavorite = {
      ...favorite,
    };
    setFavorite(newFavorite);
  };

  const handleShare = () => {
    clipboardCopy(`${window.location.origin}${pathname}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, MESSAGE_TIMEOUT);
  };

  return (
    <detailedRecipeContext.Provider
      value={ {
        MAX_RECOMENDATIONS,
        pathname,
        currPage,
        apiType,
        recipe,
        recomendations,
        ingredients,
        measures,
        setIngredients,
        setMeasures,
        getRecipe,
        getRecomendations,
        startRecipeButton,
        favorite,
        setFavorite,
        handleFavorite,
        handleShare,
        copied,
        setCopied,
      } }
    >
      {children}
    </detailedRecipeContext.Provider>
  );
}

DetailedRecipeProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
