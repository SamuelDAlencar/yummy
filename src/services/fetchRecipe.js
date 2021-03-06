export default async function fetchRecipe(apiType, id) {
  try {
    const url = `https://www.${apiType}.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
