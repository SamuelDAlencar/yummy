const addNewFavorite = (data, favorite, recipe, keyStr) => {
  let newFavorite = [];

  if (!(favorite.some((fav) => fav.id === recipe[`id${keyStr}`]))) {
    newFavorite = [
      ...favorite,
      data,
    ];
  } else {
    newFavorite = favorite.filter((fav) => fav.id !== recipe[`id${keyStr}`]);
  }

  return newFavorite;
};

export default addNewFavorite;
