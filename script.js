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
  const formatedValue = sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  document.querySelector('.total-price').innerText = `SubTotal ${formatedValue}`;
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
  itemToRemove.parentElement.remove();
  saveCartItems(getlistCart().innerHTML);
  sumCartItens();
  window.alert('Item Removido do Carrinho');
  visibleItensInCart(); 
};

const createCartItemElement = ({ sku, name, salePrice, image }) => {
  const listCart = getlistCart();
  const newDiv = document.createElement('div');
  newDiv.className = 'container-cart-item';
  listCart.appendChild(newDiv);  
  const imageProduct = document.createElement('img');  
  imageProduct.src = image;
  imageProduct.className = 'image-cart-item';  
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | Preço: R$${salePrice}`;  
  li.addEventListener('click', cartItemClickListener);
  newDiv.appendChild(imageProduct);
  newDiv.appendChild(li);
  visibleItensInCart();
  return li;    
};

const getButton = () => {
  const button = document.querySelectorAll('button.item__add');
  button.forEach((elementButton) => {
    elementButton.addEventListener('click', () => addItemCart(elementButton.parentNode));
  });
};

const createList = async (param) => {
  const listItems = document.querySelector('.items');
  const result = await fetchProducts(param);
  result.results.forEach((element) => {
    const { id, title, thumbnail } = element;
    listItems.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
  removeLoadingMsg();
  getButton();
  cleanSearchInput();
};
const selectItem = async (item) => {
  const listCart = getlistCart();
  const result = await fetchItem(item);
  const { id, title, price, thumbnail } = result;
  createCartItemElement({ sku: id, name: title, salePrice: price, image: thumbnail });
  saveCartItems(listCart.innerHTML);
  sumCartItens();
  window.alert('Item Adicionado no Carrinho');
  visibleItensInCart(); 
};

const addItemCart = async (event) => {
  const skutItem = getSkuFromProductItem(event);
  selectItem(skutItem);
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
  visibleItensInCart();  
};
const emptycart = () => {
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', () => {
    getlistCart().innerHTML = '';
    saveCartItems(getlistCart().innerHTML);
    sumCartItens();
    window.alert('Carrinho Esvaziado com Sucesso!');
    visibleItensInCart(); 
  });  
};
const loadingMsg = () => {
  const mensage = 'carregando...';
  document.querySelector('.container').appendChild(document.createElement('spam'));
  const afterItem = document.querySelector('.items');
  const newElementNodeItem = createCustomElement('span', 'loading', mensage);
  afterItem.insertAdjacentElement('beforebegin', newElementNodeItem);
};
const hideCart = () => {
  const headerCart = document.querySelector('.cart');
  const bodyCart = document.querySelector('.container-cartTitle');
  headerCart.style.display = 'none';
  bodyCart.style.display = 'none';
}

const showCart = () => {
  const headerCart = document.querySelector('.cart');
  const bodyCart = document.querySelector('.container-cartTitle');
  headerCart.style.display = '';
  bodyCart.style.display = '';  
}

const visibleItensInCart = () => {
  if (document.querySelectorAll('.cart__item').length > 0) {
    showCart();
  } else {
    hideCart();
  }
}
const setupItemSearch = () => {
  const searchIcon = document.getElementById('search-icon');
  searchIcon.addEventListener('click', handleSearchEvent);
}

const clearList = () => {
  const itemsList = document.querySelector('.items');
  itemsList.innerHTML = "";
};

const cleanSearchInput = () => {
  const itemSearch = document.getElementById('search-input');
  itemSearch.value = '';
}

const handleSearchEvent = async () => {
  loadingMsg();
  const itemSearch = document.getElementById('search-input');
  const itemSearchValue = itemSearch.value;
  clearList();
  await createList(itemSearchValue);  
}

loadingMsg();
window.onload = async () => { 
  await createList('computador');
  prepareCartItensReload();
  emptycart();  
  setupItemSearch(); 
};
