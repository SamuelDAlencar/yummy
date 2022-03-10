import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/inProgressRecipe.css';

export default function InProgressRecipe() {
  const history = useHistory();

  const {
    recipe,
    measures,
    ingredients,
    currPage,
    getRecipe,
    setFavorite,
    setIngredients,
    setMeasures,
  } = useContext(detailedRecipeContext);

  const [checked, setChecked] = useState({});

  useEffect(() => {
    getRecipe();
    setIngredients([]);
    setMeasures([]);
  }, []);

  const finishRecipe = () => {
    history.push('/done-recipes');
  };

  return (
    <section
      className="recipe-section"
    >
      <img
        alt="recipe-thumb"
        src={ recipe
          && (currPage === 'meals'
            ? recipe.strMealThumb
            : recipe.strDrinkThumb) }
        data-testid="recipe-photo"
        className="recipe-section__recipe-img"
      />
      <h1 data-testid="recipe-title">
        {recipe
          && (currPage === 'meals'
            ? recipe.strMeal
            : recipe.strDrink)}
      </h1>
      <button
        data-testid="share-btn"
        type="button"
      >
        <img src={ shareIcon } alt="share-btn" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ () => handleFavorite(setFavorite) }
      >
        <img src={ whiteHeartIcon } alt="favorite-btn" />
      </button>
      <h4 data-testid="recipe-category">
        {recipe && recipe.strCategory}
        {(recipe
          && currPage === 'drinks')
          && ` - ${recipe.strAlcoholic}`}
      </h4>
      <h2>Ingredients</h2>
      {recipe && ingredients.map((ingredient, i) => (
        <label
          htmlFor={ `${i}-ingredient-step` }
          data-testid={ `${i}-ingredient-step` }
          key={ `${i}-ingredient` }
          style={
            checked[i]
              ? { textDecoration: 'line-through' }
              : { textDecoration: 'none' }
          }
        >
          {`${ingredient[`strIngredient${i + 1}`]} - ${measures[i]}`}
          <input
            type="checkbox"
            onChange={ () => setChecked((prevState) => ({
              ...prevState,
              [i]: !checked[i],
            })) }
            id={ `${i}-ingredient-step` }
          />
        </label>))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{recipe && recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => finishRecipe() }
        disabled={
          Object.keys(checked).length !== ingredients.length
          || Object.values(checked).some((check) => check === false)
        }
      >
        Finish Recipe
      </button>
    </section>
  );
}
