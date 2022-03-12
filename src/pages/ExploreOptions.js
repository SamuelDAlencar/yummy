import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import fetchRandomRecipe from '../services/FetchRandomRecipe';

export default function ExploreOptions() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const handleSurprise = async () => {
    const relativePath = pathname.split('/')[2];
    const api = relativePath === 'foods'
      ? 'themealdb'
      : 'thecocktaildb';
    const response = await fetchRandomRecipe(api);
    const x = `/${relativePath}/${Object.values(Object.values(response)[0])[0]}`;
    history.push(x);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push(`${pathname}/ingredients`) }
      >
        By Ingredient
      </button>
      { pathname === '/explore/foods' && (
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push(`${pathname}/nationalities`) }
        >
          By Nationality
        </button>
      )}
      { console.log(pathname) }
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleSurprise }
      >
        Surprise Me!
      </button>
      <Footer />
    </div>
  );
}
