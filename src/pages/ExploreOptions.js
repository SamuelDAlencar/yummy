import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandomRecipe from '../services/FetchRandomRecipe';

export default function ExploreOptions() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const relativePath = pathname.split('/')[2];

  const handleSurprise = async () => {
    const api = relativePath === 'foods'
      ? 'themealdb'
      : 'thecocktaildb';
    const response = await fetchRandomRecipe(api);
    const x = `/${relativePath}/${Object.values(Object.values(response)[0])[0]}`;
    history.push(x);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="explore-container">
      <Header
        namePage={
          `Explore ${
            relativePath.charAt(0).toUpperCase() + relativePath.substring(1)}`
        }
      />
      <div className="container-button">
        <button
          className="explore-button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push(`${pathname}/ingredients`) }
          type="button"
        >
          By Ingredient
        </button>
        { pathname === '/explore/foods' && (
          <button
            className="explore-button"
            data-testid="explore-by-nationality"
            onClick={ () => history.push(`${pathname}/nationalities`) }
            type="button"
          >
            By Nationality
          </button>
        )}
        { console.log(pathname) }
        <button
          className="explore-button"
          data-testid="explore-surprise"
          onClick={ handleSurprise }
          type="button"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}
