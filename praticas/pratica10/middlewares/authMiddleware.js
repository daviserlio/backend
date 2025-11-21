const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function verificarToken(req, res, next) {
  try {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Token inválido" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.email;

    next();
  } catch (e) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}

function gerarToken(payload) {
  try {
    const expiresIn = process.env.JWT_EXPIRES;
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch {
    throw "Erro ao gerar o token";
  }
}

function cifrarSenha(senha) {
  const salto = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salto);
  return hash;
}

function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}

module.exports = {
  verificarToken,
  gerarToken,
  cifrarSenha,
  compararSenha
};
