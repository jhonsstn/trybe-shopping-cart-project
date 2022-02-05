const cartContainer = document.querySelector('.cart__items');
const totalPriceElement = document.querySelector('.total-price');
const itemsContainer = document.querySelector('.items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );
  return section;
}

function getSkuFromProductItem(event) {
  const itemButton = event.target;
  itemSku = itemButton.parentNode.childNodes[0].innerText;
  return itemSku;
}

const addLoading = () => {
  itemsContainer.appendChild(
    createCustomElement('span', 'loading', 'carregando...'),
  );
  totalPriceElement.innerText = '0,00';
};

const removeLoading = () => {
  itemsContainer.innerHTML = null;
};

let totalPrice = 0;
const addToPrice = (itemPrice) => {
  totalPrice += itemPrice;
  totalPriceElement.innerText = parseFloat(totalPrice.toFixed(2));
};

const removeFromPrice = (element) => {
  const elementText = element.innerText;
  const itemPrice = parseFloat(elementText.split('$')[1]);
  totalPrice -= itemPrice;
  totalPriceElement.innerText = parseFloat(totalPrice.toFixed(2));
};

const saveLocalStorage = (sku, name, salePrice) => {
  const itemObject = { sku, name, salePrice };
  if (getSavedCartItems()) {
    const storageItems = JSON.parse(getSavedCartItems());
    console.log(storageItems);
    storageItems.push(itemObject);
    saveCartItems(JSON.stringify(storageItems));
  } else {
    const productsToSave = [];
    productsToSave.push(itemObject);
    saveCartItems(JSON.stringify(productsToSave));
  }
};

const removeItemFromStorage = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  localStorage.clear();
  cartItems.forEach(async (item) => {
    const itemSplitted = item.innerText.split(' ')[1];
    const fetchedItem = await fetchItem(itemSplitted);
    const { id: sku, title: name, price: salePrice } = fetchedItem;
    saveLocalStorage(sku, name, salePrice);
  });
};

function cartItemClickListener(event) {
  const element = event.target;
  element.remove();
  removeFromPrice(event.target);
  removeItemFromStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = async (event) => {
  const itemSku = getSkuFromProductItem(event);
  const item = await fetchItem(itemSku);
  const { id: sku, title: name, price: salePrice } = item;
  addToPrice(salePrice);
  const itemOnCart = createCartItemElement({ sku, name, salePrice });
  saveLocalStorage(sku, name, salePrice);
  cartContainer.appendChild(itemOnCart);
};

const addEventListenerToButtons = () => {
  const itemsButtons = document.querySelectorAll('.item__add');
  itemsButtons.forEach((button) => {
    button.addEventListener('click', addToCart);
  });
};

const productsListing = async () => {
  const productsList = await fetchProducts('computador');
  removeLoading();
  productsList.results.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const itemLi = createProductItemElement({ sku, name, image });
    itemsContainer.appendChild(itemLi);
  });
  await addEventListenerToButtons();
};

const loadLocalStorage = () => {
  if (getSavedCartItems()) {
    const productsToLoad = JSON.parse(getSavedCartItems());
    productsToLoad.forEach((product) => {
      const { sku, name, salePrice } = product;
      addToPrice(salePrice);
      const itemOnCart = createCartItemElement({ sku, name, salePrice });
      cartContainer.appendChild(itemOnCart);
    });
  }
};

const clearCart = () => {
  const clearCartButton = document.querySelector('.empty-cart');
  clearCartButton.addEventListener('click', () => {
    cartContainer.innerHTML = null;
    localStorage.clear();
    totalPrice = 0; // Zera a variável de valor do carrinho usada nas funções de preço
    totalPriceElement.innerText = '0.00';
  });
};

window.onload = () => {
  addLoading();
  productsListing();
  loadLocalStorage();
  clearCart();
};
