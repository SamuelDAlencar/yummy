const fetchCategories = async (type) => {
  const mgb = 5;
  const url = `https://www.${type}.com/api/json/v1/1/list.php?c=list`;
  try {
    const request = await fetch(url);
    const response = await request.json();
    console.log(response);
    return Object.values(response)[0].slice(0, mgb);
  } catch (e) { console.error(e); }
};

export default fetchCategories;
