import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React from 'react';

export default function Recipe({ data, i }) {
  const history = useHistory();

  return (
    <section data-testid={ `${i}-recipe-card` } style={ { border: '1px solid black' } }>
      <img
        data-testid={ `${i}-card-img` }
        src={
          history.location.pathname === '/foods' ? data.strMealThumb
            : data.strDrinkThumb
        }
        alt="meal_thumb"
      />
      <h4 data-testid={ `${i}-card-name` }>
        {
          history.location.pathname === '/foods' ? data.strMeal
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
