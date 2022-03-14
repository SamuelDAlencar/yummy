const findItem = (item, key, match) => {
  if (localStorage.getItem(item)) {
    JSON.parse(localStorage
      .getItem(item))
      .some((currRecipe) => currRecipe[key] === match);
  }
};

export default findItem;
