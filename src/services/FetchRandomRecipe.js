const fetchCategories = async (type) => {
  const url = `https://www.${type}.com/api/json/v1/1/random.php`;
  try {
    const request = await fetch(url);
    const response = await request.json();
    return Object.values(response)[0];
  } catch (e) { console.error(e); }
};

export default fetchCategories;
