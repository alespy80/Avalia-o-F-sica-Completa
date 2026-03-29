const observacoes = [
  { id:"joelho_valgo", label:"Joelhos em valgo (X)", vista:"Anterior", regiao:"Membros Inferiores",
    descricao:"Joelhos colapsam medialmente em relação ao eixo do pé",
    inibidos:["Glúteo Médio","Glúteo Máximo","Vasto Medial"],
    encurtados:["Adutores","TFL","Gastrocnêmio"], padrao:"Síndrome de Dominância do Joelho" },
  { id:"joelho_varo", label:"Joelhos em varo (O)", vista:"Anterior", regiao:"Membros Inferiores",
    descricao:"Joelhos afastados com pés juntos",
    inibidos:["Adutores do Quadril","Vasto Medial"],
    encurtados:["TFL","Bíceps Femoral"], padrao:null },
  { id:"pe_plano", label:"Pé plano / pronação excessiva", vista:"Anterior", regiao:"Pé e Tornozelo",
    descricao:"Arco medial colapsado, tornozelo em valgo",
    inibidos:["Tibial Posterior","Intrínsecos do Pé"],
    encurtados:["Gastrocnêmio","Sóleo"], padrao:null },
  { id:"pe_cavo", label:"Pé cavo / supinação excessiva", vista:"Anterior", regiao:"Pé e Tornozelo",
    descricao:"Arco medial elevado, carga na borda lateral",
    inibidos:["Fibulares (Perôneos)","Intrínsecos do Pé"],
    encurtados:["Tibial Posterior","Tríceps Sural"], padrao:null },
  { id:"rotacao_tibial", label:"Rotação tibial externa excessiva", vista:"Anterior", regiao:"Membros Inferiores",
    descricao:"Pés muito abertos em repouso (acima de 15°)",
    inibidos:["Rotadores Internos do Quadril","Tibial Anterior"],
    encurtados:["TFL","Bíceps Femoral"], padrao:null },
  { id:"ombros_assimetricos", label:"Ombros assimétricos (um mais alto)", vista:"Anterior", regiao:"Ombros / Escápula",
    descricao:"Diferença de altura entre ombros em repouso",
    inibidos:["Trapézio Inferior","Serrátil Anterior"],
    encurtados:["Trapézio Superior","Escalenos"], padrao:null },
  { id:"hiperlordose", label:"Hiperlordose lombar", vista:"Lateral", regiao:"Coluna",
    descricao:"Curvatura lombar excessiva, pelve em anteversão",
    inibidos:["Glúteo Máximo","Transverso Abdominal","Isquiotibiais"],
    encurtados:["Iliopsoas","Reto Femoral","Eretor da Espinha Lombar"], padrao:"Síndrome Cruzada Inferior (Janda)" },
  { id:"hipercifose", label:"Hipercifose torácica", vista:"Lateral", regiao:"Coluna",
    descricao:"Curvatura torácica excessiva, tronco em flexão",
    inibidos:["Romboides","Trapézio Médio e Inferior","Extensores Torácicos"],
    encurtados:["Peitoral Maior","Peitoral Menor"], padrao:"Síndrome Cruzada Superior (Janda)" },
  { id:"cabeca_anteriorizada", label:"Cabeça anteriorizada", vista:"Lateral", regiao:"Cervical",
    descricao:"Orelha à frente do acrômio na vista lateral",
    inibidos:["Flexores Profundos Cervicais","Trapézio Inferior"],
    encurtados:["Esternocleidomastoideo","Escalenos","Suboccipitais"], padrao:"Síndrome Cruzada Superior (Janda)" },
  { id:"ombros_protusos", label:"Ombros protusos (anteriorização)", vista:"Lateral", regiao:"Ombros / Escápula",
    descricao:"Ombros à frente do eixo gravitacional",
    inibidos:["Romboides","Trapézio Médio e Inferior","Rotadores Externos do Ombro"],
    encurtados:["Peitoral Menor","Peitoral Maior"], padrao:"Síndrome Cruzada Superior (Janda)" },
  { id:"joelho_recurvatum", label:"Joelho hiperextendido (recurvatum)", vista:"Lateral", regiao:"Membros Inferiores",
    descricao:"Joelho em extensão além do neutro em apoio",
    inibidos:["Isquiotibiais","Gastrocnêmio"],
    encurtados:["Reto Femoral"], padrao:null },
  { id:"antepulsao_pelvica", label:"Antepulsão pélvica", vista:"Lateral", regiao:"Quadril / Pelve",
    descricao:"Pelve deslocada anteriormente ao eixo gravitacional",
    inibidos:["Glúteo Máximo","Isquiotibiais","Transverso Abdominal"],
    encurtados:["Iliopsoas","Reto Femoral","TFL"], padrao:"Síndrome Cruzada Inferior (Janda)" },
  { id:"escapula_alada", label:"Escápula alada", vista:"Posterior", regiao:"Ombros / Escápula",
    descricao:"Borda medial da escápula se afasta do gradil costal",
    inibidos:["Serrátil Anterior","Trapézio Inferior"],
    encurtados:["Peitoral Menor"], padrao:null },
  { id:"escoliose", label:"Escoliose / desvio lateral da coluna", vista:"Posterior", regiao:"Coluna",
    descricao:"Curvatura lateral visível na coluna",
    inibidos:["Multífidos"],
    encurtados:["Quadrado Lombar"], padrao:null },
  { id:"pelve_inclinada", label:"Pelve inclinada lateralmente", vista:"Posterior", regiao:"Quadril / Pelve",
    descricao:"Uma crista ilíaca mais alta que a outra",
    inibidos:["Glúteo Médio"],
    encurtados:["Quadrado Lombar","TFL"], padrao:null },
  { id:"agachamento_valgo", label:"Valgo dinâmico no agachamento", vista:"Teste Funcional", regiao:"Membros Inferiores",
    descricao:"Joelhos colapsam para dentro ao agachar",
    inibidos:["Glúteo Médio","Glúteo Máximo","Vasto Medial"],
    encurtados:["Adutores","TFL","Gastrocnêmio"], padrao:"Síndrome de Dominância do Joelho" },
  { id:"agachamento_tronco", label:"Tronco cai no agachamento", vista:"Teste Funcional", regiao:"Coluna / Quadril",
    descricao:"Inclinação excessiva do tronco para frente ao agachar",
    inibidos:["Glúteo Máximo","Extensores Torácicos","Tibial Anterior"],
    encurtados:["Sóleo","Gastrocnêmio","Iliopsoas"], padrao:null },
  { id:"trendelenburg", label:"Sinal de Trendelenburg", vista:"Teste Funcional", regiao:"Quadril / Pelve",
    descricao:"Pelve cai para o lado da perna elevada no apoio unipodal",
    inibidos:["Glúteo Médio","Glúteo Mínimo"],
    encurtados:["Quadrado Lombar","Adutores"], padrao:"Fraqueza de Glúteo Médio" },
  { id:"thomas_positivo", label:"Teste de Thomas positivo", vista:"Teste Funcional", regiao:"Quadril / Pelve",
    descricao:"Perna sobe da maca ao soltar — encurtamento de iliopsoas ou reto femoral",
    inibidos:["Glúteo Máximo","Isquiotibiais"],
    encurtados:["Iliopsoas","Reto Femoral","TFL"], padrao:"Síndrome Cruzada Inferior (Janda)" },
  { id:"overhead_arms_fall", label:"Braços caem no agachamento overhead", vista:"Teste Funcional", regiao:"Ombros / Coluna",
    descricao:"Braços não mantêm posição vertical acima da cabeça",
    inibidos:["Trapézio Inferior","Serrátil Anterior","Rotadores Externos do Ombro"],
    encurtados:["Peitoral Menor","Grande Dorsal"], padrao:"Síndrome Cruzada Superior (Janda)" }
];

