const addStorageStructure = () => {
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: [],
      cocktails: [],
    }));
    localStorage.setItem('ongoingRecipesProgress', JSON.stringify({}));
  }
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
};

export default addStorageStructure;
