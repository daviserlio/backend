const express = require('express');
const controller = require('../controllers/produtosController');
const router = express.Router();

router.get('/', controller.listar);
router.post('/', controller.criar);
router.get('/:produtoId', controller.buscar);
router.put('/:produtoId', controller.atualizar);
router.delete('/:produtoId', controller.remover);

module.exports = router;
