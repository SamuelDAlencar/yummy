import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import fetchRecipe from '../services/fetchRecipe';
import fetchRecipes from '../services/fetchRecipes';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
import addStorageStructure from '../helpers/addStorageStructure';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function DetailedRecipeProvider({ children }) {
  const history = useHistory();
  const { pathname } = history.location;

  const MAX_RECOMENDATIONS = 6;
  const MESSAGE_TIMEOUT = 5000;

  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [copied, setCopied] = useState(false);

  const [
    currPage,
    currLocalStorageKey,
    invertedCurrPage,
    apiType,
    invertedApiType,
    keyStr,
    invertedKeyStr,
    recipeType,
    invertedUrlType,
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
    const recomendationsData = await fetchRecipes(invertedApiType);
    setRecomendations(Object.values(recomendationsData)[0]);
  };

  const startRecipeButton = () => {
    const prevItem = JSON.parse(localStorage.getItem('inProgressRecipes'));

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [invertedCurrPage]: prevItem[invertedCurrPage],
      [currLocalStorageKey]: {
        ...prevItem[currLocalStorageKey],
        [pathname.replace(/\D/g, '')]: ingredients,
      },
    }));
    history.push(`${pathname}/in-progress`);
  };

  const handleFavorite = (data) => {
    let newFavorite = [];
    if (!(favorite.some((fav) => fav.id === recipe[`id${keyStr}`]))) {
      newFavorite = [
        ...favorite,
        data,
      ];
    } else {
      newFavorite = favorite.filter((fav) => fav.id !== recipe[`id${keyStr}`]);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setFavorite(newFavorite);
  };

  const handleShare = () => {
    clipboardCopy(`${window.location.origin}${pathname}`);
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

  const heartIcon = (favorite.some((fav) => fav.id === recipe[`id${keyStr}`]))
    ? blackHeartIcon
    : whiteHeartIcon;

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
        copied,
        favorite,
        heartIcon,
        keyStr,
        recipeType,
        invertedKeyStr,
        invertedUrlType,
        currLocalStorageKey,
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
