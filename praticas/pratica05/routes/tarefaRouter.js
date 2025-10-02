const express = require("express");
const router = express.Router();

const tarefaController = require("../controllers/tarefaController");

router.get("/", tarefaController.listar);

router.post("/", tarefaController.criar);

router.get("/:tarefaId", tarefaController.buscarPeloId);

router.put("/:tarefaId", tarefaController.atualizar);

router.delete("/:tarefaId", tarefaController.remover);

module.exports = router;
