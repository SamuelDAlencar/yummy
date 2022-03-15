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
        <>
          <section
            className="recipe-section"
          >
            <img
              alt="recipe-thumb"
              src={ recipe[`str${KEY_STR}Thumb`] }
              data-testid="recipe-photo"
              className="recipe-section__recipe-img"
            />
            <h1 data-testid="recipe-title">
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
            <h4 data-testid="recipe-category">
              {recipe.strCategory}
              {isCurrPageDrinks
          && ` - ${recipe.strAlcoholic}`}
            </h4>
            <ul>
              <h2>Ingredients</h2>
              {ingredients.map((ingredient, i) => (
                <li
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ `${i}-ingredient` }
                >
                  {`${ingredient[`strIngredient${i + 1}`]} - ${measures[i]}`}
                </li>))}
            </ul>
            <h2>Instructions</h2>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <h1>Recomendations</h1>
            <section className="recomendations-section">
              {recomendations.slice(0, MAX_RECOMENDATIONS).map((recomendation, i) => (
                <div
                  key={ `recomendation-${i}` }
                  data-testid={ `${i}-recomendation-card` }
                  className="recomendation-card"
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
            <a
              href={ recipe.strYoutube }
              data-testid="video"
            >
              Tutorial
            </a>
          </section>
          { (!isDone) && (
            <button
              data-testid="start-recipe-btn"
              className="recipe-section__start-button"
              type="button"
              onClick={ () => startRecipeButton() }
            >
              { isProgress ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          ) }
        </>
      )
      : <Loading />
  );
}
