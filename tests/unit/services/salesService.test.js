const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const productsModel = require('../../../src/models/productsModel');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const { products } = require('../mocks/products.mock');
const {
  salesCamelCase,
  salesSnakeCase,
  saleFindByIdResultSnakeCase,
  saleFindByIdResultCamelCase,
  newSale,
  newSaleProductIdNotFound,
  updatedSale,
  partialResult,
  excludeResult, 
  partialResultProductIdFound,
  updatedSaleProductIdNotFound,
  excludeResultProductNotFound} = require('../mocks/sales.mock');

describe('Testa a camada Service no arquivo salesService.js', () => {
  afterEach(() => sinon.restore());

  //getAll
  describe('Testes da função getAll', () => {
    it('Service - Testa se a rota /sales com o método GET repassa e retorna os dados corretos entre as camadas Controller e Model', async () => {
      sinon.stub(salesModel, 'getAll').resolves(salesCamelCase);
      const result = await salesService.getAll();
    
      expect(result).to.be.equals(salesCamelCase);
      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
      expect(result[0]).to.contain.keys(['saleId', 'date', 'productId', 'quantity']);
    });
  
    it('Service - Testa se a rota /sales com o método GET retorna um array vazio caso não exista nenhuma venda cadastrada', async () => {
      sinon.stub(salesModel, 'getAll').resolves([]);
  
      const result = await salesService.getAll();
  
      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  });

  //findById
  describe('Testes da função findById', () => {
    it('Service - Testa se a rota /sales/:id com o método GET rapassa e retorna os dados de uma venda com o ID especificado entre as camadas Controller e Model', async () => {
      const mockId = 1;
      sinon.stub(salesModel, 'findById').resolves(saleFindByIdResultCamelCase);
  
      const result = await salesService.findById(mockId);
  
      expect(result).to.be.equals(saleFindByIdResultCamelCase);
      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      expect(result[0]).to.contain.keys(['date', 'productId', 'quantity']);
    });
  
    it('Service - Testa se a rota /sales/:id com o método GET repassa e retorna uma mensagem de erro caso não exista uma venda com o ID especificado', async () => {
      const mockId = 10;
      sinon.stub(salesModel, 'getAll').resolves(salesCamelCase);
  
      const result = await salesService.findById(mockId);
      expect(result).to.be.an('object');
      expect(result).to.contain.keys(['type', 'message']);
      expect(result.type).to.be.equals(404);
      expect(result.message).to.be.equals('Sale not found');
    });
  });

  //create
  describe('Testes da função create', () => {
    it('Service - Testa se a rota /sales com o método POST repassa e retorna os dados corretamente entre as camadas Controller e Model', async () => {
      const insertIdMock = 4;
      sinon.stub(salesModel, 'create').resolves({ id: insertIdMock, itemsSold: newSale });

      const result = await salesService.create(newSale);

      expect(result).to.be.an('object');
      expect(result.id).to.be.equals(insertIdMock);
      expect(result.itemsSold).to.be.equals(newSale);
      expect(result).to.contains.keys(['id', 'itemsSold']);
    });

    it('Service - Testa se a rota /sales com o método POST retorna uma mensagem de erro caso não encontre o ID de algum dos produtos no banco de dados', async () => {
      sinon.stub(productsModel, 'getAll').resolves(products);

      const result = await salesService.create(newSaleProductIdNotFound);

      expect(result).to.be.an('object');
      expect(result).to.contain.keys(['type', 'message']);
      expect(result.type).to.be.equals(404);
      expect(result.message).to.be.equals('Product not found');
    });
  });

  //update
  describe('Testes da função update', () => {
    it('Service - Testa se a rota /sales/:id com o método PUT repassa e retorna os dados corretamente entre as camadas Controller e Model', async () => {
      const mockId = 1;
      sinon.stub(salesModel, 'update').resolves([partialResult, partialResult]);

      const result = await salesService.update({ saleId: mockId, sale: updatedSale });

      expect(result).to.be.true;
    });

    it('Service - Testa se a rota /sales/:id com o método PUT retorna um erro caso algum ID dos produtos fornecidos não seja encontrado no banco de dados', async () => {
      const mockId = 1;
      sinon.stub(salesModel, 'update').resolves([partialResult, partialResultProductIdFound]);

      const result = await salesService.update({ saleId: mockId, sale: updatedSaleProductIdNotFound });

      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.an('object');
      expect(result.type).to.be.equals(404);
      expect(result.message).to.be.equals('Product not found');
    });

    it('Service - Testa se a rota /sales/:id com o método PUT retorna um erro caso algum ID dos produtos fornecidos não seja encontrado no banco de dados', async () => {
      const mockId = 10;
      sinon.stub(salesModel, 'getAll').resolves(salesCamelCase);

      const result = await salesService.update({ saleId: mockId, sale: updatedSale });

      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.an('object');
      expect(result.type).to.be.equals(404);
      expect(result.message).to.be.equals('Sale not found');
    });
  });

  //exclude
  describe('Testes da função exclude', () => {
    it('Service - Testa se a rota /sales/:id com o método DELETE repassa e retorna os dados corretamente entre as camadas Controller e Model', async () => {
      const mockId = 1;
      sinon.stub(salesModel, 'exclude').resolves(excludeResult);

      const result = await salesService.exclude({ saleId: mockId });

      expect(result).to.be.true;
    });

    it('Service - Testa se a rota /sales/:id com o método DELETE retorna um erro caso o ID da venda fornecido não seja encontrado no banco de dados', async () => {
      const mockId = 10;
      sinon.stub(salesModel, 'exclude').resolves(excludeResultProductNotFound);

      const result = await salesService.exclude({ saleId: mockId });

      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.an('object');
      expect(result.type).to.be.equals(404);
      expect(result.message).to.be.equals('Sale not found');
    });
  });
});