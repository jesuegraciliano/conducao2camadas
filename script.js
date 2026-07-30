let layerCount = 0;

function addLayer(L = "", k = "") {
  layerCount++;
  const idx = layerCount;
  const div = document.createElement('div');
  div.className = 'layer-row';
  div.id = 'layer-' + idx;
  div.innerHTML = `
    <div class="layer-idx">${document.querySelectorAll('.layer-row').length + 1}</div>
    <div class="form-group">
      <label>L (mm)</label>
      <input type="number" step="any" class="in-L" value="${L}" placeholder="100">
    </div>
    <div class="form-group">
      <label>k (W/m·K)</label>
      <input type="number" step="any" class="in-k" value="${k}" placeholder="0.04">
    </div>
    <div class="form-group">
      <label>R″ (m²·K/W)</label>
      <input type="text" class="out-R" value="—" readonly style="background:#f1f5f9;color:#475569;">
    </div>
    <button type="button" class="btn-del" onclick="delLayer('${idx}')" title="Remover">×</button>
  `;
  document.getElementById('layers').appendChild(div);
  reindex();
}

function delLayer(id) {
  const el = document.getElementById('layer-' + id);
  if (el) el.remove();
  reindex();
}

function reindex() {
  document.querySelectorAll('.layer-row .layer-idx').forEach((el, i) => el.textContent = i + 1);
}

function toggleSurface() {
  const on = document.getElementById('useSurface').checked;
  document.getElementById('surfaceInputs').style.display = on ? 'grid' : 'none';
  document.getElementById('dtLabel').textContent = on
    ? 'ΔT entre ambientes (°C ou K):'
    : 'ΔT entre faces sólidas (°C ou K):';
}

function calcular() {
  const rows = document.querySelectorAll('.layer-row');
  if (rows.length === 0) { alert("Adicione ao menos uma camada."); return; }

  const A = parseFloat(document.getElementById('area').value);
  const dT = parseFloat(document.getElementById('deltaT').value);
  const useSurface = document.getElementById('useSurface').checked;

  if (isNaN(A) || A <= 0) { alert("Área inválida."); return; }
  if (isNaN(dT) || dT === 0) { alert("ΔT deve ser um número diferente de zero."); return; }

  let R_cond = 0;
  const layerR = [];
  for (const row of rows) {
    const L_mm = parseFloat(row.querySelector('.in-L').value);
    const k = parseFloat(row.querySelector('.in-k').value);
    if (isNaN(L_mm) || L_mm <= 0 || isNaN(k) || k <= 0) {
      alert("Todas as camadas precisam de L > 0 e k > 0."); return;
    }
    const R = (L_mm / 1000) / k;
    layerR.push(R);
    R_cond += R;
    row.querySelector('.out-R').value = R.toFixed(4);
  }

  let Rsi = 0, Rse = 0;
  if (useSurface) {
    const hi = parseFloat(document.getElementById('hi').value);
    const he = parseFloat(document.getElementById('he').value);
    if (isNaN(hi) || hi <= 0 || isNaN(he) || he <= 0) {
      alert("Coeficientes h_i e h_e devem ser > 0 (ou desmarque as películas)."); return;
    }
    Rsi = 1 / hi;
    Rse = 1 / he;
  }

  const R_tot = Rsi + R_cond + Rse;
  const U = 1 / R_tot;
  const Q = U * A * dT;

  let html = '';
  layerR.forEach((R, i) => {
    html += `<div class="result-item sub"><span>R″ camada ${i + 1}</span><span>${R.toFixed(4)} m²·K/W</span></div>`;
  });
  if (useSurface) {
    html = `<div class="result-item sub"><span>R_si (superfície interna)</span><span>${Rsi.toFixed(4)} m²·K/W</span></div>` + html;
    html += `<div class="result-item sub"><span>R_se (superfície externa)</span><span>${Rse.toFixed(4)} m²·K/W</span></div>`;
  }
  html += `<div class="result-item"><span>R″ total</span><span>${R_tot.toFixed(4)} m²·K/W</span></div>`;
  html += `<div class="result-item"><span>Transmitância U</span><span>${U.toFixed(4)} W/m²·K</span></div>`;
  html += `<div class="result-item total"><span>Fluxo de calor Q</span><span>${Q.toFixed(2)} W (${(Q / 1000).toFixed(3)} kW)</span></div>`;

  const out = document.getElementById('output');
  out.innerHTML = html;
  out.classList.remove('hidden');
}

// Estado inicial: exemplo de parede de câmara (concreto + isolante)
document.addEventListener('DOMContentLoaded', function () {
  addLayer(100, 0.7);
  addLayer(50, 0.04);
  toggleSurface();
});
