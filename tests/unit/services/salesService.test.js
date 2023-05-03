const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const salesModel = require('../../../src/models/salesModel')
const salesService = require('../../../src/services/salesService');
const {
  salesCamelCase,
  salesSnakeCase,
  saleFindByIdResultSnakeCase,
  saleFindByIdResultCamelCase,
  newSale,
  updatedSale,
  partialResult,
  excludeResult } = require('../mocks/sales.mock');

describe('Testa a camada Service no arquivo salesService.js', () => {
  afterEach(() => sinon.restore());

  //getAll
  describe('Testes da função getAll', () => { 
    it('Service - Testa se a rota /products com o método GET retorna todos os produtos da tabela', async () => {
      sinon.stub(salesModel, 'getAll').resolves(products);     
      const result = await salesService.getAll();
    
      expect(result).to.be.equals(products);
      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
      expect(result[0]).to.contain.keys(['id', 'name']);
    });
  
    it('Service - Testa se a rota /products com o método GET retorna um array vazio caso não exista nenhum produto cadastrado', async () => {
      sinon.stub(salesModel, 'getAll').resolves([]);
  
      const result = await salesService.getAll();
  
      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  });

  //findById
  describe('Testes da função findById', () => {
    it('Service - Testa se a rota /products/:id com o método GET retorna os dados do produto com o ID especificado', async () => {
      sinon.stub(salesModel, 'findById').resolves(products[0]);
  
      const result = await salesService.findById(1);
  
      expect(result).to.be.equals(products[0]);
      expect(result).to.be.an('object');
      expect(result).to.contain.keys(['id', 'name']);
    });
  
    it('Service - Testa se a rota /products/:id com o método GET retorna um array vazio caso não exista um produto com o ID especificado', async () => {
      sinon.stub(salesModel, 'findById').resolves([]);
  
      const result = await salesService.findById(5);
      expect(result).to.be.an('object');
      expect(result).to.contain.keys(['type', 'message']);
      expect(result.type).to.be.equals(404);
      expect(result.message).to.be.equals('Product not found');
    });
  });

  //create
  describe('Testes da função create', () => { 
    it('Service - Testa se a rota /products com o método POST repassa e retorna os dados corretamente entre as camadas Controller e Model', async () => {
      const insertIdMock = 4;
      sinon.stub(salesModel, 'create').resolves({ id: insertIdMock, name: newProduct.name });

      const result = await salesService.create(newProduct);

      expect(result).to.be.an('object');
      expect(result.id).to.be.equals(insertIdMock);
      expect(result.name).to.be.equals(newProduct.name);
      expect(result).to.contains.keys(['id', 'name']);
    });
  });

  //update
  describe('Testes da função update', () => {
    it('Service - Testa se a rota /products/:id com o método PUT repassa e retorna os dados corretamente entre as camadas Controller e Model', async () => {
      const mockId = 1;
      sinon.stub(salesModel, 'update').resolves(updateResult);

      const result = await salesService.update({ productId: mockId, name: newProduct.name });

      expect(result).to.be.true;
    });

    it('Service - Testa se a rota /products/:id com o método PUT retorna um erro caso o ID do produto fornecido não seja encontrado no banco de dados', async () => {
      const mockId = 10;
      sinon.stub(salesModel, 'update').resolves(updateResultProductNotFound);

      const result = await salesService.update({ productId: mockId, name: newProduct.name });

      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.an('object');
      expect(result.type).to.be.equals(404);
      expect(result.message).to.be.equals('Product not found');
    });
  });

  //exclude
  describe('Testes da função exclude', () => { 
    it('Service - Testa se a rota /products/:id com o método DELETE repassa e retorna os dados corretamente entre as camadas Controller e Model', async () => {
      const mockId = 1;
      sinon.stub(salesModel, 'exclude').resolves(excludeResult);

      const result = await salesService.exclude({ productId: mockId });

      expect(result).to.be.true;
    });

    it('Service - Testa se a rota /products/:id com o método DELETE retorna um erro caso o ID do produto fornecido não seja encontrado no banco de dados', async () => {
      const mockId = 10;
      sinon.stub(salesModel, 'exclude').resolves(excludeResultProductNotFound);

      const result = await salesService.exclude({ productId: mockId });

      expect(result).to.contains.keys(['type', 'message']);
      expect(result).to.be.an('object');
      expect(result.type).to.be.equals(404);
      expect(result.message).to.be.equals('Product not found');
    });
  });

  //search
  describe('Testes da função search', () => {
    it('Service - Testa se a rota /products/search com o método GET repassa os dados corretamente entre as camadas Controller e Model', async () => {
      const mockQuery = 'mar';
      sinon.stub(salesModel, 'search').resolves(products[0]);

      const result = await salesService.search(mockQuery);

      expect(result).to.be.an('object');
      expect(result).to.be.deep.equals(products[0]);
      expect(result).to.contains.keys(['id', 'name']);
    });
  });
})