import PropTypes from 'prop-types';
import React from 'react';
// import ShareAndFav from './ShareAndFav';

export default function RecipeFav({ recipe }) {
  return (
    <div>
      <img src={ recipe.image } alt={ recipe.name } />
      {recipe.type === 'drinks' ? <span>{ recipe.alcoholicOrNot }</span>
        : (
          <div>
            <span>{recipe.category}</span>
            <span>{recipe.nationality}</span>
          </div>)}
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
