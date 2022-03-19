import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import __compartilharRosa from '../images/__compartilharRosa.svg';
import __compartilharRosa2 from '../images/__compartilharRosa2.svg';
import __coraçãoRosa from '../images/__coraçãoRosa.svg';
import __coraçãoRosa2 from '../images/__coraçãoRosa2.svg';
import favoriteContext from '../contexts/favoriteContext';
import handleConditionalShare from '../helpers/handleConditionalShare';

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function ShareAndFav({ page, i, id, name, type, area, category,
  alcoholicOrNot, image }) {
  const { favorite, setFavorite } = useContext(favoriteContext);
  const [copied, setCopied] = useState();
  const MESSAGE_TIMEOUT = 1500;
  const { location: { pathname } } = useHistory();
  const { origin } = window.location;

  const handleFavorite = (data) => {
    let newFavorite = [];
    if (!(favorite.some((fav) => fav.id === id))) {
      newFavorite = [
        ...favorite,
        data,
      ];
    } else {
      newFavorite = favorite.filter((fav) => fav.id !== id);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setFavorite(newFavorite);
  };

  const handleShare = () => {
    handleConditionalShare(origin, pathname, type, id);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, MESSAGE_TIMEOUT);
  };

  return (
    page === '/done-recipes'
      ? (
        <>
          {copied && <p className="linkCopied-p">Link copied!</p>}
          <input
            data-testid={ `${i}-horizontal-share-btn` }
            type="image"
            onClick={ handleShare }
            src={ copied ? __compartilharRosa2 : __compartilharRosa }
            alt="share-btn"
          />
        </>)
      : (
        <section className="shareAndFav-section">
          <section className="shareAndFavBtn-section">
            <input
              data-testid={ page === '/favorite-recipes' ? `${i}-horizontal-share-btn`
                : 'share-btn' }
              type="image"
              onClick={ handleShare }
              src={ copied ? __compartilharRosa2 : __compartilharRosa }
              className="shareBtn-input"
              alt="share-btn"
            />
            <input
              src={ (favorite.some((fav) => fav.id === id))
                ? __coraçãoRosa2
                : __coraçãoRosa }
              alt="favorite-btn"
              className="favBtn-input"
              data-testid={ page === '/favorite-recipes'
                ? `${i}-horizontal-favorite-btn` : 'favorite-btn' }
              type="image"
              onClick={ () => handleFavorite({
                id,
                type,
                nationality: area || '',
                category,
                alcoholicOrNot: alcoholicOrNot || '',
                name,
                image,
              }) }
            />
          </section>
          <b className="linkCopied-p">{copied && 'Link copied!'}</b>
        </section>)
  );
}

ShareAndFav.propTypes = {
  alcoholicOrNot: PropTypes.any,
  area: PropTypes.any,
  category: PropTypes.any,
  id: PropTypes.any,
  image: PropTypes.any,
  name: PropTypes.any,
  type: PropTypes.any,
}.isRequired;
