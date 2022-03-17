import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
import '../css/inProgressRecipe.css';
import FavoriteProvider from '../providers/FavoriteProvider';
import ShareAndFav from '../components/ShareAndFav';

export default function InProgressRecipe() {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.replace(/\D/g, '');

  const {
    CURR_PAGE,
    RECIPE_TYPE,
    KEY_STR,
    recipe,
    measures,
    ingredients,
    getRecipe,
    setIngredients,
    setMeasures,
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
        id: recipe[`id${KEY_STR}`],
        type: RECIPE_TYPE,
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: KEY_STR === 'Drink' && recipe.strAlcoholic,
        name: recipe[`str${KEY_STR}`],
        image: recipe[`str${KEY_STR}Thumb`],
        doneDate: date,
        tags: recipe.strTags && recipe.strTags.split(','),
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
            src={ recipe[`str${KEY_STR}Thumb`] }
            data-testid="recipe-photo"
            className="recipe-section__recipe-img"
          />
          <h1 data-testid="recipe-title">
            { recipe[`str${KEY_STR}`]}
          </h1>
          <FavoriteProvider>
            <ShareAndFav
              id={ recipe[`id${KEY_STR}`] }
              name={ recipe[`str${KEY_STR}`] }
              type={ RECIPE_TYPE }
              area={ recipe.strArea }
              category={ recipe.strCategory }
              alcoholicOrNot={ recipe.strAlcoholic }
              image={ recipe[`str${KEY_STR}Thumb`] }
            />
          </FavoriteProvider>
          {/* <button
            data-testid="share-btn"
            type="button"
            onClick={ handleShare }
          >
            <img src={ shareIcon } alt="share-btn" />
          </button>
          <input
            data-testid="favorite-btn"
            type="image"
            onClick={ () => handleFavorite(setFavorite) }
            src={ whiteHeartIcon }
            alt="favorite-btn"
          /> */}
          <h4 data-testid="recipe-category">
            {recipe.strCategory}
            { CURR_PAGE === 'drinks'
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
            disabled={ checked && (
              Object.keys(checked).length !== ingredients.length
          || Object.values(checked).some((check) => check === false)
            ) }
          >
            Finish Recipe
          </button>
        </section>
      )
  );
}
