const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui 
  it('1-Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {    
    const param = '<ol><li>Item</li></ol>';
    saveCartItems(param);
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('2-Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    const param = '<ol><li>Item</li></ol>';
    saveCartItems(param);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', param);
  })
  it('6-Teste se, ao chamar a função saveCartItems sem argumento, retorna um erro com a mensagem: "you need to pass parameters', async () => {
    expect(saveCartItems()).toEqual(new Error('you need to pass parameters'));
  })
});
