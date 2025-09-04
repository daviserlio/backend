const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('com a3 informada, melhor combinação pode ser a1 com a3', () => {
    // base = 9*0.4 + 1*0.6 = 4.2
    // a1+a3 = 9*0.4 + 10*0.6 = 9.6  (melhor)
    // a3+a2 = 10*0.4 + 1*0.6 = 4.6
    const resultado = calcularMediaAluno(9, 1, 10);
    expect(resultado).toBeCloseTo(9.6, 5);
  });
  
  test('com a3 informada, melhor combinação pode ser a3 com a2', () => {
    // base = 1*0.4 + 9*0.6 = 5.8
    // a1+a3 = 1*0.4 + 10*0.6 = 6.4
    // a3+a2 = 10*0.4 + 9*0.6 = 9.4  (melhor)
    const resultado = calcularMediaAluno(1, 9, 10);
    expect(resultado).toBeCloseTo(9.4, 5);
  });