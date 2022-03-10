import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import homeContext from '../contexts/homeContext';

export default function Footer() {
  const history = useHistory();
  const { pathname } = history.location;

  const {
    redirected,
    setRedirected,
  } = useContext(homeContext);

  const redirectPage = () => {
    history.push(
      pathname === '/foods'
        ? '/drinks'
        : '/foods',
    );

    setRedirected(!redirected);
  };

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        onClick={ () => redirectPage() }
        type="button"
      >
        <img src={ drinkIcon } alt="meal icon" data-testid="drink-bottom-btn" />
      </button>
      <button
        onClick={ () => redirectPage() }
        type="button"
      >
        <img src={ exploreIcon } alt="meal icon" data-testid="explore-bottom-btn" />
      </button>
      <button
        onClick={ () => redirectPage() }
        type="button"
      >
        <img src={ mealIcon } alt="meal icon" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}
