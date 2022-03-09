import PropTypes from 'prop-types';
import React from 'react';

export default function Recipe({ data, i, type }) {
  return (
    <section data-testid={ `${i}-recipe-card` } style={ { border: '1px solid black' } }>
      <img
        data-testid={ `${i}-card-img` }
        src={
          type === '/foods' ? data.strMealThumb
            : data.strDrinkThumb
        }
        alt={ `${type}_thumb` }
      />
      <h4 data-testid={ `${i}-card-name` }>
        {
          type === '/foods' ? data.strMeal
            : data.strDrink
        }
      </h4>
    </section>
  );
}

Recipe.propTypes = {
  data: PropTypes.shape({
    idMeal: PropTypes.string,
  }),
}.isRequired;
