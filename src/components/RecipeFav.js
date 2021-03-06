import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import ShareAndFav from './ShareAndFav';
import '../css/favoriteRecipes.css';
import '../css/doneRecipes.css';

// import ShareAndFav from './ShareAndFav';

export default function RecipeFav({ recipe, i }) {
  const { push } = useHistory();
  const redirectTo = recipe.type.includes('foo') ? 'foods' : 'drinks';
  return (
    <section className="recipes">
      <section className="recipe-section">
        <input
          className="recipe-img"
          data-testid={ `${i}-horizontal-image` }
          type="image"
          src={ recipe.image }
          alt={ recipe.name }
          onClick={ () => push(`${redirectTo}/${recipe.id}`) }
        />
        <section className="recipeInfo">
          <Link
            to={ `${redirectTo}/${recipe.id}` }
            className="removeTextDecoration"
          >
            <h3
              className="recipeTitle"
              data-testid={ `${i}-horizontal-name` }
            >
              { recipe.name }
            </h3>
          </Link>
          {recipe.type.includes('drink') ? (
            <section data-testid={ `${i}-horizontal-top-text` }>
              <p className="recipe-p">
                Alcoholic:
                {' '}
                <b data-testid={ `${i}-horizontal-top-text` }>{recipe.alcoholicOrNot}</b>
              </p>
              <p className="recipe-p">
                Category:
                <b>
                  {recipe.category}
                </b>
              </p>
            </section>)
            : (
              <section data-testid={ `${i}-horizontal-top-text` }>
                <p className="recipe-p">
                  Nationality:
                  <b>
                    { recipe.nationality }
                  </b>
                </p>
                <p className="recipe-p">
                  Category:
                  <b>
                    {recipe.category}
                  </b>
                </p>
              </section>)}
          <section className="shareAndFavBtn">
            <ShareAndFav
              page="/favorite-recipes"
              i={ i }
              id={ recipe.id }
              name={ recipe.name }
              type={ recipe.type }
              area={ recipe.nationality }
              category={ recipe.category }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              image={ recipe.image }
            />
          </section>
        </section>
      </section>
    </section>
  );
}

RecipeFav.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    type: PropTypes.string,
  }),
}.isRequired;
