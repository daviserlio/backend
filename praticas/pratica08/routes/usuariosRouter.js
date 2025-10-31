const express = require('express');
const { verificarToken, gerarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario && senha) {
    const token = gerarToken({ email: usuario });
    return res.status(200).json({ token });
  }

  return res.status(400).json({ msg: 'Usuário ou senha inválidos' });
});

router.post('/renovar', verificarToken, (req, res) => {
  const novoToken = gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token: novoToken });
});

module.exports = router;
