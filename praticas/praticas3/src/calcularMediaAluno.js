function calcularMediaAluno(a1, a2, a3) {
    if (a1 === undefined || a2 === undefined) {
      throw new Error('Notas a1 ou a2 não informadas');
    }
    if (a1 < 0 || a2 < 0) {
      throw new Error('Notas a1 ou a2 não podem ser negativas');
    }
    if (a3 !== undefined && a3 < 0) {
      throw new Error('Nota a3 não pode ser negativa');
    }
  
    const base = a1 * 0.4 + a2 * 0.6;
  
    if (a3 === undefined) {
      return base;
    }
  
    const comboA = a1 * 0.4 + a3 * 0.6; // substitui a2 por a3
    const comboB = a3 * 0.4 + a2 * 0.6; // substitui a1 por a3
  
    return Math.max(base, comboA, comboB);
  }
  
  module.exports = { calcularMediaAluno };
  