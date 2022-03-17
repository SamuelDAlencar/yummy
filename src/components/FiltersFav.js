import React, { useContext } from 'react';
import favoriteContext from '../contexts/favoriteContext';

export default function FiltersFav() {
  const { filteredType, setFiltredType } = useContext(favoriteContext);

  const handleClickFilter = (type) => {
    if (!filteredType.includes(type)) {
      setFiltredType(type);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleClickFilter('All') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => handleClickFilter('Drinks') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        type="button"
        onClick={ () => handleClickFilter('Food') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
    </div>
  );
}
