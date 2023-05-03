const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const {
  products,
  newProduct,
  updateResult,
  excludeResult } = require('../mocks/products.mock');

describe('Testa a camada Model que interage com a tabela products de StoreManager', () => {
  afterEach(() => sinon.restore());

  //getAll
  describe('Testes da função getAll', () => {
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
  });

  //findById
  describe('Testes da função findById', () => {
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
  });
  
  //create
  describe('Testes da função create', () => {
    it('Model - Testa se a rota /products com o método POST cadastra e retorna corretamente os dados para a camada Service', async () => {
      const mockId = 10;
      sinon.stub(connection, 'execute').resolves([{ insertId: mockId }]);

      const result = await productsModel.create(newProduct);

      expect(result.name).to.be.equals(newProduct.name);
      expect(result.id).to.be.equals(mockId);
      expect(result).to.be.an('object');
      expect(result).to.contain.keys(['id', 'name']);
    });
  });

  //update
  describe('Testes da função update', () => {
    it('Model - Testa se a rota /products/:id com o método PUT atualiza e retorna corretamente os dados para a camada Service', async () => {
      const mockId = 10;
      const { name } = newProduct;
      sinon.stub(connection, 'execute').resolves([updateResult]);

      const result = await productsModel.update({ productId: mockId, name });

      expect(result.affectedRows).to.be.equals(1);
      expect(result.info).to.be.equals('Rows matched: 1  Changed: 1  Warnings: 0');
      expect(result.changedRows).to.be.equals(1);
      expect(result.insertId).to.be.equals(0);
    });
  });

  //exclude
  describe('Testes da função exclude', () => {
    it('Model - Testa se a rota /products/:id com o método DELETE deleta corretamente os dados do banco de dados', async () => {
      const mockId = 3;
      sinon.stub(connection, 'execute').resolves([excludeResult]);

      const result = await productsModel.exclude(mockId);

      expect(result.affectedRows).to.be.equals(1);
      expect(result.info).to.be.equals('');
      expect(result.insertId).to.be.equals(0);
      expect(result).to.deep.equals(excludeResult);
    });
  });

  //search
  describe('Testes da função search', () => {
    it('Model - Testa se a rota /products/search com o método GET busca o produto corretamente no banco de dados', async () => {
      const mockQuery = 'mar';
      sinon.stub(connection, 'execute').resolves([products[0]]);

      const result = await productsModel.search(mockQuery);

      expect(result).to.be.an('object');
      expect(result).to.be.deep.equals(products[0]);
      expect(result).to.contains.keys(['id', 'name']);
    });
  });
});