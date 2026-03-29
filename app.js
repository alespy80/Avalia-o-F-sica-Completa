let selecionadas = new Set();
let condicoesSelecionadas = new Set();

// ── INIT ──
function init() {
  document.getElementById("aluno-data").value = new Date().toISOString().split("T")[0];

  renderTriagem();
  renderObservacoes();

  document.getElementById("btn-avancar").addEventListener("click", irParaPostural);
  document.getElementById("btn-voltar").addEventListener("click", irParaTriagem);
  document.getElementById("btn-avaliar").addEventListener("click", avaliar);
  document.getElementById("btn-limpar").addEventListener("click", limpar);
  document.getElementById("btn-nova").addEventListener("click", novaAvaliacao);
  document.getElementById("btn-editar").addEventListener("click", irParaPostural);
  document.getElementById("btn-imprimir").addEventListener("click", imprimir);

  // Etapas clicáveis
  document.getElementById("etapa-btn-1").addEventListener("click", () => irParaEtapa(1));
  document.getElementById("etapa-btn-2").addEventListener("click", () => irParaEtapa(2));
  document.getElementById("etapa-btn-3").addEventListener("click", () => irParaEtapa(3));
}

// ── NAVEGAÇÃO ──
function irParaEtapa(n) {
  mostrar(`etapa-${n}`);
  setEtapaAtiva(n);
}
function irParaPostural() { irParaEtapa(2); }
function irParaTriagem()  { irParaEtapa(1); }
function irParaResultado(){ irParaEtapa(3); }

function mostrar(id) {
  ["etapa-1","etapa-2","etapa-3"].forEach(e =>
    document.getElementById(e).classList.toggle("oculto", e !== id)
  );
}
function setEtapaAtiva(n) {
  [1,2,3].forEach(i => {
    const el = document.getElementById(`etapa-btn-${i}`);
    el.classList.toggle("ativa", i === n);
    el.classList.toggle("concluida", i < n);
    el.style.cursor = i <= n ? "pointer" : "default";
  });
}

// ── ETAPA 1: TRIAGEM CLÍNICA ──
function renderTriagem() {
  const container = document.getElementById("lista-clinica");
  condicoesClincias.forEach(cat => {
    const grupo = document.createElement("div");
    grupo.className = "grupo-vista";

    const titulo = document.createElement("h3");
    titulo.textContent = cat.categoria;
    grupo.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "grid-cards";

    cat.itens.forEach(item => {
      const card = document.createElement("div");
      card.className = "card-obs card-clinico";
      if (item.liberacaoMedica) card.classList.add("requer-medico");
      card.dataset.id = item.id;
      card.innerHTML = `
        <span class="check-icon">✓</span>
        <div>
          <div class="card-label">${item.label}</div>
          ${item.liberacaoMedica ? '<div class="tag-medico">⚕ Requer liberação médica</div>' : ''}
        </div>
      `;
      card.addEventListener("click", () => toggleClinico(item.id, card));
      grid.appendChild(card);
    });

    grupo.appendChild(grid);
    container.appendChild(grupo);
  });
}

function toggleClinico(id, card) {
  if (condicoesSelecionadas.has(id)) {
    condicoesSelecionadas.delete(id);
    card.classList.remove("selecionado");
  } else {
    condicoesSelecionadas.add(id);
    card.classList.add("selecionado");
  }
  atualizarContadorClinico();
}

function atualizarContadorClinico() {
  const n = condicoesSelecionadas.size;
  document.getElementById("contador-clinico").textContent =
    n === 0 ? "" : `${n} condição${n > 1 ? "ões" : ""} selecionada${n > 1 ? "s" : ""}`;
}