const padroesCombinados = [
  { ids:["joelho_valgo","pe_plano"], prioridade:"alta",
    alerta:"Cadeia de Pronação: pé plano + joelho valgo indicam colapso em cadeia cinética fechada. Corrigir o pé é pré-requisito antes de trabalhar o joelho." },
  { ids:["joelho_valgo","trendelenburg"], prioridade:"alta",
    alerta:"Colapso Medial por Fraqueza de Glúteo Médio: valgo + Trendelenburg confirmam insuficiência do glúteo médio. Ativação isolada antes de qualquer exercício de cadeia fechada." },
  { ids:["joelho_valgo","agachamento_valgo"], prioridade:"alta",
    alerta:"Valgo Estático e Dinâmico Confirmados: padrão presente em repouso e no movimento. Prioridade máxima em ativação de glúteo médio e VMO." },
  { ids:["hiperlordose","thomas_positivo"], prioridade:"alta",
    alerta:"Síndrome Cruzada Inferior Confirmada (Janda): hiperlordose + Thomas positivo confirmam encurtamento de iliopsoas e inibição de glúteo. Mobilizar iliopsoas e ativar core antes de qualquer carga." },
  { ids:["hiperlordose","antepulsao_pelvica"], prioridade:"alta",
    alerta:"Anteversão Pélvica Acentuada: hiperlordose + antepulsão indicam dominância de flexores do quadril. Trabalhar retroversão pélvica ativa antes de exercícios de força." },
  { ids:["hipercifose","ombros_protusos"], prioridade:"alta",
    alerta:"Síndrome Cruzada Superior (Janda): cifose + ombros protusos. Mobilização torácica é pré-requisito absoluto antes de fortalecer a cadeia posterior." },
  { ids:["hipercifose","cabeca_anteriorizada"], prioridade:"alta",
    alerta:"Padrão de Flexão Global: cifose + cabeça anteriorizada. A cervical compensa a torácica — extensão torácica deve ser trabalhada primeiro." },
  { ids:["escapula_alada","ombros_protusos"], prioridade:"alta",
    alerta:"Disfunção Escapulotorácica Combinada: escápula alada + ombros protusos. Serrátil anterior é prioridade máxima — sem ele qualquer exercício de empurrar agrava o quadro." },
  { ids:["agachamento_valgo","trendelenburg"], prioridade:"alta",
    alerta:"Insuficiência de Glúteo Médio Confirmada por Dois Testes: protocolo deve iniciar exclusivamente com ativação isolada de glúteo médio." },
  { ids:["joelho_recurvatum","hiperlordose"], prioridade:"media",
    alerta:"Padrão de Extensão Global: recurvatum + hiperlordose sugerem dominância de extensores e inibição de isquiotibiais + abdominais. Trabalhar co-ativação antes de exercícios de força." },
  { ids:["pelve_inclinada","escoliose"], prioridade:"alta",
    alerta:"Desequilíbrio Pélvico-Espinhal: pelve inclinada + escoliose podem ter relação causal. Avaliar discrepância de membros inferiores antes de iniciar protocolo." },
  { ids:["cabeca_anteriorizada","overhead_arms_fall"], prioridade:"media",
    alerta:"Disfunção de Cadeia Posterior Superior: cabeça anteriorizada + braços caindo no overhead confirmam fraqueza de trapézio inferior e rotadores externos." },
  { ids:["agachamento_tronco","pe_plano"], prioridade:"media",
    alerta:"Limitação de Dorsiflexão: tronco caindo + pé plano sugerem restrição de tornozelo como causa primária. Mobilizar tornozelo antes de corrigir o padrão de agachamento." }
];

