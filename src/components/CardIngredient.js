import PropTypes from 'prop-types';
import React from 'react';
import '../css/cardIngredients.css';

export default function CardIngredient({ name, index, type }) {
  // const way = name.replaceAll(' ', '-');

  return (
    <section className="card-section">
      <div
        data-testid={ `${index}-ingredient-card` }
      >
        <h1
          data-testid={ `${index}-card-name` }
          className="cardTitle"
        >
          { name }
        </h1>
        <img
          src={ `https://www.${type}.com/images/ingredients/${name}-Small.png` }
          alt={ name }
          data-testid={ `${index}-card-img` }
          // className="cardThumb-img"
        />
      </div>
    </section>
  );
}

CardIngredient.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
