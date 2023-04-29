const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const products = require('../mocks/products.mock');

describe('Testa a camada Model que interage com a tabela products de StoreManager', () => {
  afterEach(() => sinon.restore());

  it('Model - Testa se a rota /products com o método GET retorna todos os produtos da tabela', async () => {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.equals(products);
    expect(result).to.be.an('array');
    expect(result).to.have.length(3);
    expect(result[0]).to.contain.keys(['id', 'name']);
  });

  it('Model - Testa se a rota /products com o método GET retorna um array vazio caso não exista nenhum produto cadastrado', async () => {
    sinon.stub(connection, 'execute').resolves([[]]);

    const result = await productsModel.getAll();

    expect(result).to.be.an('array');
    expect(result).to.have.length(0);
  });

  it('Model - Testa se a rota /products/:id com o método GET retorna os dados do produto com o ID especificado', async () => {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.findById(1);

    expect(result).to.be.equals(products[0]);
    expect(result).to.be.an('object');
    expect(result).to.contain.keys(['id', 'name']);
  });

  it('Model - Testa se a rota /products/:id com o método GET retorna um array vazio caso não exista um produto com o ID especificado', async () => {
    sinon.stub(connection, 'execute').resolves([[[]]]);

    const result = await productsModel.findById(5);

    expect(result).to.be.an('array');
    expect(result).to.have.length(0);
  });
})