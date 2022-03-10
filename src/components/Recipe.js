import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React from 'react';

export default function Recipe({ id, data, i, type, cardType }) {
  const history = useHistory();

  return (
    <section
      data-testid={ `${i}-recipe-card` }
      style={ { border: '1px solid black' } }
      onClick={ () => history.push(`${type}/${id}`) }
      onKeyPress={ () => {} }
      role="button"
      tabIndex={ i }
    >
      <img
        data-testid={ `${i}-card-img` }
        src={
          type.includes('/foods') ? data.strMealThumb
            : data.strDrinkThumb
        }
        alt={ `${type}_thumb` }
      />
      { cardType === 'recomendation'
        ? (
          <h4
            data-testid={ `${i}-recomendation-title` }
          >
            {
              type.includes('/foods') ? data.strMeal
                : data.strDrink
            }
          </h4>)
        : (
          <h4
            data-testid={ `${i}-card-name` }
          >
            {
              type.includes('/foods') ? data.strMeal
                : data.strDrink
            }
          </h4>)}
    </section>
  );
}

Recipe.propTypes = {
  data: PropTypes.shape({
    idMeal: PropTypes.string,
  }),
}.isRequired;
