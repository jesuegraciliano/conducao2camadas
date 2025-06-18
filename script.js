// Cálculo com duas camadas em série: Q = U · A · ΔT, onde U = 1 / Requivalente
// Requivalente = L1/k1 + L2/k2
document.getElementById('btn-calcular').addEventListener('click', () => {
  // Obter condutividades
  const k1 = parseFloat(document.getElementById('material1').value);
  const k2 = parseFloat(document.getElementById('material2').value);
  // Espessuras (substitui vírgula por ponto)
  const L1 = parseFloat(document.getElementById('espessura1').value.replace(',', '.'));
  const L2 = parseFloat(document.getElementById('espessura2').value.replace(',', '.'));
  // Delta T e área
  const deltaT = parseFloat(document.getElementById('deltaT').value.replace(',', '.'));
  const A = parseFloat(document.getElementById('area').value.replace(',', '.'));

  // Validação básica
  if ([k1, k2, L1, L2, deltaT, A].some(x => isNaN(x) || x <= 0)) {
    document.getElementById('resultado').textContent = 'Preencha todos os campos com valores válidos.';
    return;
  }

  // Resistência térmica equivalente
  const Req = L1 / k1 + L2 / k2;
  // Condutância global U
  const U = 1 / Req;
  // Fluxo de calor Q
  const Q = U * A * deltaT;
  // Formatação brasileira com 1 casa decimal
  const Qformat = Q.toFixed(1).replace('.', ',');

  document.getElementById('resultado').textContent = `Q = ${Qformat} W`;
});
