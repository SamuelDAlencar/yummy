import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import ShareAndFav from './ShareAndFav';

// import ShareAndFav from './ShareAndFav';

export default function RecipeFav({ recipe, i }) {
  const { push } = useHistory();
  const redirectTo = recipe.type.includes('foo') ? 'foods' : 'drinks';
  return (
    <div>
      <input
        data-testid={ `${i}-horizontal-image` }
        type="button"
        src={ recipe.image }
        alt={ recipe.name }
        onClick={ () => push(`${redirectTo}/${recipe.id}`) }
      />
      {recipe.type.includes('drink') ? (
        <span data-testid={ `${i}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</span>)
        : (
          <div data-testid={ `${i}-horizontal-top-text` }>
            <span>{recipe.nationality}</span>
            {' - '}
            <span>{recipe.category}</span>
          </div>)}
      <Link to={ `${redirectTo}/${recipe.id}` }>
        <h2
          data-testid={ `${i}-horizontal-name` }
        >
          { recipe.name }
        </h2>
      </Link>
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
    </div>
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
