const saveCartItems = (param) => {
  if (param !== undefined) {
    localStorage.setItem('cartItems', param); 
    return param;    
  }
  return new Error('you need to pass parameters');  
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
