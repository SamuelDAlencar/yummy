import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Recipe from '../components/Recipe';
import '../css/detailedRecipe.css';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
import Loading from '../components/Loading';
import findItemDone, { findItemProg } from '../helpers/findItemInLocalStorage';
import ShareAndFav from '../components/ShareAndFav';
import FavoriteProvider from '../providers/FavoriteProvider';

export default function DetailedRecipe() {
  const history = useHistory();
  const { pathname } = history.location;
  const [isDone, setDone] = useState(false);
  const [isProgress, setProgress] = useState(false);

  const {
    MAX_RECOMENDATIONS,
    CURR_PAGE,
    INV_URL_TYPE,
    KEY_STR,
    INV_KEY_STR,
    RECIPE_TYPE,
    recipe,
    recomendations,
    ingredients,
    measures,
    setIngredients,
    setMeasures,
    getRecipe,
    getRecomendations,
    startRecipeButton,
    addStorageStructure,
  } = useContext(detailedRecipeContext);

  useEffect(() => {
    setDone(findItemDone(pathname));
    setProgress(findItemProg(pathname));
    getRecomendations();
    getRecipe();
    setIngredients([]);
    setMeasures([]);
    addStorageStructure();
  }, []);

  const isCurrPageDrinks = CURR_PAGE === 'drinks';

  return (
    (recipe && recomendations)
      ? (
        <section
          className="detailedRecipe-section"
        >
          <img
            alt="recipe-thumb"
            src={ recipe[`str${KEY_STR}Thumb`] }
            data-testid="recipe-photo"
            className="detailedRecipeThumb-img"
          />
          <section className="detailedRecipeTitle-section">
            <h1
              data-testid="recipe-title"
              className="detailedRecipe-title"
            >
              {recipe[`str${KEY_STR}`]}
            </h1>
            <FavoriteProvider>
              <ShareAndFav
                page={ pathname }
                i={ null }
                id={ recipe[`id${KEY_STR}`] }
                name={ recipe[`str${KEY_STR}`] }
                type={ RECIPE_TYPE }
                area={ recipe.strArea }
                category={ recipe.strCategory }
                alcoholicOrNot={ recipe.strAlcoholic }
                image={ recipe[`str${KEY_STR}Thumb`] }
              />
            </FavoriteProvider>
          </section>
          <h4
            data-testid="recipe-category"
            className="detailedRecipe-category"
          >
            {recipe.strCategory}
            {isCurrPageDrinks
                && ` - ${recipe.strAlcoholic}`}
          </h4>
          <ul className="ingredients-ul">
            <h2 className="ingredientsTitle-h2">Ingredients</h2>
            {ingredients.map((ingredient, i) => (
              <li
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ `${i}-ingredient` }
                className="ingredient-li"
              >
                {ingredient[`strIngredient${i + 1}`]}
                {measures[i]
                  && <b>{` - ${measures[i]}`}</b>}
              </li>))}
          </ul>
          <h2 className="instructionsTitle-h2">Instructions</h2>
          <p
            data-testid="instructions"
            className="instructions-p"
          >
            {recipe.strInstructions}
          </p>
          <h2 className="recomendationsTitle-h2">Recomendations</h2>
          <section className="recomendations-section">
            {recomendations.slice(0, MAX_RECOMENDATIONS).map((recomendation, i) => (
              <div
                key={ `recomendation-${i}` }
                data-testid={ `${i}-recomendation-card` }
                className="recomendation-section"
              >
                <Recipe
                  id={ recomendation[`id${INV_KEY_STR}`] }
                  data={ recomendation }
                  i={ i }
                  type={ INV_URL_TYPE }
                  cardType="recomendation"
                  keyStrType={ INV_KEY_STR }
                />
              </div>))}
          </section>
          <h3 className="tutorialVideoTitle-h3">Tutorial: </h3>
          <iframe
            title="Recipe Tutorial"
            src={
              `https://www.youtube.com/embed/${recipe.strYoutube && recipe.strYoutube.replace('https://www.youtube.com/watch?v=', '')}`
            }
            data-testid="video"
            className="recipeTutorialVideo-iframe"
          >
            Tutorial
          </iframe>
          { (!isDone) && (
            <button
              data-testid="start-recipe-btn"
              className="startRecipeBtn-button"
              type="button"
              onClick={ () => startRecipeButton() }
            >
              { isProgress ? 'Continue Recipe' : 'Start Recipe!' }
            </button>
          ) }
        </section>
      )
      : <Loading />
  );
}
