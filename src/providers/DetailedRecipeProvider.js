import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchRecipe from '../services/fetchRecipe';
import fetchRecipes from '../services/fetchRecipes';
import detailedRecipeContext from '../contexts/detailedRecipeContext';

export default function DetailedRecipeProvider({ children }) {
  const history = useHistory();
  const { pathname } = history.location;

  const MAX_RECOMENDATIONS = 6;

  const [recipe, setRecipe] = useState();
  const [recomendations, setRecomendations] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

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
      } }
    >
      {children}
    </detailedRecipeContext.Provider>
  );
}

DetailedRecipeProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
