import PropTypes from 'prop-types';
import React from 'react';

export default function Recipe({ data, i }) {
  return (
    <section data-testid={ `${i}-recipe-card` } style={ { border: '1px solid black' } }>
      <img data-testid={ `${i}-card-img` } src={ data.strMealThumb } alt="meal_thumb" />
      <h4 data-testid={ `${i}-card-name` }>{ data.strMeal }</h4>
    </section>
  );
}

Recipe.propTypes = {
  data: PropTypes.shape({
    idMeal: PropTypes.string,
  }),
}.isRequired;
