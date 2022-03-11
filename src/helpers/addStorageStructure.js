const addStorageStructure = () => {
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: [],
      cocktails: [],
    }));
  }
};

export default addStorageStructure;
