import React, { useContext } from 'react';
import FiltersFav from '../components/FiltersFav';
import Header from '../components/Header';
import RecipeFav from '../components/RecipeFav';
import favoriteContext from '../contexts/favoriteContext';
import '../css/favoriteRecipes.css';

export default function Favorites() {
  const { favorite, filteredType } = useContext(favoriteContext);

  const renderCards = (type) => {
    if (type === 'All') {
      return favorite.map((o, i) => <RecipeFav key={ o.id } recipe={ o } i={ i } />);
    }
    return favorite.filter((obj) => filteredType.toLowerCase().includes(obj.type))
      .map((o, i) => <RecipeFav key={ o.id } recipe={ o } i={ i } />);
  };

  return (
    <div className="favoritePage">
      <Header namePage="Favorite Recipes" />
      <FiltersFav />
      { renderCards(filteredType) }
    </div>
  );
}
