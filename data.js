const observacoes = [
  { id:"joelho_valgo", label:"Joelhos em valgo (X)", vista:"Anterior", regiao:"Membros Inferiores", descricao:"Joelhos colapsam medialmente em relacao ao eixo do pe", inibidos:["Gluteo Medio","Gluteo Maximo","Vasto Medial"], encurtados:["Adutores","TFL","Gastrocnemio"], padrao:"Sindrome de Dominancia do Joelho" },
  { id:"joelho_varo", label:"Joelhos em varo (O)", vista:"Anterior", regiao:"Membros Inferiores", descricao:"Joelhos afastados com pes juntos", inibidos:["Adutores do Quadril","Vasto Medial"], encurtados:["TFL","Biceps Femoral"], padrao:null },
  { id:"pe_plano", label:"Pe plano / pronacao excessiva", vista:"Anterior", regiao:"Pe e Tornozelo", descricao:"Arco medial colapsado, tornozelo em valgo", inibidos:["Tibial Posterior","Intrinsecos do Pe"], encurtados:["Gastrocnemio","Soleo"], padrao:null },
  { id:"pe_cavo", label:"Pe cavo / supinacao excessiva", vista:"Anterior", regiao:"Pe e Tornozelo", descricao:"Arco medial elevado, carga na borda lateral", inibidos:["Fibulares (Peroneos)","Intrinsecos do Pe"], encurtados:["Tibial Posterior","Triceps Sural"], padrao:null },
  { id:"rotacao_tibial", label:"Rotacao tibial externa excessiva", vista:"Anterior", regiao:"Membros Inferiores", descricao:"Pes muito abertos em repouso (acima de 15 graus)", inibidos:["Rotadores Internos do Quadril","Tibial Anterior"], encurtados:["TFL","Biceps Femoral"], padrao:null },
  { id:"ombros_assimetricos", label:"Ombros assimetricos", vista:"Anterior", regiao:"Ombros / Escapula", descricao:"Diferenca de altura entre ombros em repouso", inibidos:["Trapezio Inferior","Serratil Anterior"], encurtados:["Trapezio Superior","Escalenos"], padrao:null },
  { id:"hiperlordose", label:"Hiperlordose lombar", vista:"Lateral", regiao:"Coluna", descricao:"Curvatura lombar excessiva, pelve em anteversao", inibidos:["Gluteo Maximo","Transverso Abdominal","Isquiotibiais"], encurtados:["Iliopsoas","Reto Femoral","Eretor da Espinha Lombar"], padrao:"Sindrome Cruzada Inferior (Janda)" },
  { id:"hipercifose", label:"Hipercifose toracica", vista:"Lateral", regiao:"Coluna", descricao:"Curvatura toracica excessiva, tronco em flexao", inibidos:["Romboides","Trapezio Medio e Inferior","Extensores Toracicos"], encurtados:["Peitoral Maior","Peitoral Menor"], padrao:"Sindrome Cruzada Superior (Janda)" },
  { id:"cabeca_anteriorizada", label:"Cabeca anteriorizada", vista:"Lateral", regiao:"Cervical", descricao:"Orelha a frente do acromio na vista lateral", inibidos:["Flexores Profundos Cervicais","Trapezio Inferior"], encurtados:["Esternocleidomastoideo","Escalenos","Suboccipitais"], padrao:"Sindrome Cruzada Superior (Janda)" },
  { id:"ombros_protusos", label:"Ombros protusos (anteriorizacao)", vista:"Lateral", regiao:"Ombros / Escapula", descricao:"Ombros a frente do eixo gravitacional", inibidos:["Romboides","Trapezio Medio e Inferior","Rotadores Externos do Ombro"], encurtados:["Peitoral Menor","Peitoral Maior"], padrao:"Sindrome Cruzada Superior (Janda)" },
  { id:"joelho_recurvatum", label:"Joelho hiperextendido (recurvatum)", vista:"Lateral", regiao:"Membros Inferiores", descricao:"Joelho em extensao alem do neutro em apoio", inibidos:["Isquiotibiais","Gastrocnemio"], encurtados:["Reto Femoral"], padrao:null },
  { id:"antepulsao_pelvica", label:"Antepulsao pelvica", vista:"Lateral", regiao:"Quadril / Pelve", descricao:"Pelve deslocada anteriormente ao eixo gravitacional", inibidos:["Gluteo Maximo","Isquiotibiais","Transverso Abdominal"], encurtados:["Iliopsoas","Reto Femoral","TFL"], padrao:"Sindrome Cruzada Inferior (Janda)" },
  { id:"escapula_alada", label:"Escapula alada", vista:"Posterior", regiao:"Ombros / Escapula", descricao:"Borda medial da escapula se afasta do gradil costal", inibidos:["Serratil Anterior","Trapezio Inferior"], encurtados:["Peitoral Menor"], padrao:null },
  { id:"escoliose", label:"Escoliose / desvio lateral da coluna", vista:"Posterior", regiao:"Coluna", descricao:"Curvatura lateral visivel na coluna", inibidos:["Multifidos"], encurtados:["Quadrado Lombar"], padrao:null },
  { id:"pelve_inclinada", label:"Pelve inclinada lateralmente", vista:"Posterior", regiao:"Quadril / Pelve", descricao:"Uma crista iliaca mais alta que a outra", inibidos:["Gluteo Medio"], encurtados:["Quadrado Lombar","TFL"], padrao:null },
  { id:"agachamento_valgo", label:"Valgo dinamico no agachamento", vista:"Teste Funcional", regiao:"Membros Inferiores", descricao:"Joelhos colapsam para dentro ao agachar", inibidos:["Gluteo Medio","Gluteo Maximo","Vasto Medial"], encurtados:["Adutores","TFL","Gastrocnemio"], padrao:"Sindrome de Dominancia do Joelho" },
  { id:"agachamento_tronco", label:"Tronco cai no agachamento", vista:"Teste Funcional", regiao:"Coluna / Quadril", descricao:"Inclinacao excessiva do tronco para frente ao agachar", inibidos:["Gluteo Maximo","Extensores Toracicos","Tibial Anterior"], encurtados:["Soleo","Gastrocnemio","Iliopsoas"], padrao:null },
  { id:"trendelenburg", label:"Sinal de Trendelenburg", vista:"Teste Funcional", regiao:"Quadril / Pelve", descricao:"Pelve cai para o lado da perna elevada no apoio unipodal", inibidos:["Gluteo Medio","Gluteo Minimo"], encurtados:["Quadrado Lombar","Adutores"], padrao:"Fraqueza de Gluteo Medio" },
  { id:"thomas_positivo", label:"Teste de Thomas positivo", vista:"Teste Funcional", regiao:"Quadril / Pelve", descricao:"Perna sobe da maca ao soltar - encurtamento de iliopsoas ou reto femoral", inibidos:["Gluteo Maximo","Isquiotibiais"], encurtados:["Iliopsoas","Reto Femoral","TFL"], padrao:"Sindrome Cruzada Inferior (Janda)" },
  { id:"overhead_arms_fall", label:"Bracos caem no agachamento overhead", vista:"Teste Funcional", regiao:"Ombros / Coluna", descricao:"Bracos nao mantem posicao vertical acima da cabeca", inibidos:["Trapezio Inferior","Serratil Anterior","Rotadores Externos do Ombro"], encurtados:["Peitoral Menor","Grande Dorsal"], padrao:"Sindrome Cruzada Superior (Janda)" }
];

