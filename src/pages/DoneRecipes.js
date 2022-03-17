import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/doneRecipes.css';
import ShareAndFav from '../components/ShareAndFav';
import FavoriteProvider from '../providers/FavoriteProvider';
import Header from '../components/Header';

export default function DoneRecipes() {
  const history = useHistory();
  const { pathname } = history.location;

  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')),
  );

  const filterDoneRecipes = ({ target: { value } }) => {
    switch (value) {
    case 'All':
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
      break;
    case 'Food':
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes'))
        .filter((recipe) => recipe.type === 'food'));
      break;
    case 'Drinks':
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes'))
        .filter((recipe) => recipe.type === 'drink'));
      break;
    default:
      return undefined;
    }
  };

  const redirectButton = (recipe) => {
    history.push(`${recipe.type === 'food'
      ? '/foods'
      : '/drinks'}/${recipe.id}`);
  };

  return (
    <>
      <Header namePage="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterDoneRecipes }
        value="All"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterDoneRecipes }
        value="Food"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDoneRecipes }
        value="Drinks"
      >
        Drinks
      </button>

      {doneRecipes && doneRecipes.map((recipe, i) => {
        const { tags } = recipe;

        return (
          <section key={ recipe.id }>
            <button
              type="button"
              onClick={ () => redirectButton(recipe) }
              style={ { backgroundColor: 'inherit', border: 'none' } }
            >
              <img
                alt="recipe_img"
                src={ recipe.image }
                data-testid={ `${i}-horizontal-image` }
                className="doneRecipe-section__recipe-img"
              />
            </button>
            <button
              type="button"
              onClick={ () => redirectButton(recipe) }
              style={ { backgroundColor: 'inherit', border: 'none' } }
            >
              <h3
                data-testid={ `${i}-horizontal-name` }
              >
                {recipe.name}
              </h3>
            </button>
            <h4
              data-testid={ `${i}-horizontal-top-text` }
            >
              { recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot} - ${recipe.category}`}
            </h4>
            <p
              data-testid={ `${i}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </p>
            {tags
            && (
              <>
                <span>Tags:</span>

                {tags.map((tag, tagI) => (
                  <span
                    key={ tag }
                    data-testid={ `${i}-${tag}-horizontal-tag` }
                  >
                    {tagI === tags.length - 1
                      ? `${tag}`
                      : ` ${tag}, `}
                  </span>
                ))}
              </>)}
            <FavoriteProvider>
              <ShareAndFav
                page={ pathname }
                i={ i }
                id={ recipe.id }
                name={ recipe.name }
                type={ recipe.type }
                area={ recipe.nationality }
                category={ recipe.category }
                alcoholicOrNot={ recipe.alcoholicOrNot }
                image={ recipe.image }
              />
            </FavoriteProvider>
          </section>);
      })}
    </>
  );
}
