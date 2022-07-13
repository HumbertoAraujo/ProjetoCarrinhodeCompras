const getSavedCartItems = async () => {
  const getSavedCartItemsStorage = await localStorage.getItem('cartItems');  
  return getSavedCartItemsStorage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
