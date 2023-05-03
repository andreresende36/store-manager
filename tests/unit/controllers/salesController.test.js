const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { salesCamelCase,
  newSale,
  updatedSale,
} = require('../mocks/sales.mock');

describe('Testa a camada Controllers no arquivo salesController.js', () => {
  afterEach(() => sinon.restore());

  //getAll
  describe('Testes da função getAll', () => {
    it('Controller - Testa se a rota /sales com o método GET retorna todas as vendas da tabela', async () => {
      sinon.stub(salesService, 'getAll').resolves(salesCamelCase);
  
      const req = {};
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await salesController.getAll(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesCamelCase);
    });
  
    it('Controller - Testa se a rota /sales com o método GET retorna um array vazio caso não exista nenhuma venda cadastrada', async () => {
      sinon.stub(salesService, 'getAll').resolves([]);
  
      const req = {};
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await salesController.getAll(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });
  });

  //findById
  describe('Testes da função findById', () => {
    it('Controller - Testa se a rota /sales/:id com o método GET retorna os dados da venda com o ID especificado', async () => {
      sinon.stub(salesService, 'findById').resolves(salesCamelCase[0]);
  
      const req = { params: { id: 1 } };
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await salesController.findById(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesCamelCase[0]);
    });
  
    it('Controller - Testa se a rota /sales/:id com o método GET retorna uma mensagem de erro caso não exista uma venda com o ID especificado', async () => {
      sinon.stub(salesService, 'findById').resolves({ type: 404, message: 'Sale not found' });
  
      const req = { params: { id: 5 } };
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await salesController.findById(req, res);
  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  //create
  describe('Testes da função create', () => {
    it('Controller - Testa se a rota /sales com o método POST retorna um objeto com id cadastrado e o nome do produto', async () => {
      const req = { body: newSale };
      const res = {};
      sinon.stub(salesService, 'create').resolves({ id: 4, itemsSold: newSale });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 4, itemsSold: newSale });
    });

    it('Controller - Testa se a rota /sales com o método POST retorna um erro caso não exista o productId de algum produto vendido no banco de dados', async () => {
      const req = { body: newSale };
      const res = {};
      sinon.stub(salesService, 'create').resolves({ type: 404, message: 'Product not found' });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.create(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  //update
  describe('Testes da função update', () => {
    it('Controller - Testa se a rota /sales/:id com o método PUT retorna um objeto com id da venda e os dados atualizados dela', async () => {
      const req = { body: updatedSale, params: { id: 4 } };
      const res = {};
      sinon.stub(salesService, 'update').resolves(true);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ saleId: 4, itemsUpdated: updatedSale });
    });

    it('Controller - Testa se a rota /sales/:id com o método PUT retorna erro quando o ID passado no body não está cadastrado', async () => {
      const req = { body: updatedSale, params: { id: 10 } };
      const res = {};
      sinon.stub(salesService, 'update').resolves({ type: 404, message: 'Product not found' });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  //exclude
  describe('Testes da função exclude', () => {
    it('Controller - Testa se a rota /sales/:id com o método DELETE deleta a venda corretamente', async () => {
      const req = { params: { id: 1 } };
      const res = {};
      sinon.stub(salesService, 'exclude').resolves(true);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.exclude(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Controller - Testa se a rota /sales/:id com o método DELETE retorna um erro caso o ID fornecido não seja encontrado', async () => {
      const req = { params: { id: 100 } };
      const res = {};
      sinon.stub(salesService, 'exclude').resolves({ type: 404, message: 'Product not found' });

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.exclude(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});