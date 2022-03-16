import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

export default function Footer() {
  const history = useHistory();
  const { pathname } = history.location;
  const ACTIVE = 'activePage-footer-button';
  const INACTIVE = 'footer-button';

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        onClick={ () => history.push('/drinks') }
        type="button"
        className={
          pathname.includes('/drinks')
            ? ACTIVE
            : INACTIVE
        }
      >
        <img src={ drinkIcon } alt="meal icon" data-testid="drinks-bottom-btn" />
      </button>
      <button
        onClick={ () => history.push('/explore') }
        type="button"
        className={
          pathname.includes('/explore')
            ? ACTIVE
            : INACTIVE
        }
      >
        <img src={ exploreIcon } alt="explore icon" data-testid="explore-bottom-btn" />
      </button>
      <button
        onClick={ () => history.push('/foods') }
        type="button"
        className={
          pathname.includes('/foods')
            ? ACTIVE
            : INACTIVE
        }
      >
        <img src={ mealIcon } alt="meal icon" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}
