import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import homeContext from '../contexts/homeContext';
import LoadingRecipe from './LoadingRecipe';

export default function Recipe({
  id, data, i, type, cardType, keyStrType }) {
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
      className={ `${cardType}-section` }
    >
      {(!loading && data[`str${keyStrType}Thumb`])
        ? (
          <>
            <img
              data-testid={ `${i}-card-img` }
              src={ data[`str${keyStrType}Thumb`] }
              alt={ `${type}_thumb` }
              className={ `${cardType}Thumb-img` }
            />
            <section
              className={ `${cardType}Info-section` }
            >
              <h3
                data-testid={ cardType === 'recomendation'
                  ? `${i}-recomendation-title`
                  : `${i}-card-name` }
                className={ `${cardType}Title-h3` }
              >
                {data[`str${keyStrType}`]}
              </h3>
              {type === '/foods'
                ? (
                  <p className={ `${cardType}Title-h3` }>
                    Nationality:
                    {' '}
                    <b>{data.strArea}</b>
                  </p>)
                : (
                  <p className={ `${cardType}Info-p` }>
                    Alcoholic:
                    {' '}
                    <b>{data.strAlcoholic}</b>
                  </p>)}
              <p className={ `${cardType}Info-p` }>
                Category:
                {' '}
                <b>{data.strCategory}</b>
              </p>
              <p className={ `${cardType}Info-p` }>
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
