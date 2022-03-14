import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import favoriteContext from '../contexts/favoriteContext';
import handleConditionalShare from '../helpers/handleConditionalShare';

export default function ShareAndFav({ page, i, id, name, type, area, category,
  alcoholicOrNot, image }) {
  const { favorite, setFavorite } = useContext(favoriteContext);
  const [copied, setCopied] = useState();
  const MESSAGE_TIMEOUT = 5000;
  const { location: { pathname } } = useHistory();
  const { origin } = window.location;
  console.log(id);

  const handleFavorite = (data) => {
    let newFavorite = [];
    if (!(favorite.some((fav) => fav.id === id))) {
      newFavorite = [
        ...newFavorite,
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
        <div>
          <input
            data-testid={ `${i}-horizontal-share-btn` }
            type="image"
            onClick={ handleShare }
            src={ shareIcon }
            alt="share-btn"
          />
          {copied && <p>Link copied!</p>}
        </div>)
      : (
        <div>
          <input
            data-testid="share-btn"
            type="image"
            onClick={ handleShare }
            src={ shareIcon }
            alt="share-btn"
          />
          <input
            src={ (favorite.some((fav) => fav.id === id))
              ? blackHeartIcon
              : whiteHeartIcon }
            alt="favorite-btn"
            data-testid="favorite-btn"
            type="image"
            onClick={ () => handleFavorite({
              id,
              type,
              nationality: area || '',
              category,
              alcoholicOrNot,
              name,
              image,
            }) }
          />
          {copied && <p>Link copied!</p>}
        </div>)
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
