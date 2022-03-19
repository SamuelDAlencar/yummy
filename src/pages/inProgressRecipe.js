import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import detailedRecipeContext from '../contexts/detailedRecipeContext';
import FavoriteProvider from '../providers/FavoriteProvider';
import ShareAndFav from '../components/ShareAndFav';
import '../css/inProgressRecipe.css';

// eslint-disable-next-line sonarjs/cognitive-complexity
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
          className="inProgressRecipe-section"
        >
          <h1
            className="inProgressRecipeTitle-h1"
            data-testid="recipe-title"
          >
            {recipe[`str${KEY_STR}`]}
          </h1>
          <h3
            data-testid="recipe-category"
            className="inProgressRecipeCategory-h3"
          >
            {recipe.strCategory}
            { CURR_PAGE === 'drinks'
              && ` - ${recipe.strAlcoholic}`}
          </h3>
          <h2
            className="inProgressRecipeIngredientsTitle-h2"
          >
            Let&apos;s go! Here&apos;s the ingredients you&apos;ll need, got everything?
          </h2>
          <section className="inProgressRecipeIngredients-section">
            {ingredients.map((ingredient, i) => (
              <label
                key={ `${i}-ingredient` }
                htmlFor={ `${i}-ingredient-step` }
                data-testid={ `${i}-ingredient-step` }
                style={
                  checked[i]
                    ? { textDecoration: 'line-through' }
                    : { textDecoration: 'none' }
                }
                className="inProgressRecipeIngredient-label"
              >
                <input
                  type="checkbox"
                  onChange={ () => checkIngredient(i) }
                  checked={ checked[i] && 'checked' }
                  id={ `${i}-ingredient-step` }
                  className="inProgressRecipe-input"
                />
                {`${ingredient[`strIngredient${i + 1}`]} - ${measures[i]}`}
              </label>
            ))}
          </section>
          <h2
            className="InProgressRecipeInstructionsTitle-h2"
          >
            Here&apos;s how to prepare it
          </h2>
          <p
            data-testid="instructions"
            className="inProgressRecipeInstruction-p"
          >
            { recipe.strYoutube
              ? (
                <iframe
                  title="Recipe Tutorial"
                  src={
                    `https://www.youtube.com/embed/${recipe.strYoutube && recipe.strYoutube.replace('https://www.youtube.com/watch?v=', '')}`
                  }
                  data-testid="video"
                  className="recipeTutorialVideo-iframe"
                >
                  Tutorial
                </iframe>)
              : (
                <h4
                  className="noVideoWarning-h4"
                >
                  &#40;&#32;&#32;
                  Sorry, we don&#39;t have a video tutorial for this one 😢&#32;&#32;&#41;
                </h4>)}
            {recipe.strInstructions.includes('2. ')
              ? recipe.strInstructions.split('. ').map((p, i) => (
                <p key={ `${i}-p` }>
                  {recipe.strInstructions}
                </p>
              ))
              : recipe.strInstructions.split('. ').map((p, i) => (
                <p key={ `${i}-p` }>
              &nbsp;&nbsp;
                  {`- ${p};`}
                </p>
              ))}
          </p>
          <h2
            className="inProgressRecipeThumbTitle-h2"
          >
            {`Aaand voilá! Here's an example of how your
              ${recipe[`str${KEY_STR}`]} may look like:`}
          </h2>
          <img
            alt="recipe-thumb"
            src={ recipe[`str${KEY_STR}Thumb`] }
            data-testid="recipe-photo"
            className="inProgressRecipeThumb-img"
          />
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
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => finishRecipe() }
            disabled={ checked && (
              Object.keys(checked).length !== ingredients.length
              || Object.values(checked).some((check) => check === false)
            ) }
            className="inProgressRecipeFinishBtn-button"
          >
            Finish Recipe
          </button>
        </section>
      )
  );
}
