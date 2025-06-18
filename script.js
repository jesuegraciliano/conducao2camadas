// Condução em série: Q = U · A · ΔT, com U = 1 / (L1/k1 + L2/k2)
document.getElementById('btn-calcular').addEventListener('click', () => {
  // Leitura dos valores
  const k1 = parseFloat(document.getElementById('material1').value);
  const k2 = parseFloat(document.getElementById('material2').value);
  const L1 = parseFloat(
    document.getElementById('espessura1').value.replace(',', '.')
  );
  const L2 = parseFloat(
    document.getElementById('espessura2').value.replace(',', '.')
  );
  const deltaT = parseFloat(
    document.getElementById('deltaT').value.replace(',', '.')
  );
  const A = parseFloat(
    document.getElementById('area').value.replace(',', '.')
  );

  // Validação
  if ([k1, k2, L1, L2, deltaT, A].some(x => isNaN(x) || x <= 0)) {
    document.getElementById('resultado').textContent =
      'Por favor, preencha todos os campos com valores válidos.';
    return;
  }

  // Resistência térmica equivalente
  const Req = L1 / k1 + L2 / k2;
  // Condutância global
  const U = 1 / Req;
  // Fluxo de calor
  const Q = U * A * deltaT;
  // Formatação brasileira
  const Qbr = Q.toFixed(1).replace('.', ',');

  document.getElementById('resultado').textContent =
    `Q = ${Qbr} W`;
});