// ── ETAPA 2: AVALIAÇÃO POSTURAL ──
function renderObservacoes() {
  const container = document.getElementById("lista-observacoes");
  const vistas = [...new Set(observacoes.map(o => o.vista))];

  vistas.forEach(vista => {
    const grupo = document.createElement("div");
    grupo.className = "grupo-vista";

    const titulo = document.createElement("h3");
    titulo.textContent = vista;
    grupo.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "grid-cards";

    observacoes.filter(o => o.vista === vista).forEach(obs => {
      const card = document.createElement("div");
      card.className = "card-obs";
      card.dataset.id = obs.id;
      card.innerHTML = `
        <span class="check-icon">✓</span>
        <div>
          <div class="card-label">${obs.label}</div>
          <div class="card-desc">${obs.descricao}</div>
        </div>
      `;
      card.addEventListener("click", () => toggle(obs.id, card));
      grid.appendChild(card);
    });

    grupo.appendChild(grid);
    container.appendChild(grupo);
  });
}

function toggle(id, card) {
  if (selecionadas.has(id)) {
    selecionadas.delete(id);
    card.classList.remove("selecionado");
  } else {
    selecionadas.add(id);
    card.classList.add("selecionado");
  }
  atualizarContador();
}

function atualizarContador() {
  const n = selecionadas.size;
  document.getElementById("contador").textContent =
    n === 0 ? "" : `${n} achado${n > 1 ? "s" : ""} selecionado${n > 1 ? "s" : ""}`;
}

