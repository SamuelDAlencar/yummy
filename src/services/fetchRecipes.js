export default async function fetchRecipes(apiType, searchValue, searchType) {
  console.log(apiType, searchValue, searchType);
  try {
    switch (searchType) {
    case 'Ingredient': {
      const url = `https://www.${apiType}.com/api/json/v1/1/filter.php?i=${searchValue}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    case 'Name': {
      const url = `https://www.${apiType}.com/api/json/v1/1/search.php?s=${searchValue}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data;
    }
    case 'First letter': {
      const url = `https://www.${apiType}.com/api/json/v1/1/search.php?f=${searchValue}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    case 'Category': {
      const url = `https://www.${apiType}.com/api/json/v1/1/filter.php?c=${searchValue}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    case 'Nationality': {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchValue}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    default: {
      const url = `https://www.${apiType}.com/api/json/v1/1/search.php?s=`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    }
  } catch (error) {
    console.error(error);
  }
}
