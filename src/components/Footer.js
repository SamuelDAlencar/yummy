import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } alt="meal icon" data-testid="drink-bottom-btn" />
      </Link>
      <Link to="/explore">
        <img src={ exploreIcon } alt="meal icon" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/foods">
        <img src={ mealIcon } alt="meal icon" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}
