const fetchItem = async (itemId) => {
  if (!itemId) {
    const error = new Error('You must provide an url');
    return error;
  }
  const API_URL = `https://api.mercadolibre.com/items/${itemId}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
