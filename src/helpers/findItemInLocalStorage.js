const findItem = (item, key, match) => JSON.parse(localStorage
  .getItem(item))
  .some((currRecipe) => currRecipe[key] === match);

export default findItem;
