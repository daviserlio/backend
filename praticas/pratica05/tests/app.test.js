const request = require("supertest");
const app = require("../app");

let createdTaskId = null;

const newTarefa = {
  nome: "Estudar Node",
  concluida: false,
};

const updatedTarefa = {
  nome: "Estudar Node e Express",
  concluida: true,
};

describe("GET /tarefas", () => {
  it("deve retornar status 200 e um array JSON", async () => {
    const response = await request(app).get("/tarefas");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /tarefas", () => {
  it("deve retornar status 201 e a tarefa criada em JSON", async () => {
    const response = await request(app).post("/tarefas").send(newTarefa);

    expect(response.statusCode).toBe(201);
    expect(response.type).toBe("application/json");

    expect(response.body).toHaveProperty("id");
    createdTaskId = response.body.id;
  });
});

describe("GET /tarefas/:id", () => {
  it("deve retornar status 200 e a tarefa em JSON (busca pelo id criado)", async () => {
  
    const response = await request(app).get(`/tarefas/${createdTaskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveProperty("id", createdTaskId);
  });

  it("deve retornar status 404 para tarefa não encontrada (id=1)", async () => {
    const response = await request(app).get("/tarefas/1");
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });
});

describe("PUT /tarefas/:id", () => {
  it("deve retornar status 200 e a tarefa atualizada em JSON", async () => {
    const response = await request(app)
      .put(`/tarefas/${createdTaskId}`)
      .send(updatedTarefa);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveProperty("id", createdTaskId);
    expect(response.body).toHaveProperty("concluida", true);
  });

  it("deve retornar status 404 para atualização de tarefa não encontrada (id=1)", async () => {
    const response = await request(app).put("/tarefas/1").send(updatedTarefa);
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });
});

describe("DELETE /tarefas/:id", () => {
  it("deve retornar status 204 e sem conteúdo (remoção bem sucedida)", async () => {
    const response = await request(app).delete(`/tarefas/${createdTaskId}`);
    expect(response.statusCode).toBe(204);
    expect(response.text).toBe("");
  });

  it("deve retornar status 404 para remoção de tarefa não encontrada (id=1)", async () => {
    const response = await request(app).delete("/tarefas/1");
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe("application/json");
  });
});
