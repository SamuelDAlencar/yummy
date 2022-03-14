import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchRecipe from '../services/fetchRecipe';
import fetchRecipes from '../services/fetchRecipes';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
import addStorageStructure from '../helpers/addStorageStructure';
import toggleHeartIcon from '../helpers/toggleHeartIcon';
import handleConditionalShare from '../helpers/handleConditionalShare';
import addNewFavorite from '../helpers/addNewFavorite';

export default function DetailedRecipeProvider({ children }) {
  const history = useHistory();
  const { pathname } = history.location;

  const MAX_RECOMENDATIONS = 6;
  const MESSAGE_TIMEOUT = 5000;
  const [
    CURR_PAGE,
    INV_CURR_PAGE,
    CURR_LS_KEY,
    API_TYPE,
    INV_API_TYPE,
    KEY_STR,
    INV_KEY_STR,
    RECIPE_TYPE,
    INV_URL_TYPE,
  ] = pathname.includes('foods')
    ? [
      'meals',
      'meals',
      'cocktails',
      'themealdb',
      'thecocktaildb',
      'Meal',
      'Drink',
      'food',
      '/drinks',
    ]
    : [
      'drinks',
      'cocktails',
      'meals',
      'thecocktaildb',
      'themealdb',
      'Drink',
      'Meal',
      'drink',
      '/foods',
    ];

  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [copied, setCopied] = useState(false);

  const getRecipe = async () => {
    const id = pathname.replace(/\D/g, '');
    const recipeData = await fetchRecipe(API_TYPE, id);

    setRecipe(recipeData[CURR_PAGE][0]);

    Object.entries(recipeData[CURR_PAGE][0]).forEach((entrie) => {
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
    const recomendationsData = await fetchRecipes(INV_API_TYPE);
    setRecomendations(Object.values(recomendationsData)[0]);
  };

  const startRecipeButton = () => {
    const prevItem = JSON.parse(localStorage.getItem('inProgressRecipes'));

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [INV_CURR_PAGE]: prevItem[INV_CURR_PAGE],
      [CURR_LS_KEY]: {
        ...prevItem[CURR_LS_KEY],
        [pathname.replace(/\D/g, '')]: ingredients,
      },
    }));
    history.push(`${pathname}/in-progress`);
  };

  const handleFavorite = (data) => {
    const newFavorite = addNewFavorite(data, favorite, recipe, KEY_STR);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setFavorite(newFavorite);
  };

  const handleShare = (origin, path, type, id) => {
    handleConditionalShare(origin, path, type, id);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, MESSAGE_TIMEOUT);
  };

  const getFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      setFavorite(favoriteRecipes);
    }
  };

  const heartIcon = toggleHeartIcon(favorite, recipe, KEY_STR);

  return (
    <detailedRecipeContext.Provider
      value={ {
        MAX_RECOMENDATIONS,
        KEY_STR,
        RECIPE_TYPE,
        INV_KEY_STR,
        INV_URL_TYPE,
        CURR_LS_KEY,
        CURR_PAGE,
        API_TYPE,
        pathname,
        recipe,
        recomendations,
        ingredients,
        measures,
        copied,
        favorite,
        heartIcon,
        addStorageStructure,
        getFavoriteRecipes,
        setIngredients,
        setMeasures,
        getRecipe,
        getRecomendations,
        startRecipeButton,
        setFavorite,
        handleFavorite,
        handleShare,
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
