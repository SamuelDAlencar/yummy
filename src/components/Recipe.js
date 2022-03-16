import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Recipe({ id, data, i, type, cardType, keyStrType }) {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    Object.entries(data).forEach((entrie) => {
      if (entrie[0]
        .includes('strIngredient')
          && entrie[1] !== ''
          && entrie[1] !== null) {
        setIngredients((prevState) => [
          ...prevState,
          { [entrie[0]]: entrie[1] },
        ]);
      }
    });
  }, []);

  return (
    <section
      data-testid={ `${i}-recipe-card` }
      onClick={ () => history.push(`${type}/${id}`) }
      onKeyPress={ () => {} }
      role="button"
      tabIndex={ i }
      className={ cardType === 'recomendation'
        ? 'recomendation-section'
        : 'recipe-section' }
    >
      <img
        data-testid={ `${i}-card-img` }
        src={ data[`str${keyStrType}Thumb`] }
        alt={ `${type}_thumb` }
        className={ cardType === 'recomendation'
          ? 'recomendation-section__recipe-img'
          : 'recipe-section__recipe-img' }
      />
      <section
        className="recipe-info"
      >
        { cardType === 'recomendation'
          ? (
            <h2
              data-testid={ `${i}-recomendation-title` }
              className="recomendation-section__recomendation-title"
            >
              {data[`str${keyStrType}`]}
            </h2>)
          : (
            <h2
              data-testid={ `${i}-card-name` }
              className="recipe-section__recipe-title"
            >
              {data[`str${keyStrType}`]}
            </h2>)}
        <p className="ingredients-p">
          Ingredients:
          {' '}
          <b>{ingredients && ingredients.length}</b>
        </p>
      </section>
    </section>
  );
}

Recipe.propTypes = {
  data: PropTypes.shape({
    idMeal: PropTypes.string,
  }),
}.isRequired;
