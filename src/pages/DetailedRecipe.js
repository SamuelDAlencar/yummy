import React, { useContext, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Recipe from '../components/Recipe';
import '../css/detailedRecipe.css';
import detailedRecipeContext from '../contexts/detailedRecipeContext';

export default function DetailedRecipe() {
  const {
    MAX_RECOMENDATIONS,
    pathname,
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
    favorite,
    // setFavorite,
    handleShare,
    copied,
  } = useContext(detailedRecipeContext);

  const keyStr = currPage === 'meals' ? 'Meal' : 'Drink';

  useEffect(() => {
    getRecomendations();
    getRecipe();
    setIngredients([]);
    setMeasures([]);
  }, []);

  return (
    <>
      <section
        className="recipe-section"
      >
        <img
          alt="recipe-thumb"
          src={ recipe
          && recipe[`str${keyStr}Thumb`] }
          data-testid="recipe-photo"
          className="recipe-section__recipe-img"
        />
        <h1 data-testid="recipe-title">
          {recipe
          && recipe[`str${keyStr}`]}
        </h1>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ handleShare }
        >
          <img src={ shareIcon } alt="share-btn" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => handleFavorite(favorite) }
        >
          <img src={ whiteHeartIcon } alt="favorite-btn" />
        </button>
        {copied && <p>Link copied!</p>}
        <h4 data-testid="recipe-category">
          {recipe && recipe.strCategory}
          {(recipe && currPage === 'drinks')
          && ` - ${recipe.strAlcoholic}`}
        </h4>
        <ul>
          <h2>Ingredients</h2>
          {recipe && ingredients.map((ingredient, i) => (
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ `${i}-ingredient` }
            >
              {`${ingredient[`strIngredient${i + 1}`]} - ${measures[i]}`}
            </li>))}
        </ul>
        <h2>Instructions</h2>
        <p data-testid="instructions">{recipe && recipe.strInstructions}</p>
        <h1>Recomendations</h1>
        <section className="recomendations-section">
          {(recipe && recomendations)
          && recomendations.map((recomendation, i) => (
            i < MAX_RECOMENDATIONS
            && (
              <div
                key={ `recomendation-${i}` }
                data-testid={ `${i}-recomendation-card` }
                className="recomendation-card"
              >
                <Recipe
                  id={ pathname.includes('foods')
                    ? recomendation.idDrink
                    : recomendation.idMeal }
                  data={ recomendation }
                  i={ i }
                  type={ pathname.includes('foods') ? '/drinks' : '/foods' }
                  cardType="recomendation"
                />
              </div>)))}
        </section>
        <a
          href={ recipe && recipe.strYoutube }
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
  );
}
