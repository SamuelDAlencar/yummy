import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const toggleHeartIcon = (favorite, recipe, keyStr) => {
  const heartIcon = (favorite.some((fav) => fav.id === recipe[`id${keyStr}`]))
    ? blackHeartIcon
    : whiteHeartIcon;
  return heartIcon;
};

export default toggleHeartIcon;
