export default async function fetchDrinks(searchParam, searchType) {
  try {
    switch (searchType) {
    case 'Ingredient': {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchParam}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    case 'Name': {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchParam}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    case 'First letter': {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchParam}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    default:
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
}
