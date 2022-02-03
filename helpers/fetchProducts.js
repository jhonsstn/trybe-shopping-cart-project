const fetchProducts = async (product) => {
  if (!product) {
    const error = new Error('You must provide an url');
    return error;
  }
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
