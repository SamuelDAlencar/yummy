import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/inProgressRecipe.css';

export default function InProgressRecipe() {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.replace(/\D/g, '');

  const {
    recipe,
    measures,
    ingredients,
    currPage,
    getRecipe,
    setFavorite,
    setIngredients,
    setMeasures,
    handleShare,
    copied,
    keyStr,
    recipeType,
  } = useContext(detailedRecipeContext);

  const [checked, setChecked] = useState({});

  const checkIngredient = (i) => {
    setChecked((prevState) => ({
      ...prevState,
      [i]: !checked[i],
    }));
    localStorage.setItem('ongoingRecipesProgress', JSON.stringify({
      ...JSON.parse(localStorage.getItem('ongoingRecipesProgress')),
      [id]: {
        ...JSON.parse(localStorage.getItem('ongoingRecipesProgress'))[id],
        [i]: !checked[i],
      },
    }));
  };

  const getDoneIngredients = () => {
    if (localStorage.getItem('ongoingRecipesProgress')) {
      const recipeProgress = JSON
        .parse(localStorage.getItem('ongoingRecipesProgress'))[id];

      if (recipeProgress) {
        Object.keys(recipeProgress).forEach((ingredient) => {
          setChecked((prevState) => ({
            ...prevState,
            [ingredient]: recipeProgress[ingredient],
          }));
        });
      }
    } else {
      return localStorage.setItem('ongoingRecipesProgress', JSON.stringify({
        [id]: {},
      }));
    }
  };

  useEffect(() => {
    getRecipe();
    setIngredients([]);
    setMeasures([]);
    getDoneIngredients();
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  const finishRecipe = () => {
    const date = new Date();

    localStorage.setItem('doneRecipes', JSON.stringify([
      ...JSON.parse(localStorage.getItem('doneRecipes')),
      {
        id: recipe[`id${keyStr}`],
        type: recipeType,
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: keyStr === 'Drink' && recipe.strAlcoholic,
        name: recipe[`str${keyStr}`],
        image: recipe[`str${keyStr}Thumb`],
        doneDate: date,
        tags: recipe.strTags,
      },
    ]));
    history.push('/done-recipes');
  };

  return (
    recipe
      && (
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
            { recipe[`str${keyStr}`]}
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
            onClick={ () => handleFavorite(setFavorite) }
          >
            <img src={ whiteHeartIcon } alt="favorite-btn" />
          </button>
          {copied && <p>Link copied!</p>}
          <h4 data-testid="recipe-category">
            {recipe.strCategory}
            { currPage === 'drinks'
              && ` - ${recipe.strAlcoholic}`}
          </h4>
          <h2>Ingredients</h2>
          {ingredients.map((ingredient, i) => (
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
                onChange={ () => checkIngredient(i) }
                checked={ checked[i] && 'checked' }
                id={ `${i}-ingredient-step` }
              />
            </label>))}
          <h2>Instructions</h2>
          <p data-testid="instructions">{recipe.strInstructions}</p>
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
      )
  );
}
