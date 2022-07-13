require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui  
  it('1-Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  })
  it('2-Verifica se quando é chamado a função fetchProducts com parâmetro "computador" se fetch foi chamado', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('3-Verifica se quando é chamado a função fetchProducts com parâmetro "computador" se o retorno é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(typeof (await fetchProducts('computador'))).toBe(typeof computadorSearch);
  })
  it('4-Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  })   
});
