const tarefas = [];

function listar() {
  return tarefas;
}

function buscarPeloId(tarefaId) {
  return tarefas.find((t) => t.id === tarefaId) || null;
}

function criar(tarefa) {
  const novaTarefa = {
    id: Math.random().toString(36).substring(2, 6),
    ...tarefa,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function atualizar(tarefaAtualizada) {
  const index = tarefas.findIndex((t) => t.id === tarefaAtualizada.id);

  if (index === -1) {
    return null;
  }

  tarefas[index] = { ...tarefas[index], ...tarefaAtualizada };
  return tarefas[index];
}

function remover(tarefaId) {
  const index = tarefas.findIndex((t) => t.id === tarefaId);

  if (index === -1) {
    return null;
  }

  const [tarefaRemovida] = tarefas.splice(index, 1);
  return tarefaRemovida;
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover,
};
