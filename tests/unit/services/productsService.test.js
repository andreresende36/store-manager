const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const productsModel = require('../../../src/models/productsModel')
const productsService = require('../../../src/services/productsService');
const products = require('../mocks/products.mock');

describe('Testa a camada Service no arquivo productsService.js', () => {
  afterEach(() => sinon.restore());

  it('Service - Testa se a rota /products com o método GET retorna todos os produtos da tabela', async () => {
    sinon.stub(productsModel, 'getAll').resolves(products);

    
    const result = await productsService.getAll();
  
    expect(result).to.be.equals(products);
    expect(result).to.be.an('array');
    expect(result).to.have.length(3);
    expect(result[0]).to.contain.keys(['id', 'name']);
  });

  it('Service - Testa se a rota /products com o método GET retorna um array vazio caso não exista nenhum produto cadastrado', async () => {
    sinon.stub(productsModel, 'getAll').resolves([]);

    const result = await productsService.getAll();

    expect(result).to.be.an('array');
    expect(result).to.have.length(0);
  });

  it('Service - Testa se a rota /products/:id com o método GET retorna os dados do produto com o ID especificado', async () => {
    sinon.stub(productsModel, 'findById').resolves(products[0]);

    const result = await productsService.findById(1);

    expect(result).to.be.equals(products[0]);
    expect(result).to.be.an('object');
    expect(result).to.contain.keys(['id', 'name']);
  });

  it('Service - Testa se a rota /products/:id com o método GET retorna um array vazio caso não exista um produto com o ID especificado', async () => {
    sinon.stub(productsModel, 'findById').resolves([]);

    const result = await productsService.findById(5);
    expect(result).to.be.an('object');
    expect(result).to.contain.keys(['type', 'message']);
    expect(result.type).to.be.equals(404);
    expect(result.message).to.be.equals('Product not found');
  });
})