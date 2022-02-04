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
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')
  );
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const element = event.target;
  element.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = async (event) => {
  const cartContainer = document.querySelector('.cart__items');
  const itemButton = event.target;
  const itemId = itemButton.parentNode.childNodes[0].innerText;
  const item = await fetchItem(itemId);
  const { id: sku, title: name, price: salePrice } = item;
  const itemOnCart = createCartItemElement({ sku, name, salePrice });
  itemOnCart.addEventListener('click', cartItemClickListener);
  cartContainer.appendChild(itemOnCart);
};

const addEventListenerToButtons = () => {
  const itemsButtons = document.querySelectorAll('.item__add');
  console.log(itemsButtons);
  itemsButtons.forEach((button) => {
    console.log('Adicionado Evento');
    button.addEventListener('click', addToCart);
  });
};

const productsListing = async () => {
  const itemsContainer = document.querySelector('.items');
  const productsList = await fetchProducts('computador');
  productsList.results.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const itemLi = createProductItemElement({ sku, name, image });
    itemsContainer.appendChild(itemLi);
  });
  await addEventListenerToButtons();
};

window.onload = () => {
  productsListing();
};
