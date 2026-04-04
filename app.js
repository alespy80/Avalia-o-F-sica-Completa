let selecionadas = new Set();
let condicoesSelecionadas = new Set();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("aluno-data").value = new Date().toISOString().split("T")[0];
  renderTriagem();
  renderObservacoes();
  document.getElementById("btn-avancar").addEventListener("click", irParaPostural);
  document.getElementById("btn-voltar").addEventListener("click", irParaTriagem);
  document.getElementById("btn-avaliar").addEventListener("click", avaliar);
  document.getElementById("btn-limpar").addEventListener("click", limpar);
  document.getElementById("btn-nova").addEventListener("click", novaAvaliacao);
  document.getElementById("btn-editar").addEventListener("click", irParaPostural);
  document.getElementById("btn-imprimir").addEventListener("click", () => window.print());
  document.getElementById("btn-tema").addEventListener("click", toggleTema);
  [1,2,3].forEach(n => {
    const el = document.getElementById("etapa-btn-" + n);
    if (el) el.addEventListener("click", () => irParaEtapa(n));
  });
  // Restaurar tema salvo
  if (localStorage.getItem("ap_tema") === "escuro") aplicarTema("escuro");
});

// â”€â”€ TEMA â”€â”€
function toggleTema() {
  const atual = document.body.classList.contains("tema-escuro") ? "escuro" : "claro";
  const novo  = atual === "escuro" ? "claro" : "escuro";
  aplicarTema(novo);
  localStorage.setItem("ap_tema", novo);
}
function aplicarTema(tema) {
  document.body.classList.toggle("tema-escuro", tema === "escuro");
  const btn = document.getElementById("btn-tema");
  if (btn) btn.textContent = tema === "escuro" ? "â˜€ Modo Claro" : "ðŸŒ™ Modo Escuro";
}

// â”€â”€ NAVEGAÃ‡ÃƒO â”€â”€
function irParaEtapa(n) {
  ["etapa-1","etapa-2","etapa-3"].forEach((id, i) =>
    document.getElementById(id).classList.toggle("oculto", i + 1 !== n)
  );
  [1,2,3].forEach(i => {
    const el = document.getElementById("etapa-btn-" + i);
    if (!el) return;
    el.classList.toggle("ativa",    i === n);
    el.classList.toggle("concluida",i <  n);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function irParaPostural()  { irParaEtapa(2); }
function irParaTriagem()   { irParaEtapa(1); }
function irParaResultado() { irParaEtapa(3); }

// â”€â”€ TRIAGEM â”€â”€
function renderTriagem() {
  const container = document.getElementById("lista-clinica");
  if (!container) return;
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
      card.className = "card-obs card-clinico" + (item.liberacaoMedica ? " requer-medico" : "");
      card.innerHTML =
        '<span class="check-icon">&#10003;</span>' +
        '<div><div class="card-label">' + item.label + '</div>' +
        (item.liberacaoMedica ? '<div class="tag-medico">&#9877; Requer liberacao medica</div>' : '') +
        '</div>';
      card.addEventListener("click", () => toggleClinico(item.id, card));
      grid.appendChild(card);
    });
    grupo.appendChild(grid);
    container.appendChild(grupo);
  });
}
function toggleClinico(id, card) {
  if (condicoesSelecionadas.has(id)) { condicoesSelecionadas.delete(id); card.classList.remove("selecionado"); }
  else { condicoesSelecionadas.add(id); card.classList.add("selecionado"); }
  atualizarContadorClinico();
}
function atualizarContadorClinico() {
  const n = condicoesSelecionadas.size;
  const el = document.getElementById("contador-clinico");
  if (el) el.textContent = n === 0 ? "" : n + " condicao" + (n > 1 ? "oes" : "") + " selecionada" + (n > 1 ? "s" : "");
}

// â”€â”€ OBSERVAÃ‡Ã•ES â”€â”€
function renderObservacoes() {
  const container = document.getElementById("lista-observacoes");
  if (!container) return;
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
      card.innerHTML =
        '<span class="check-icon">&#10003;</span>' +
        '<div><div class="card-label">' + obs.label + '</div>' +
        '<div class="card-desc">' + obs.descricao + '</div></div>';
      card.addEventListener("click", () => toggle(obs.id, card));
      grid.appendChild(card);
    });
    grupo.appendChild(grid);
    container.appendChild(grupo);
  });
}
function toggle(id, card) {
  if (selecionadas.has(id)) { selecionadas.delete(id); card.classList.remove("selecionado"); }
  else { selecionadas.add(id); card.classList.add("selecionado"); }
  atualizarContador();
}
function atualizarContador() {
  const n = selecionadas.size;
  const el = document.getElementById("contador");
  if (el) el.textContent = n === 0 ? "" : n + " achado" + (n > 1 ? "s" : "") + " selecionado" + (n > 1 ? "s" : "");
}

