const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController')
const products = require('../mocks/products.mock');

describe('Testa a camada Controllers no arquivo productsController.js', () => {
  afterEach(() => sinon.restore());

  //getAll
  describe('Testes da função getAll', () => {
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
  });

  //findById
  describe('Testes da função findById', () => {
    it('Controller - Testa se a rota /products/:id com o método GET retorna os dados do produto com o ID especificado', async () => {
      sinon.stub(productsService, 'findById').resolves(products[0]);
  
      const req = { params: { id: 1 } };
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
  });

  //create
  describe('Testes da função create', () => {
    it('Controller - Testa se a rota /products com o método POST retorna um objeto com id cadastrado e o nome do produto', async () => {
      const req = { body: { name: 'Produto teste' } };
      const res = {};
      sinon.stub(productsService, 'create').resolves({ id: 4, name: req.body.name });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 4, name: req.body.name });
    });
  });

  //update
  describe('Testes da função update', () => {
    it('Controller - Testa se a rota /products/:id com o método PUT retorna um objeto com id cadastrado e o nome do produto atualizado', async () => {
      const req = { body: { name: 'Produto teste' }, params: { id: 4} };
      const res = {};
      sinon.stub(productsService, 'update').resolves(true);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 4, name: req.body.name });
    });

    it('Controller - Testa se a rota /products/:id com o método PUT retorna erro quando o ID passado no body não está cadastrado', async () => {
      const req = { body: { name: 'Produto teste' }, params: { id: 100} };
      const res = {};
      sinon.stub(productsService, 'update').resolves({ type: 404, message: 'Product not found' });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  //exclude
  describe('Testes da função exclude', () => {
    it('Controller - Testa se a rota /products/:id com o método DELETE deleta o objeto corretamente', async () => {
      const req = { params: { id: 1} };
      const res = {};
      sinon.stub(productsService, 'exclude').resolves(true);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.exclude(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Controller - Testa se a rota /products/:id com o método DELETE retorna um erro caso o ID fornecido não seja encontrado', async () => {
      const req = { params: { id: 100} };
      const res = {};
      sinon.stub(productsService, 'exclude').resolves({ type: 404, message: 'Product not found' });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.exclude(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  //search
  describe('Testes da função search', () => {
    it('Controller - Testa se a rota /products/search com o método GET retorna um JSON contendo todos os produtos relacionados ao termo de pesquisa', async () => {
      const req = { query: { q: 'mar'} };
      const res = {};
      sinon.stub(productsService, 'search').resolves([products[0]]);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.search(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([products[0]]);
    })
  })
});