const request = require('supertest');
const app = require('../app');

let produtoId;

describe('/produtos API', () => {
  
  test('POST /produtos - sucesso', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({ nome: 'Laranja', preco: 10.0 });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe('Laranja');
    expect(res.body.preco).toBe(10.0);

    produtoId = res.body._id;
  });

  test('POST /produtos - erro', async () => {
    const res = await request(app).post('/produtos').send({});
    expect(res.statusCode).toBe(422);
    expect(res.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  
  test('GET /produtos', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

 
  test('GET /produtos/:id - sucesso', async () => {
    const res = await request(app).get(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', produtoId);
  });

  test('GET /produtos/:id - parâmetro inválido', async () => {
    const res = await request(app).get('/produtos/0');
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('Parâmetro inválido');
  });

  test('GET /produtos/:id - não encontrado', async () => {
    const res = await request(app).get('/produtos/000000000000000000000000');
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Produto não encontrado');
  });

  
  test('PUT /produtos/:id - sucesso', async () => {
    const res = await request(app)
      .put(`/produtos/${produtoId}`)
      .send({ nome: 'Laranja Pera', preco: 18.0 });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Laranja Pera');
    expect(res.body.preco).toBe(18.0);
  });

  test('PUT /produtos/:id - erro', async () => {
    const res = await request(app).put(`/produtos/${produtoId}`).send({});
    expect(res.statusCode).toBe(422);
    expect(res.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });


  test('DELETE /produtos/:id - sucesso', async () => {
    const res = await request(app).delete(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /produtos/:id - parâmetro inválido', async () => {
    const res = await request(app).delete('/produtos/0');
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('Parâmetro inválido');
  });
});