const padroesCombinados = [
  { ids:["joelho_valgo","pe_plano"], prioridade:"alta", alerta:"Cadeia de Pronacao: pe plano + joelho valgo indicam colapso em cadeia cinetica fechada. Corrigir o pe e pre-requisito antes de trabalhar o joelho." },
  { ids:["joelho_valgo","trendelenburg"], prioridade:"alta", alerta:"Colapso Medial por Fraqueza de Gluteo Medio: valgo + Trendelenburg confirmam insuficiencia do gluteo medio. Ativacao isolada antes de qualquer exercicio de cadeia fechada." },
  { ids:["joelho_valgo","agachamento_valgo"], prioridade:"alta", alerta:"Valgo Estatico e Dinamico Confirmados: padrao presente em repouso e no movimento. Prioridade maxima em ativacao de gluteo medio e VMO." },
  { ids:["hiperlordose","thomas_positivo"], prioridade:"alta", alerta:"Sindrome Cruzada Inferior Confirmada (Janda): hiperlordose + Thomas positivo confirmam encurtamento de iliopsoas e inibicao de gluteo. Mobilizar iliopsoas e ativar core antes de qualquer carga." },
  { ids:["hiperlordose","antepulsao_pelvica"], prioridade:"alta", alerta:"Anteversao Pelvica Acentuada: hiperlordose + antepulsao indicam dominancia de flexores do quadril. Trabalhar retroversao pelvica ativa antes de exercicios de forca." },
  { ids:["hipercifose","ombros_protusos"], prioridade:"alta", alerta:"Sindrome Cruzada Superior (Janda): cifose + ombros protusos. Mobilizacao toracica e pre-requisito absoluto antes de fortalecer a cadeia posterior." },
  { ids:["hipercifose","cabeca_anteriorizada"], prioridade:"alta", alerta:"Padrao de Flexao Global: cifose + cabeca anteriorizada. A cervical compensa a toracica - extensao toracica deve ser trabalhada primeiro." },
  { ids:["escapula_alada","ombros_protusos"], prioridade:"alta", alerta:"Disfuncao Escapulotoracica Combinada: escapula alada + ombros protusos. Serratil anterior e prioridade maxima - sem ele qualquer exercicio de empurrar agrava o quadro." },
  { ids:["agachamento_valgo","trendelenburg"], prioridade:"alta", alerta:"Insuficiencia de Gluteo Medio Confirmada por Dois Testes: protocolo deve iniciar exclusivamente com ativacao isolada de gluteo medio." },
  { ids:["joelho_recurvatum","hiperlordose"], prioridade:"media", alerta:"Padrao de Extensao Global: recurvatum + hiperlordose sugerem dominancia de extensores e inibicao de isquiotibiais + abdominais." },
  { ids:["pelve_inclinada","escoliose"], prioridade:"alta", alerta:"Desequilibrio Pelvico-Espinhal: pelve inclinada + escoliose podem ter relacao causal. Avaliar discrepancia de membros inferiores antes de iniciar protocolo." },
  { ids:["cabeca_anteriorizada","overhead_arms_fall"], prioridade:"media", alerta:"Disfuncao de Cadeia Posterior Superior: cabeca anteriorizada + bracos caindo no overhead confirmam fraqueza de trapezio inferior e rotadores externos." },
  { ids:["agachamento_tronco","pe_plano"], prioridade:"media", alerta:"Limitacao de Dorsiflexao: tronco caindo + pe plano sugerem restricao de tornozelo como causa primaria. Mobilizar tornozelo antes de corrigir o padrao de agachamento." }
];

