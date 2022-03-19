import React, { useContext, useEffect, useState } from 'react';
import homeContext from '../contexts/homeContext';
import fetchNationalities from '../services/fetchNaionalities';
import Recipe from '../components/Recipe';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreByNationalitie() {
  const [nationalities, setNationalities] = useState([]);
  const { recipes, fetchDefault, searchRecipes, setLoading } = useContext(homeContext);
  const mgn = 12;

  const setOptNationalities = async () => {
    const response = await fetchNationalities();
    const x = [{ strArea: 'All' }, ...response];
    setNationalities(x);
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

  useEffect(() => setLoading(true), []);
  useEffect(() => setLoading(false), [recipes]);

  return (
    <div>
      <Header namePage="Explore Nationalities" />
      {nationalities.length > 0 && (
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleChangeNation }
        >
          {nationalities.map((o) => (
            <option
              key={ o.strArea }
              value={ o.strArea }
              data-testid={ `${o.strArea}-option` }
            >
              {o.strArea}
            </option>))}
        </select>)}
      {recipes.length > 0 && recipes.slice(0, mgn).map((recipe, i) => (
        <Recipe
          key={ recipe.idMeal }
          id={ recipe.idMeal }
          data={ recipe }
          i={ i }
          type="/foods"
          keyStrType="Meal"
        />))}
      <Footer />
    </div>
  );
}
