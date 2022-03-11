import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Recipe from '../components/Recipe';
import '../css/detailedRecipe.css';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
import Loading from '../components/Loading';
import findItem from '../helpers/findItemInLocalStorage';

export default function DetailedRecipe() {
  const history = useHistory();
  const { pathname } = history.location;

  const {
    MAX_RECOMENDATIONS,
    currPage,
    recipe,
    recomendations,
    ingredients,
    measures,
    setIngredients,
    setMeasures,
    getRecipe,
    getRecomendations,
    startRecipeButton,
    heartIcon,
    getFavoriteRecipes,
    handleShare,
    addStorageStructure,
    handleFavorite,
    copied,
    keyStr,
    recipeType,
    invertedKeyStr,
    invertedUrlType,
    currLocalStorageKey,
  } = useContext(detailedRecipeContext);

  useEffect(() => {
    getRecomendations();
    getRecipe();
    setIngredients([]);
    setMeasures([]);
    getFavoriteRecipes();
    addStorageStructure();
  }, []);

  const isCurrPageDrinks = currPage === 'drinks';
  const id = pathname.replace(/\D/g, '');

  return (
    (recipe && recomendations)
      ? (
        <>
          <section
            className="recipe-section"
          >
            <img
              alt="recipe-thumb"
              src={ recipe[`str${keyStr}Thumb`] }
              data-testid="recipe-photo"
              className="recipe-section__recipe-img"
            />
            <h1 data-testid="recipe-title">
              {recipe[`str${keyStr}`]}
            </h1>
            <button
              data-testid="share-btn"
              type="button"
              onClick={ handleShare }
            >
              <img src={ shareIcon } alt="share-btn" />
            </button>
            <input
              src={ heartIcon }
              alt="favorite-btn"
              data-testid="favorite-btn"
              type="image"
              onClick={ () => handleFavorite({
                id: recipe[`id${keyStr}`],
                type: recipeType,
                nationality: recipe.strArea ? recipe.strArea : '',
                category: recipe.strCategory,
                alcoholicOrNot: isCurrPageDrinks ? recipe.strAlcoholic : '',
                name: recipe[`str${keyStr}`],
                image: recipe[`str${keyStr}Thumb`],
              }) }
            />
            {copied && <p>Link copied!</p>}
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
              {recomendations.map((recomendation, i) => (
                i < MAX_RECOMENDATIONS
            && (
              <div
                key={ `recomendation-${i}` }
                data-testid={ `${i}-recomendation-card` }
                className="recomendation-card"
              >
                <Recipe
                  id={ recomendation[`id${invertedKeyStr}`] }
                  data={ recomendation }
                  i={ i }
                  type={ invertedUrlType }
                  cardType="recomendation"
                  keyStrType={ invertedKeyStr }
                />
              </div>)))}
            </section>
            <a
              href={ recipe.strYoutube }
              data-testid="video"
            >
              Tutorial
            </a>
          </section>
          {!findItem('doneRecipes', 'id', id)
                && (
                  <button
                    data-testid="start-recipe-btn"
                    className="recipe-section__start-button"
                    type="button"
                    onClick={ () => startRecipeButton() }
                  >
                    {
                      JSON.parse(localStorage
                        .getItem('inProgressRecipes'))[currLocalStorageKey][id]
                        ? 'Continue Recipe'
                        : 'Start Recipe'
                    }
                  </button>)}
        </>
      )
      : <Loading />
  );
}
