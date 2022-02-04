const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - The "saveCartItems" functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call the "localStorage.setItem" method if called with "<ol><li>Item</li></ol>" argument.', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should call the "localStorage.setItem" method with "cartItems" and  "<ol><li>Item</li></ol>" arguments if called with "<ol><li>Item</li></ol>" argument.', () => {
    const item = '<ol><li>Item</li></ol>';
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', item);
  });
});
