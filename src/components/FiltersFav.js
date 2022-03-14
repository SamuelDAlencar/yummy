import React from 'react';

export default function FiltersFav() {
  // const [filteredType, setFiltredType] = useState('All');

  const handleClickFilter = (type, setType) => {
    if (filteredType !== type) {
      setType(type);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickFilter }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ handleClickFilter }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        type="button"
        onClick={ handleClickFilter }
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
    </div>
  );
}