// â”€â”€ AVALIAR â”€â”€
function avaliar() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  const nome  = document.getElementById("aluno-nome").value.trim();
  const idade = document.getElementById("aluno-idade").value;
  const sexo  = document.getElementById("aluno-sexo").value;
  const data  = document.getElementById("aluno-data").value;
  const dataLabel = data ? new Date(data + "T12:00").toLocaleDateString("pt-BR") : "---";
  const sexoLabel = { M:"Masculino", F:"Feminino", O:"Outro" }[sexo] || "---";

  // Cabecalho
  resultado.innerHTML =
    '<div class="cabecalho-resultado">' +
    '<div class="cab-titulo">Relatorio de Avaliacao Postural Biomecanica</div>' +
    '<div class="cab-dados">' +
    '<span>Aluno: ' + (nome || "Nao informado") + '</span>' +
    '<span>Idade: ' + (idade ? idade + " anos" : "---") + '</span>' +
    '<span>Sexo: ' + sexoLabel + '</span>' +
    '<span>Data: ' + dataLabel + '</span>' +
    '</div></div>';

  // Alertas clinicos
  if (condicoesSelecionadas.size > 0) {
    const div = document.createElement("div");
    div.className = "bloco-clinico";
    div.innerHTML = "<h4>Alertas Clinicos</h4>";
    let temLiberacao = false;
    condicoesSelecionadas.forEach(id => {
      const item = condicoesClincias.flatMap(c => c.itens).find(i => i.id === id);
      if (!item) return;
      if (item.liberacaoMedica) temLiberacao = true;
      const bloco = document.createElement("div");
      bloco.className = "alerta-clinico " + (item.liberacaoMedica ? "alerta-critico" : "alerta-atencao");
      bloco.innerHTML =
        '<div class="alerta-titulo">' + (item.liberacaoMedica ? "ATENCAO: " : "Cuidado: ") + item.label + '</div>' +
        '<ul>' + item.alertas.map(a => '<li>' + a + '</li>').join("") + '</ul>';
      div.appendChild(bloco);
    });
    if (temLiberacao) {
      const aviso = document.createElement("div");
      aviso.className = "aviso-liberacao";
      aviso.innerHTML = "Uma ou mais condicoes exigem <strong>liberacao medica</strong> antes de iniciar o protocolo.";
      div.prepend(aviso);
    }
    resultado.appendChild(div);
  }

  // SEM ACHADOS POSTURAIS â€” resultado positivo
  if (selecionadas.size === 0) {
    const ok = document.createElement("div");
    ok.className = "resultado-saudavel";
    ok.innerHTML =
      '<div class="rs-icone">&#10003;</div>' +
      '<div class="rs-titulo">Avaliacao Postural sem Achados Significativos</div>' +
      '<div class="rs-texto">Nenhum desvio postural ou disfuncao de movimento foi identificado nesta avaliacao. O aluno apresenta padrao postural dentro dos limites funcionais esperados.</div>' +
      '<div class="rs-recomendacoes">' +
      '<div class="rs-rec-titulo">Recomendacoes para Manutencao</div>' +
      '<ul>' +
      '<li><strong>Treino de forca:</strong> Manter equilibrio entre grupos musculares antagonistas (empurrar/puxar, anterior/posterior)</li>' +
      '<li><strong>Mobilidade:</strong> Incluir 5-10 min de mobilidade articular no aquecimento de cada sessao</li>' +
      '<li><strong>Core:</strong> Exercicios de estabilizacao lombo-pelvica como parte regular do treino</li>' +
      '<li><strong>Postura no dia a dia:</strong> Orientar sobre ergonomia no trabalho e posicoes de repouso</li>' +
      '<li><strong>Reavaliacao:</strong> Repetir a avaliacao postural a cada 3-6 meses ou apos mudancas significativas no treino</li>' +
      '</ul></div>';
    resultado.appendChild(ok);
    irParaResultado();
    return;
  }

  // COM ACHADOS â€” fluxo normal
  const achados = [...selecionadas].map(id => observacoes.find(o => o.id === id));
  const ids = achados.map(a => a.id);

  const padroes = padroesCombinados.filter(p => p.ids.every(id => ids.includes(id)));
  if (padroes.length) {
    const div = document.createElement("div");
    div.className = "bloco-alertas";
    div.innerHTML = '<h4>Padroes Biomecanicos Identificados</h4><ul>' +
      padroes.map(p => '<li class="alerta-' + p.prioridade + '">' + p.alerta + '</li>').join("") + '</ul>';
    resultado.appendChild(div);
  }

  const inibidosMap = {}, encurtadosMap = {};
  achados.forEach(obs => {
    obs.inibidos.forEach(m => { if (!inibidosMap[m]) inibidosMap[m] = []; inibidosMap[m].push(obs.label); });
    obs.encurtados.forEach(m => { if (!encurtadosMap[m]) encurtadosMap[m] = []; encurtadosMap[m].push(obs.label); });
  });

  const blocoInf = document.createElement("div");
  blocoInf.className = "bloco-inferencias";
  blocoInf.innerHTML =
    '<h4>Musculos Inferidos</h4>' +
    '<div class="inferencias-grid">' +
    '<div class="inf-col inibidos"><strong>Possivelmente Inibidos / Fracos</strong><ul>' +
    Object.keys(inibidosMap).map(m =>
      '<li><span class="musculo">' + m + '</span><span class="origem"> - ' + [...new Set(inibidosMap[m])].join(", ") + '</span></li>'
    ).join("") + '</ul></div>' +
    '<div class="inf-col encurtados"><strong>Possivelmente Encurtados / Hiperativos</strong><ul>' +
    Object.keys(encurtadosMap).map(m =>
      '<li><span class="musculo">' + m + '</span><span class="origem"> - ' + [...new Set(encurtadosMap[m])].join(", ") + '</span></li>'
    ).join("") + '</ul></div>' +
    '</div>';
  resultado.appendChild(blocoInf);

  var fases = [
    { label:"1. Mobilidade e Liberacao", cor:"fase-mobilidade", grupos:Object.keys(encurtadosMap), desc:"Trabalhar mobilidade e liberacao miofascial dos musculos encurtados/hiperativos identificados." },
    { label:"2. Ativacao Neuromuscular", cor:"fase-ativacao", grupos:Object.keys(inibidosMap), desc:"Ativacao isolada e controlada dos musculos inibidos antes de qualquer exercicio global." },
    { label:"3. Propriocepcao e Controle Motor", cor:"fase-propriocepcao", grupos:Object.keys(inibidosMap), desc:"Exercicios de equilibrio e controle motor para integrar os musculos reativados." },
    { label:"4. Fortalecimento", cor:"fase-forca", grupos:Object.keys(inibidosMap), desc:"Fortalecimento progressivo dos grupos musculares inibidos apos as fases anteriores consolidadas." }
  ];
  fases.forEach(function(fase) {
    if (!fase.grupos.length) return;
    var secao = document.createElement("div");
    secao.className = "secao-treino " + fase.cor;
    secao.innerHTML =
      '<h4>' + fase.label + '</h4>' +
      '<p class="fase-descricao">' + fase.desc + '</p>' +
      '<div class="grupos-alvo"><span class="grupos-label">Grupos-alvo:</span>' +
      fase.grupos.map(g => '<span class="tag-musculo">' + g + '</span>').join("") + '</div>';
    resultado.appendChild(secao);
  });

  irParaResultado();
}

function limpar() {
  selecionadas.clear();
  document.querySelectorAll(".card-obs.selecionado").forEach(c => c.classList.remove("selecionado"));
  atualizarContador();
}

function novaAvaliacao() {
  selecionadas.clear();
  condicoesSelecionadas.clear();
  document.querySelectorAll(".card-obs.selecionado,.card-clinico.selecionado").forEach(c => c.classList.remove("selecionado"));
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("aluno-nome").value = "";
  document.getElementById("aluno-idade").value = "";
  document.getElementById("aluno-sexo").value = "";
  document.getElementById("aluno-data").value = new Date().toISOString().split("T")[0];
  atualizarContador();
  atualizarContadorClinico();
  irParaEtapa(1);
}
// â”€â”€ CAPA â”€â”€
function iniciarApp() {
  var capa = document.getElementById("capa");
  var app  = document.getElementById("app-wrap");
  capa.style.opacity = "0";
  capa.style.transition = "opacity 0.5s ease";
  setTimeout(function() {
    capa.style.display = "none";
    app.style.display = "block";
  }, 500);
}