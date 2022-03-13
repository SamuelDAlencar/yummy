const fetchNationalities = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  try {
    const request = await fetch(url);
    const response = await request.json();
    console.log(response);
    return Object.values(response)[0];
  } catch (e) { console.error(e); }
};

export default fetchNationalities;
