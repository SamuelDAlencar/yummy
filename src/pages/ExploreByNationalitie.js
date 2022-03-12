import React, { useContext, useEffect, useState } from 'react';
import homeContext from '../contexts/homeContext';
import fetchNationalities from '../services/fetchNaionalities';
import Recipe from '../components/Recipe';

export default function ExploreByNationalitie() {
  const [nationalities, setNationalities] = useState([]);
  const [filtredRecipes, setFiltredRecipes] = useState([]);
  const { recipes, fetchDefault, searchRecipes } = useContext(homeContext);

  const setOptNationalities = async () => {
    let response = await fetchNationalities();
    response = [{ strArea: 'All' }, ...response];
    setNationalities(response);
  };

  const handleChangeNation = ({ target: { value } }) => {
    if (value === 'All') {
      fetchDefault('themealdb');
    } else { searchRecipes(value, 'Nationality', undefined); }
  };

  useEffect(() => {
    setOptNationalities();
    fetchDefault('themealdb');
  }, []);

  useEffect(() => {
    const mgn = 12;
    setFiltredRecipes(recipes.slice(0, mgn));
  }, [recipes]);

  return (
    <div>
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleChangeNation }
      >
        { nationalities.length > 0 && nationalities.map((o) => (
          <option key={ o.strArea } value={ o.strArea }>{ o.strArea }</option>
        )) }
      </select>
      {filtredRecipes.length > 0 && filtredRecipes.map((recipe, i) => (
        <Recipe
          key={ recipe.idMeal }
          id={ recipe.idMeal }
          data={ recipe }
          i={ i }
          type="/foods"
          keyStrType="Meal"
        />)) }
    </div>
  );
}
