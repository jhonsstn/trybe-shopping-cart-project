const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - The getSavedCartItems function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the "localStorage.getItem" method when executed.', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('should call the "localStorage.setItem" method with "cartItems" and  "<ol><li>Item</li></ol>" arguments if called with "<ol><li>Item</li></ol>" argument.', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
