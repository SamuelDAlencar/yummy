import React from 'react';
import { useHistory } from 'react-router-dom';
import __drink from '../images/__drink.svg';
import __drinkRosa2 from '../images/__drinkRosa2.svg';
import __comida from '../images/__comida.svg';
import __comidaRosa2 from '../images/__comidaRosa2.svg';
import __bussola from '../images/__bussola.svg';
import __bussolaRosa2 from '../images/__bussolaRosa2.svg';

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
        <img
          src={
            pathname.includes('/drinks')
              ? __drinkRosa2
              : __drink
          }
          alt="meal icon"
          data-testid="drinks-bottom-btn"
        />
        Drinks
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
        <img
          src={
            pathname.includes('/explore')
              ? __bussolaRosa2
              : __bussola
          }
          alt="explore icon"
          data-testid="explore-bottom-btn"
        />
        Explore
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
        <img
          src={
            pathname.includes('/foods')
              ? __comidaRosa2
              : __comida
          }
          alt="meal icon"
          data-testid="food-bottom-btn"
        />
        Foods
      </button>
    </footer>
  );
}