const condicoesClincias = [
  { categoria:"Cardiovascular", itens:[
    { id:"hipertensao", label:"Hipertensao arterial", alertas:["Evitar exercicios isometricos prolongados e manobra de Valsalva","Priorizar exercicios aerobicos de intensidade moderada","Monitorar PA antes, durante e apos a sessao"], liberacaoMedica:false },
    { id:"hipotensao", label:"Hipotensao arterial", alertas:["Evitar mudancas bruscas de posicao","Cuidado com exercicios em decubito seguidos de posicao ereta","Hidratacao adequada antes da sessao"], liberacaoMedica:false },
    { id:"historico_cardiaco", label:"Historico cardiaco (arritmia, infarto, cirurgia)", alertas:["REQUER LIBERACAO MEDICA antes de iniciar qualquer protocolo","Monitoramento de FC obrigatorio durante a sessao"], liberacaoMedica:true },
    { id:"insuficiencia_venosa", label:"Insuficiencia venosa / varizes", alertas:["Evitar exercicios com membros inferiores em posicao declive prolongada","Priorizar exercicios que estimulem bomba muscular da panturrilha"], liberacaoMedica:false }
  ]},
  { categoria:"Metabolico / Endocrino", itens:[
    { id:"diabetes_t1", label:"Diabetes tipo 1", alertas:["Verificar glicemia antes e apos o treino","Ter fonte de carboidrato de rapida absorcao disponivel"], liberacaoMedica:true },
    { id:"diabetes_t2", label:"Diabetes tipo 2", alertas:["Exercicio fisico e parte do tratamento - monitorar glicemia","Preferir exercicios de intensidade moderada e continua"], liberacaoMedica:false },
    { id:"obesidade", label:"Obesidade (IMC acima de 30)", alertas:["Evitar impacto excessivo em membros inferiores nas fases iniciais","Progressao gradual de carga e volume"], liberacaoMedica:false }
  ]},
  { categoria:"Ortopedico / Estrutural", itens:[
    { id:"hernia_disco", label:"Hernia de disco diagnosticada", alertas:["Evitar flexao lombar sob carga","Priorizar extensao e estabilizacao lombar"], liberacaoMedica:false },
    { id:"osteoporose", label:"Osteoporose / osteopenia", alertas:["Evitar exercicios de alto impacto e risco de queda","Exercicios de resistencia sao indicados para estimulo osseo"], liberacaoMedica:true },
    { id:"protese_articular", label:"Protese articular (quadril, joelho)", alertas:["REQUER LIBERACAO MEDICA e protocolo especifico do cirurgiao","Respeitar amplitude de movimento permitida"], liberacaoMedica:true },
    { id:"lesao_ativa", label:"Lesao articular ativa (dor, edema, inflamacao)", alertas:["Nao iniciar protocolo de fortalecimento na fase aguda","Encaminhar para avaliacao fisioterapeutica antes de prosseguir"], liberacaoMedica:true }
  ]},
  { categoria:"Neurologico / Sistemico", itens:[
    { id:"gestacao", label:"Gestacao", alertas:["Evitar decubito dorsal apos o 1o trimestre","Evitar exercicios de alta intensidade e impacto","REQUER ACOMPANHAMENTO MEDICO durante toda a gestacao"], liberacaoMedica:true },
    { id:"fibromialgia", label:"Fibromialgia / dor cronica difusa", alertas:["Iniciar com volume e intensidade muito baixos","Exercicio aerobico de baixa intensidade tem forte evidencia"], liberacaoMedica:false }
  ]},
  { categoria:"Respiratorio", itens:[
    { id:"asma", label:"Asma / broncoespasmo induzido por exercicio", alertas:["Broncodilatador de resgate deve estar disponivel na sessao","Aquecimento prolongado reduz risco de broncoespasmo"], liberacaoMedica:false },
    { id:"dpoc", label:"DPOC / enfisema", alertas:["Monitorar saturacao de oxigenio durante o exercicio","REQUER LIBERACAO MEDICA para protocolo de exercicio"], liberacaoMedica:true }
  ]}
];