// ── ETAPA 3: RESULTADO ──
function avaliar() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  // Cabeçalho com dados do aluno
  const nome  = document.getElementById("aluno-nome").value.trim();
  const idade = document.getElementById("aluno-idade").value;
  const sexo  = document.getElementById("aluno-sexo").value;
  const data  = document.getElementById("aluno-data").value;
  const sexoLabel = { M:"Masculino", F:"Feminino", O:"Outro" }[sexo] || "—";
  const dataLabel = data ? new Date(data + "T12:00:00").toLocaleDateString("pt-BR") : "—";

  const cabecalho = document.createElement("div");
  cabecalho.className = "cabecalho-resultado";
  cabecalho.innerHTML = `
    <div class="cab-titulo">Relatório de Avaliação</div>
    <div class="cab-dados">
      <span><strong>Aluno:</strong> ${nome || "Não informado"}</span>
      <span><strong>Idade:</strong> ${idade ? idade + " anos" : "—"}</span>
      <span><strong>Sexo:</strong> ${sexoLabel}</span>
      <span><strong>Data:</strong> ${dataLabel}</span>
    </div>
  `;
  resultado.appendChild(cabecalho);

  // Alertas clínicos
  if (condicoesSelecionadas.size > 0) {
    const div = document.createElement("div");
    div.className = "bloco-clinico";
    div.innerHTML = "<h4>⚕ Alertas Clínicos</h4>";
    let temLiberacao = false;

    condicoesSelecionadas.forEach(id => {
      const item = condicoesClincias.flatMap(c => c.itens).find(i => i.id === id);
      if (!item) return;
      if (item.liberacaoMedica) temLiberacao = true;
      const bloco = document.createElement("div");
      bloco.className = `alerta-clinico ${item.liberacaoMedica ? "alerta-critico" : "alerta-atencao"}`;
      bloco.innerHTML = `
        <div class="alerta-titulo">${item.liberacaoMedica ? "🚨" : "⚠️"} ${item.label}</div>
        <ul>${item.alertas.map(a => `<li>${a}</li>`).join("")}</ul>
      `;
      div.appendChild(bloco);
    });

    if (temLiberacao) {
      const aviso = document.createElement("div");
      aviso.className = "aviso-liberacao";
      aviso.innerHTML = "🚨 Uma ou mais condições exigem <strong>liberação médica</strong> antes de iniciar o protocolo de treino.";
      div.prepend(aviso);
    }
    resultado.appendChild(div);
  }

  if (selecionadas.size === 0) {
    resultado.appendChild(Object.assign(document.createElement("div"), {
      className: "instrucao",
      textContent: "Nenhum achado postural selecionado."
    }));
    irParaResultado();
    return;
  }

  const achados = [...selecionadas].map(id => observacoes.find(o => o.id === id));
  const ids = achados.map(a => a.id);

  // Padrões biomecânicos
  const padroes = padroesCombinados.filter(p => p.ids.every(id => ids.includes(id)));
  if (padroes.length > 0) {
    const div = document.createElement("div");
    div.className = "bloco-alertas";
    div.innerHTML = `<h4>⚠️ Padrões Biomecânicos Identificados</h4><ul>${
      padroes.map(p => `<li class="alerta-${p.prioridade}">${p.alerta}</li>`).join("")
    }</ul>`;
    resultado.appendChild(div);
  }

  // Inferências musculares
  const inibidosMap = {}, encurtadosMap = {};
  achados.forEach(obs => {
    obs.inibidos.forEach(m => { if (!inibidosMap[m]) inibidosMap[m] = []; inibidosMap[m].push(obs.label); });
    obs.encurtados.forEach(m => { if (!encurtadosMap[m]) encurtadosMap[m] = []; encurtadosMap[m].push(obs.label); });
  });

  const blocoInf = document.createElement("div");
  blocoInf.className = "bloco-inferencias";
  blocoInf.innerHTML = `
    <h4>🔍 Músculos Inferidos</h4>
    <div class="inferencias-grid">
      <div class="inf-col inibidos">
        <strong>Possivelmente Inibidos / Fracos</strong>
        <ul>${Object.keys(inibidosMap).map(m =>
          `<li><span class="musculo">${m}</span><span class="origem"> — ${[...new Set(inibidosMap[m])].join(", ")}</span></li>`
        ).join("")}</ul>
      </div>
      <div class="inf-col encurtados">
        <strong>Possivelmente Encurtados / Hiperativos</strong>
        <ul>${Object.keys(encurtadosMap).map(m =>
          `<li><span class="musculo">${m}</span><span class="origem"> — ${[...new Set(encurtadosMap[m])].join(", ")}</span></li>`
        ).join("")}</ul>
      </div>
    </div>
  `;
  resultado.appendChild(blocoInf);

  // Sugestões por fase
  [
    { label:"1. Mobilidade e Liberação", cor:"fase-mobilidade", grupos:Object.keys(encurtadosMap),
      descricao:"Trabalhar mobilidade e liberação miofascial dos músculos encurtados/hiperativos identificados." },
    { label:"2. Ativação Neuromuscular", cor:"fase-ativacao", grupos:Object.keys(inibidosMap),
      descricao:"Ativação isolada e controlada dos músculos inibidos antes de qualquer exercício global." },
    { label:"3. Propriocepção e Controle Motor", cor:"fase-propriocepcao", grupos:Object.keys(inibidosMap),
      descricao:"Exercícios de equilíbrio e controle motor para integrar os músculos reativados em padrões funcionais." },
    { label:"4. Fortalecimento", cor:"fase-forca", grupos:Object.keys(inibidosMap),
      descricao:"Fortalecimento progressivo dos grupos musculares inibidos após as fases anteriores estarem consolidadas." }
  ].forEach(fase => {
    if (!fase.grupos.length) return;
    const secao = document.createElement("div");
    secao.className = `secao-treino ${fase.cor}`;
    secao.innerHTML = `
      <h4>${fase.label}</h4>
      <p class="fase-descricao">${fase.descricao}</p>
      <div class="grupos-alvo">
        <span class="grupos-label">Grupos-alvo:</span>
        ${fase.grupos.map(g => `<span class="tag-musculo">${g}</span>`).join("")}
      </div>
    `;
    resultado.appendChild(secao);
  });

  irParaResultado();
}

// ── IMPRIMIR ──
function imprimir() { window.print(); }

// ── LIMPAR / NOVA AVALIAÇÃO ──
function limpar() {
  selecionadas.clear();
  document.querySelectorAll(".card-obs.selecionado").forEach(c => c.classList.remove("selecionado"));
  atualizarContador();
}

function novaAvaliacao() {
  selecionadas.clear();
  condicoesSelecionadas.clear();
  document.querySelectorAll(".card-obs.selecionado, .card-clinico.selecionado")
    .forEach(c => c.classList.remove("selecionado"));
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("aluno-nome").value = "";
  document.getElementById("aluno-idade").value = "";
  document.getElementById("aluno-sexo").value = "";
  document.getElementById("aluno-data").value = new Date().toISOString().split("T")[0];
  atualizarContador();
  atualizarContadorClinico();
  irParaEtapa(1);
}

document.addEventListener("DOMContentLoaded", init);
