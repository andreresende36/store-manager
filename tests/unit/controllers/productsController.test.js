const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const productsService = require('../../../src/services/productsServices');
const productsController = require('../../../src/controllers/productsController')
const products = require('../mocks/products.mock');

describe('Testa a camada Controllers no arquivo productsController.js', () => {
  afterEach(() => sinon.restore());

  it('Controller - Testa se a rota /products com o método GET retorna todos os produtos da tabela', async () => {
    sinon.stub(productsService, 'getAll').resolves(products);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Controller - Testa se a rota /products com o método GET retorna um array vazio caso não exista nenhum produto cadastrado', async () => {
    sinon.stub(productsService, 'getAll').resolves([]);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([]);
  });

  it('Controller - Testa se a rota /products/:id com o método GET retorna os dados do produto com o ID especificado', async () => {
    sinon.stub(productsService, 'findById').resolves(products[0]);

    const req = { params: { id: 1 }};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it('Controller - Testa se a rota /products/:id com o método GET retorna um array vazio caso não exista um produto com o ID especificado', async () => {
    sinon.stub(productsService, 'findById').resolves({ type: 404, message: 'Product not found' });

    const req = { params: { id: 5 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
})