const condicoesClincias = [
  {
    categoria: "Cardiovascular",
    itens: [
      { id:"hipertensao", label:"Hipertensão arterial", alertas:[
        "Evitar exercícios isométricos prolongados e manobra de Valsalva",
        "Priorizar exercícios aeróbicos de intensidade moderada",
        "Monitorar PA antes, durante e após a sessão"
      ], liberacaoMedica:false },
      { id:"hipotensao", label:"Hipotensão arterial", alertas:[
        "Evitar mudanças bruscas de posição (deitado para em pé)",
        "Cuidado com exercícios em decúbito seguidos de posição ereta",
        "Hidratação adequada antes da sessão"
      ], liberacaoMedica:false },
      { id:"historico_cardiaco", label:"Histórico cardíaco (arritmia, infarto, cirurgia)", alertas:[
        "REQUER LIBERAÇÃO MÉDICA antes de iniciar qualquer protocolo",
        "Monitoramento de FC obrigatório durante a sessão",
        "Evitar exercícios de alta intensidade sem supervisão médica"
      ], liberacaoMedica:true },
      { id:"insuficiencia_venosa", label:"Insuficiência venosa / varizes", alertas:[
        "Evitar exercícios com membros inferiores em posição declive prolongada",
        "Priorizar exercícios que estimulem bomba muscular da panturrilha",
        "Uso de meia de compressão pode ser indicado"
      ], liberacaoMedica:false }
    ]
  },
  {
    categoria: "Metabólico / Endócrino",
    itens: [
      { id:"diabetes_t1", label:"Diabetes tipo 1", alertas:[
        "Verificar glicemia antes e após o treino",
        "Ter fonte de carboidrato de rápida absorção disponível",
        "Evitar treino em jejum prolongado"
      ], liberacaoMedica:true },
      { id:"diabetes_t2", label:"Diabetes tipo 2", alertas:[
        "Exercício físico é parte do tratamento — monitorar glicemia",
        "Preferir exercícios de intensidade moderada e contínua",
        "Atenção à hipoglicemia pós-exercício"
      ], liberacaoMedica:false },
      { id:"obesidade", label:"Obesidade (IMC acima de 30)", alertas:[
        "Evitar impacto excessivo em membros inferiores nas fases iniciais",
        "Priorizar exercícios em cadeia cinética fechada com suporte",
        "Progressão gradual de carga e volume"
      ], liberacaoMedica:false }
    ]
  },
  {
    categoria: "Ortopédico / Estrutural",
    itens: [
      { id:"hernia_disco", label:"Hérnia de disco diagnosticada", alertas:[
        "Evitar flexão lombar sob carga (agachamento profundo, levantamento terra convencional)",
        "Priorizar extensão e estabilização lombar",
        "Exercícios em decúbito podem ser mais seguros na fase inicial"
      ], liberacaoMedica:false },
      { id:"osteoporose", label:"Osteoporose / osteopenia", alertas:[
        "Evitar exercícios de alto impacto e risco de queda",
        "Exercícios de resistência são indicados para estímulo ósseo",
        "Cuidado com flexão de tronco sob carga"
      ], liberacaoMedica:true },
      { id:"protese_articular", label:"Prótese articular (quadril, joelho)", alertas:[
        "REQUER LIBERAÇÃO MÉDICA e protocolo específico do cirurgião",
        "Respeitar amplitude de movimento permitida",
        "Evitar rotação extrema e impacto na articulação protésica"
      ], liberacaoMedica:true },
      { id:"lesao_ativa", label:"Lesão articular ativa (dor, edema, inflamação)", alertas:[
        "Não iniciar protocolo de fortalecimento na fase aguda",
        "Encaminhar para avaliação fisioterapêutica antes de prosseguir",
        "Trabalhar apenas mobilidade passiva e controle motor distal"
      ], liberacaoMedica:true },
      { id:"cirurgia_recente", label:"Cirurgia recente (menos de 6 meses)", alertas:[
        "REQUER LIBERAÇÃO MÉDICA e protocolo pós-operatório específico",
        "Respeitar restrições do cirurgião e fisioterapeuta",
        "Progressão muito gradual e supervisionada"
      ], liberacaoMedica:true }
    ]
  },
  {
    categoria: "Neurológico / Sistêmico",
    itens: [
      { id:"gestacao", label:"Gestação", alertas:[
        "Evitar decúbito dorsal após o 1º trimestre",
        "Evitar exercícios de alta intensidade e impacto",
        "Monitorar sinais de desconforto abdominal e PA",
        "REQUER ACOMPANHAMENTO MÉDICO durante toda a gestação"
      ], liberacaoMedica:true },
      { id:"fibromialgia", label:"Fibromialgia / dor crônica difusa", alertas:[
        "Iniciar com volume e intensidade muito baixos",
        "Exercício aeróbico de baixa intensidade tem forte evidência",
        "Evitar sobrecarga muscular excessiva que piore o quadro"
      ], liberacaoMedica:false },
      { id:"epilepsia", label:"Epilepsia", alertas:[
        "Evitar exercícios em altura ou com risco de queda grave",
        "Ter protocolo de emergência definido",
        "Verificar controle medicamentoso com médico"
      ], liberacaoMedica:true },
      { id:"vertigem", label:"Vertigem / labirintite", alertas:[
        "Evitar mudanças rápidas de posição e rotações de cabeça",
        "Cuidado com exercícios em superfícies instáveis",
        "Ter apoio disponível durante a sessão"
      ], liberacaoMedica:false }
    ]
  },
  {
    categoria: "Respiratório",
    itens: [
      { id:"asma", label:"Asma / broncoespasmo induzido por exercício", alertas:[
        "Broncodilatador de resgate deve estar disponível na sessão",
        "Evitar exercício em ambientes frios, secos ou com poeira",
        "Aquecimento prolongado reduz risco de broncoespasmo"
      ], liberacaoMedica:false },
      { id:"dpoc", label:"DPOC / enfisema", alertas:[
        "Monitorar saturação de oxigênio durante o exercício",
        "Intensidade baixa a moderada com pausas frequentes",
        "REQUER LIBERAÇÃO MÉDICA para protocolo de exercício"
      ], liberacaoMedica:true }
    ]
  }
];