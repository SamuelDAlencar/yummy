import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CardIngredient from '../components/CardIngredient';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchIngredients from '../services/fetchIngredients';

export default function ExploreByIngredient() {
  const history = useHistory();

  const { location: { pathname } } = history;
  const [apiType, complement, redirect] = (pathname === '/explore/foods/ingredients')
    ? ['themealdb', '', 'foods'] : ['thecocktaildb', '1', 'drinks'];
  const [ingredients, setIgrendients] = useState([]);

  const FetchDefaultIngredients = async () => {
    const response = await fetchIngredients(apiType);
    setIgrendients(response);
  };

  useEffect(() => {
    FetchDefaultIngredients();
  }, []);

  return (
    <div className="exploreNat">
      <Header namePage="Explore Ingredients" />
      { ingredients.length > 0 && ingredients.map((o, i) => (
        <Link
          to={ `/${redirect}` }
          key={ i }
          onClick={ () => {
            const filt = o[`strIngredient${complement}`];
            localStorage.setItem('prevWay', JSON.stringify({
              filt,
              type: 'Ingredient',
            }));
          } }
        >
          <CardIngredient
            name={ o[`strIngredient${complement}`] }
            index={ i }
            type={ apiType }
          />
        </Link>
      )) }
      <Footer />
    </div>
  );
}
