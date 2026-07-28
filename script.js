document.getElementById('btn-calcular').addEventListener('click', function() {
    // Função auxiliar para substituir vírgula por ponto e converter para float
    function parseValor(id) {
        let valorStr = document.getElementById(id).value.trim().replace(',', '.');
        return parseFloat(valorStr);
    }

    const k1 = parseValor('k1');
    const L1 = parseValor('espessura1');
    const k2 = parseValor('k2');
    const L2 = parseValor('espessura2');
    const deltaT = parseValores('deltaT'); // Ajuste conforme sua função original
    const area = parseValor('area');
    const deltaTVal = parseValor('deltaT');

    const resultadoDiv = document.getElementById('resultado');

    // Validação básica
    if (isNaN(k1) || isNaN(L1) || isNaN(k2) || isNaN(L2) || isNaN(deltaTVal) || isNaN(area)) {
        resultadoDiv.innerHTML = "<p style='color: red;'>Por favor, preencha todos os campos corretamente com valores numéricos.</p>";
        return;
    }

    // Cálculo da resistência térmica equivalente (R_tot = (L1/k1 + L2/k2) / A)
    // Ou fluxo de calor Q = ΔT / R_tot = (ΔT * A) / ((L1 / k1) + (L2 / k2))
    const resistencia1 = L1 / k1;
    const resistencia2 = L2 / k2;
    const resistenciaTotal = resistencia1 + resistencia2;

    const Q = (deltaTVal * area) / resistenciaTotal;

    // Exibição do resultado
    resultadoDiv.innerHTML = `
        <h3>Resultado:</h3>
        <p>Fluxo de Calor (Q): <strong>${Q.toFixed(2)} W</strong></p>
    `;
});
