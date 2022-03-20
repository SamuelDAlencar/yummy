import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import homeContext from '../contexts/homeContext';
import LoadingRecipe from './LoadingRecipe';
import fetchRecipe from '../services/fetchRecipe';

export default function Recipe({
  id, i, type, cardType, keyStrType, apiType }) {
  const history = useHistory();
  const pathname = history.location;

  const [ingredients, setIngredients] = useState([]);
  const [data, setdata] = useState([]);

  const { loading, setLoading } = useContext(homeContext);

  const getMoreInfo = async () => {
    setdata(Object.values(await fetchRecipe(apiType, id))[0][0]);
    setLoading(false);
    return Object.values(await fetchRecipe(apiType, id))[0][0];
  };

  const assistFunc = (entrie) => {
    if (entrie[0]
      .includes('strIngredient')
      && entrie[1] !== ''
      && entrie[1] !== null) {
      setIngredients((prevState) => [
        ...prevState,
        { [entrie[0]]: entrie[1] },
      ]);
    }
  };

  useEffect(() => {
    if (id) {
      getMoreInfo();
    }
    setLoading(false);
  }, [pathname, id]);

  useEffect(() => {
    Object.entries(data).forEach((entrie) => {
      assistFunc(entrie);
    });
  }, [data]);

  return (
    <section
      data-testid={ `${i}-${cardType}-card` }
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
                  <p className={ `${cardType}Info-p` }>
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
