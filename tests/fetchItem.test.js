require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
// 
describe('2 - Teste a função fetchItem', () => {
  it('1-Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  })
  it('2-Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('3-Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const URL = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(URL);
  })
  it('4-Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {    
    await fetchItem('MLB1615760527');
    expect(Object.keys(await fetchItem('MLB1615760527'))).toEqual(Object.keys(item));
  })
  it('5-Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  }) 
  
});
