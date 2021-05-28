"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _typeorm = require("typeorm");

var _typeorm2 = _interopRequireDefault(require("../shared/infra/typeorm"));

var _Product = _interopRequireDefault(require("../modules/products/infra/typeorm/entities/Product"));

var _app = _interopRequireDefault(require("../shared/infra/http/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('App', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm2.default)('test-connection');
    await connection.query('DROP TABLE IF EXISTS orders_products');
    await connection.query('DROP TABLE IF EXISTS orders');
    await connection.query('DROP TABLE IF EXISTS products');
    await connection.query('DROP TABLE IF EXISTS customers');
    await connection.query('DROP TABLE IF EXISTS migrations');
    await connection.runMigrations();
  });
  beforeEach(async () => {
    await connection.query('DELETE FROM orders_products');
    await connection.query('DELETE FROM orders');
    await connection.query('DELETE FROM products');
    await connection.query('DELETE FROM customers');
  });
  afterAll(async () => {
    const mainConnection = (0, _typeorm.getConnection)();
    await connection.close();
    await mainConnection.close();
  });
  it('should be able to create a new customer', async () => {
    const response = await (0, _supertest.default)(_app.default).post('/customers').send({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    });
    expect(response.body).toEqual(expect.objectContaining({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    }));
  });
  it('should not be able to create a customer with one e-mail thats already registered', async () => {
    const customer = await (0, _supertest.default)(_app.default).post('/customers').send({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    });
    expect(customer.body).toEqual(expect.objectContaining({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    }));
    const response = await (0, _supertest.default)(_app.default).post('/customers').send({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    });
    expect(response.status).toBe(400);
  });
  it('should be able to create a new product', async () => {
    const response = await (0, _supertest.default)(_app.default).post('/products').send({
      name: 'Produto 01',
      price: 500,
      quantity: 50
    });
    expect(response.body).toEqual(expect.objectContaining({
      name: 'Produto 01',
      price: 500,
      quantity: 50
    }));
  });
  it('should not be able to create a duplicated product', async () => {
    const product = await (0, _supertest.default)(_app.default).post('/products').send({
      name: 'Produto 01',
      price: 500,
      quantity: 50
    });
    expect(product.body).toEqual(expect.objectContaining({
      name: 'Produto 01',
      price: 500,
      quantity: 50
    }));
    const response = await (0, _supertest.default)(_app.default).post('/products').send({
      name: 'Produto 01',
      price: 500,
      quantity: 50
    });
    expect(response.status).toBe(400);
  });
  it('should be able to create a new order', async () => {
    const product = await (0, _supertest.default)(_app.default).post('/products').send({
      name: 'Produto 01',
      price: 500,
      quantity: 50
    });
    const customer = await (0, _supertest.default)(_app.default).post('/customers').send({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    });
    const response = await (0, _supertest.default)(_app.default).post('/orders').send({
      customer_id: customer.body.id,
      products: [{
        id: product.body.id,
        quantity: 5
      }]
    });
    expect(response.body).toEqual(expect.objectContaining({
      customer: expect.objectContaining({
        id: customer.body.id,
        name: 'Rocketseat',
        email: 'oi@rocketseat.com.br'
      }),
      order_products: expect.arrayContaining([expect.objectContaining({
        product_id: product.body.id,
        price: '500.00',
        quantity: 5
      })])
    }));
  });
  it('should not be able to create an order with a invalid customer', async () => {
    const response = await (0, _supertest.default)(_app.default).post('/orders').send({
      customer_id: '6a1922c8-af6e-470e-9a34-621cb0643911'
    });
    expect(response.status).toEqual(400);
  });
  it('should not be able to create an order with invalid products', async () => {
    const customer = await (0, _supertest.default)(_app.default).post('/customers').send({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    });
    const response = await (0, _supertest.default)(_app.default).post('/orders').send({
      customer_id: customer.body.id,
      products: [{
        id: '6a1922c8-af6e-470e-9a34-621cb0643911'
      }]
    });
    expect(response.status).toEqual(400);
  });
  it('should not be able to create an order with products with insufficient quantities', async () => {
    const customer = await (0, _supertest.default)(_app.default).post('/customers').send({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    });
    const product = await (0, _supertest.default)(_app.default).post('/products').send({
      name: 'Produto 01',
      price: 500,
      quantity: 50
    });
    const response = await (0, _supertest.default)(_app.default).post('/orders').send({
      customer_id: customer.body.id,
      products: [{
        id: product.body.id,
        quantity: 500
      }]
    });
    expect(response.status).toEqual(400);
  });
  it('should be able to subtract an product total quantity when it is ordered', async () => {
    const productsRepository = (0, _typeorm.getRepository)(_Product.default);
    const customer = await (0, _supertest.default)(_app.default).post('/customers').send({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    });
    const product = await (0, _supertest.default)(_app.default).post('/products').send({
      name: 'Produto 01',
      price: 500,
      quantity: 50
    });
    await (0, _supertest.default)(_app.default).post('/orders').send({
      customer_id: customer.body.id,
      products: [{
        id: product.body.id,
        quantity: 5
      }]
    });
    let foundProduct = await productsRepository.findOne(product.body.id);
    expect(foundProduct).toEqual(expect.objectContaining({
      quantity: 45
    }));
    await (0, _supertest.default)(_app.default).post('/orders').send({
      customer_id: customer.body.id,
      products: [{
        id: product.body.id,
        quantity: 5
      }]
    });
    foundProduct = await productsRepository.findOne(product.body.id);
    expect(foundProduct).toEqual(expect.objectContaining({
      quantity: 40
    }));
  });
  it('should be able to list one specific order', async () => {
    const customer = await (0, _supertest.default)(_app.default).post('/customers').send({
      name: 'Rocketseat',
      email: 'oi@rocketseat.com.br'
    });
    const product = await (0, _supertest.default)(_app.default).post('/products').send({
      name: 'Produto 01',
      price: 500,
      quantity: 50
    });
    const order = await (0, _supertest.default)(_app.default).post('/orders').send({
      customer_id: customer.body.id,
      products: [{
        id: product.body.id,
        quantity: 5
      }]
    });
    const response = await (0, _supertest.default)(_app.default).get(`/orders/${order.body.id}`);
    expect(response.body).toEqual(expect.objectContaining({
      customer: expect.objectContaining({
        id: customer.body.id,
        name: 'Rocketseat',
        email: 'oi@rocketseat.com.br'
      }),
      order_products: expect.arrayContaining([expect.objectContaining({
        product_id: product.body.id,
        price: '500.00',
        quantity: 5
      })])
    }));
  });
});