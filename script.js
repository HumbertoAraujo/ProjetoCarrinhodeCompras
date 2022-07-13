const removeLoadingMsg = () => {
  document.querySelector('.loading').remove();
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const sumCartItens = async () => {
  const arrayCartItens = document.querySelectorAll('.cart__item');
  let sum = 0;
  await arrayCartItens.forEach((liCart) => {
    const textItem = liCart.innerText;
    const index$ = textItem.lastIndexOf('$');
    let valueItem = '';
    for (let i = index$ + 1; i < textItem.length; i += 1) {
      valueItem += textItem[i];
    }
    sum += parseFloat(valueItem);
  });
  // const roundValue = sum.toFixed(2);
  document.querySelector('.total-price').innerText = sum;
};
const createTotalCartItens = () => {  
  const afterItem = document.querySelector('.empty-cart');
  const newElementNodeItem = createCustomElement('span', 'total-price');
  afterItem.insertAdjacentElement('beforebegin', newElementNodeItem);
  };
const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;
const getlistCart = () => document.querySelector('.cart__items');

const cartItemClickListener = (event) => {
  const itemToRemove = event.target;
  itemToRemove.remove();
  saveCartItems(getlistCart().innerHTML);
  sumCartItens();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;    
};

const createList = async () => {
  const listItems = document.querySelector('.items');
  const result = await fetchProducts('computador');
  result.results.forEach((element) => {
    const { id, title, thumbnail } = element;
    listItems.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
  removeLoadingMsg();
};
const selectItem = async (item) => {
  const listCart = getlistCart();
  const result = await fetchItem(item);
  const { id, title, price } = result;
  createCartItemElement({ sku: id, name: title, salePrice: price });
  listCart.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  saveCartItems(listCart.innerHTML);
  sumCartItens();
};

const addItemCart = async (event) => {
  const skutItem = getSkuFromProductItem(event);
  selectItem(skutItem);
};

const getButton = () => {
  const button = document.querySelectorAll('button.item__add');
  button.forEach((elementButton) => {
    elementButton.addEventListener('click', () => addItemCart(elementButton.parentNode));
  });
};
const captureLiCartItems = () => {
  const actualListCartItens = getlistCart().childNodes;
  actualListCartItens.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
  createTotalCartItens(); 
  sumCartItens();
};

const prepareCartItensReload = async () => {
  getlistCart().innerHTML = await getSavedCartItems();
  captureLiCartItems();
};
const emptycart = () => {
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', () => {
    getlistCart().innerHTML = '';
    saveCartItems(getlistCart().innerHTML);
    sumCartItens();
  });
};
const loadingMsg = () => {
  const mensage = 'carregando...';
  document.querySelector('.container').appendChild(document.createElement('spam'));
  const afterItem = document.querySelector('.items');
  const newElementNodeItem = createCustomElement('span', 'loading', mensage);
  afterItem.insertAdjacentElement('beforebegin', newElementNodeItem);
};
loadingMsg();
window.onload = async () => { 
  await createList();
  await getButton(); 
  prepareCartItensReload();
  emptycart();   
};
