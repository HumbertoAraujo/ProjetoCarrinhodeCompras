const fetchProducts = async (productName) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;
    const response = await fetch(URL);
    const data = await response.json();        
    return data;    
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

