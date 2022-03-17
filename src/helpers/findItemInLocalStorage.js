const findItemDone = (pathname) => {
  const id = pathname.replace(/\D/g, '');
  if (localStorage.getItem('doneRecipes')) {
    const z = JSON.parse(localStorage.getItem('doneRecipes'));
    return z.some((o) => o.id === id);
  }
  return false;
};

export const findItemProg = (pathname) => {
  const id = pathname.replace(/\D/g, '');
  const matcher = pathname.includes('drink') ? 'cocktails' : 'meals';
  if (localStorage.getItem('inProgressRecipes')) {
    const x = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const y = x[matcher];
    if (y) return Object.keys(y).some((o) => o === id);
  }
  return false;
};

export default findItemDone;
