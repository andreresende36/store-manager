const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const {
  salesSnakeCase,
  salesCamelCase,
  newSale,
  updatedSale, 
  saleFindByIdResultSnakeCase,
  saleFindByIdResultCamelCase,
  partialResult,
  excludeResult} = require('../mocks/sales.mock');

describe('Testa a camada Model que interage com a tabela sales e sales_products de StoreManager', () => {
  afterEach(() => sinon.restore());

  //getAll
  describe('Testes da função getAll', () => {
    it('Model - Testa se a rota /sales com o método GET retorna todos as vendas da tabela sales', async () => {
      sinon.stub(connection, 'execute').resolves([salesSnakeCase]);
  
      const result = await salesModel.getAll();
  
      expect(result).to.be.deep.equals(salesCamelCase);
      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
      expect(result[0]).to.contain.keys(['saleId', 'date', 'productId', 'quantity']);
    });
  
    it('Model - Testa se a rota /sales com o método GET retorna um array vazio caso não exista nenhuma venda cadastrada no banco de dados', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
  
      const result = await salesModel.getAll();
  
      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  });

  //findById
  describe('Testes da função findById', () => {
    it('Model - Testa se a rota /sales/:id com o método GET retorna os dados da venda com o ID especificado', async () => {
      const mockId = 1;
      sinon.stub(connection, 'execute').resolves([saleFindByIdResultSnakeCase]);

      const result = await salesModel.findById(mockId);

      expect(result).to.be.deep.equals(saleFindByIdResultCamelCase);
      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      expect(result[0]).to.contain.keys(['date', 'productId', 'quantity']);
    });

    it('Model - Testa se a rota /sales/:id com o método GET retorna um array vazio caso não exista uma venda com o ID especificado', async () => {
      const mockId = 5;
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await salesModel.findById(mockId);

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  });
  
  //create
  describe('Testes da função create', () => {
    it('Model - Testa se a rota /sales com o método POST cadastra e retorna corretamente os dados para a camada Service', async () => {
      const mockId = 10;
      sinon.stub(connection, 'execute').resolves([{ insertId: mockId }]);

      const result = await salesModel.create(newSale);

      expect(result.id).to.be.equals(mockId);
      expect(result.itemsSold).to.be.deep.equals(newSale);
      expect(result).to.be.an('object');
      expect(result).to.contain.keys(['id', 'itemsSold']);
    });
  });

  //update
  describe('Testes da função update', () => {
    it('Model - Testa se a rota /sales/:id com o método PUT atualiza e retorna corretamente os dados para a camada Service', async () => {
      const mockId = 10;
      sinon.stub(connection, 'execute').resolves([partialResult]);

      const result = await salesModel.update({ saleId: mockId, sale: updatedSale });

      expect(result).to.be.deep.equals([partialResult, partialResult]);
      expect(result[0].info).to.be.equals('Rows matched: 1  Changed: 1  Warnings: 0');
      expect(result[0].affectedRows).to.be.equals(1);
      expect(result[0].changedRows).to.be.equals(1);
      expect(result[0].insertId).to.be.equals(0);
    });
  });

  //exclude
  describe('Testes da função exclude', () => {
    it('Model - Testa se a rota /sales/:id com o método DELETE deleta corretamente os dados da venda do banco de dados', async () => {
      const mockId = 1;
      sinon.stub(connection, 'execute').resolves([excludeResult]);

      const result = await salesModel.exclude(mockId);

      expect(result.affectedRows).to.be.equals(1);
      expect(result.info).to.be.equals('');
      expect(result.insertId).to.be.equals(0);
      expect(result).to.deep.equals(excludeResult);
    });
  });
});