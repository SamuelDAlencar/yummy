import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import homeContext from '../contexts/homeContext';
import LoadingRecipe from './LoadingRecipe';

export default function Recipe({ id, data, i, type, cardType, keyStrType }) {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const { loading } = useContext(homeContext);

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
      {(!loading && data[`str${keyStrType}Thumb`])
        ? (
          <>
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
              {cardType === 'recomendation'
                ? (
                  <h3
                    data-testid={ `${i}-recomendation-title` }
                    className="recomendation-section__recomendation-title"
                  >
                    {data[`str${keyStrType}`]}
                  </h3>)
                : (
                  <h3
                    data-testid={ `${i}-card-name` }
                    className="recipe-section__recipe-title"
                  >
                    {data[`str${keyStrType}`]}
                  </h3>)}
              { (ingredients && data.strArea)
              && (
                <p className="info-p">
                  Nationality:
                  {' '}
                  <b>{ingredients && data.strArea}</b>
                </p>)}
              <p className="info-p">
                Category:
                {' '}
                <b>{ingredients && data.strCategory}</b>
              </p>
              <p className="info-p">
                Ingredients:
                {' '}
                <b>{ingredients && ingredients.length}</b>
              </p>
            </section>
          </>)
        : <LoadingRecipe />}
    </section>
  );
}

Recipe.propTypes = {
  data: PropTypes.shape({
    idMeal: PropTypes.string,
  }),
}.isRequired;
