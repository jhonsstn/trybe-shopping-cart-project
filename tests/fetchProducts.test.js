require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - The function fetchProducts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be a function.', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('should call "fetch()" if called with "computador" argument.', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('should call "fetch()" with the "API_URL" endpoint if called with "computador" argument.', () => {
    const API_URL =
      'https://api.mercadolibre.com/sites/MLB/search?q=computador';

    fetchProducts('computador');

    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  it('should return the "computadorSearch" data structure if called with "computador" argument.', async () => {
    const resultObject = await fetchProducts('computador');
    expect(resultObject).toMatchObject(computadorSearch);
  });

  it('should return the "You must provide an url" error if called with no arguments', async () => {
    const noArguments = await fetchProducts();
    expect(noArguments).toEqual(new Error('You must provide an url'));
  });
});
