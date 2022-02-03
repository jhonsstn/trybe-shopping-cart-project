require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - The fetchItem function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be a function.', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('should call "fetch()" if called with "MLB1615760527" argument.', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('should call "fetch()" with the "API_URL" endpoint if called with "MLB1615760527" argument.', () => {
    const API_URL = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  it('should return the "item" data structure if called with "MLB1615760527" argument.', async () => {
    const resultStructure = await fetchItem('MLB1615760527');
    expect(resultStructure).toMatchObject(item);
  });

  it('should return the "You must provide an url" error if called with no arguments.', async () => {
    const noArguments = await fetchItem();
    expect(noArguments).toEqual(new Error('You must provide an url'));
  });
});
