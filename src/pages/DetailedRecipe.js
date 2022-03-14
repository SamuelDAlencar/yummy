import React, { useContext, useEffect } from 'react';
import Recipe from '../components/Recipe';
import '../css/detailedRecipe.css';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
import Loading from '../components/Loading';
import ShareAndFav from '../components/ShareAndFav';
import FavoriteProvider from '../providers/FavoriteProvider';

export default function DetailedRecipe() {
  const {
    MAX_RECOMENDATIONS,
    currPage,
    recipe,
    recipeType,
    recomendations,
    ingredients,
    measures,
    setIngredients,
    setMeasures,
    getRecipe,
    getRecomendations,
    startRecipeButton,
    keyStr,
    invertedKeyStr,
    invertedUrlType,
  } = useContext(detailedRecipeContext);

  useEffect(() => {
    getRecomendations();
    getRecipe();
    setIngredients([]);
    setMeasures([]);

    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: [],
        cosktails: [],
      }));
    }
  }, []);

  const isCurrPageDrinks = currPage === 'drinks';

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
            <FavoriteProvider>
              <ShareAndFav
                id={ recipe[`id${keyStr}`] }
                name={ recipe[`str${keyStr}`] }
                type={ recipeType }
                area={ recipe.strArea }
                category={ recipe.strCategory }
                alcoholicOrNot={ recipe.strAlcoholic }
                image={ recipe[`str${keyStr}Thumb`] }
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
          <button
            data-testid="start-recipe-btn"
            className="recipe-section__start-button"
            type="button"
            onClick={ () => startRecipeButton() }
          >
            Start Recipe
          </button>
        </>
      )
      : <Loading />
  );
}
