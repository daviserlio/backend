const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let produtoId;

describe('Testes para o recurso /produtos', () => {

  test('POST /produtos deve retornar 201 e criar um novo produto', async () => {
    const novoProduto = { nome: 'Laranja', preco: 10.0 };
    const response = await request.post('/produtos')
      .send(novoProduto)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja');
    expect(response.body.preco).toBe(10.0);

    produtoId = response.body._id;
  });

  test('POST /produtos sem corpo deve retornar 422', async () => {
    const response = await request.post('/produtos')
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('GET /produtos deve retornar 200 e uma lista de produtos', async () => {
    const response = await request.get('/produtos')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /produtos/:id deve retornar 200 e o produto correto', async () => {
    const response = await request.get(`/produtos/${produtoId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);
  });

  test('GET /produtos/0 deve retornar 400 por ID inválido', async () => {
    const response = await request.get('/produtos/0')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('GET /produtos/000000000000000000000000 deve retornar 404', async () => {
    const response = await request.get('/produtos/000000000000000000000000')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('PUT /produtos/:id deve retornar 200 e o produto atualizado', async () => {
    const dadosAtualizados = { nome: 'Laranja Pera', preco: 18.00 };
    const response = await request.put(`/produtos/${produtoId}`)
      .send(dadosAtualizados)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Laranja Pera');
    expect(response.body).toHaveProperty('preco', 18.00);
  });

  test('PUT /produtos/:id sem corpo deve retornar 422', async () => {
    const response = await request.put(`/produtos/${produtoId}`)
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('PUT /produtos/0 deve retornar 400 por ID inválido', async () => {
    const response = await request.put('/produtos/0')
      .send({ nome: 'Teste', preco: 1 })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('PUT /produtos/000000000000000000000000 deve retornar 404', async () => {
    const response = await request.put('/produtos/000000000000000000000000')
      .send({ nome: 'Teste', preco: 1 })
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('DELETE /produtos/:id deve retornar 204 e remover o produto', async () => {
    await request.delete(`/produtos/${produtoId}`)
      .expect(204);

    await request.get(`/produtos/${produtoId}`)
        .expect(404);
  });

  test('DELETE /produtos/0 deve retornar 400 por ID inválido', async () => {
    const response = await request.delete('/produtos/0')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('DELETE /produtos/:id para produto já removido deve retornar 404', async () => {
    const response = await request.delete(`/produtos/${produtoId}`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });
});