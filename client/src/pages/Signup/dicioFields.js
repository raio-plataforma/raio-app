export const segment = ["Desenvolvedora de conteúdo", "Produtora de conteúdo", "Distribuidora de conteúdo", "Exibidora de conteúdo", "Empacotadora de conteúdo", "Programadora de conteúdo", "Outros"]

export const actions = ["Streaming", "Cinema", "Publicidade", "Televisão", "Games", "Internet", "Outros"]

export const functions = ["Produtor(a) de Conteúdo", "Roteirista", "Consultor(a) de Roteiro", "Pesquisador(a)", "Produtor(a) Executivo", "Controller", "Diretor(a) de Produção", "Assistente de Produção", "Platô", "Direto(a)", "Assistente de Direção", "StoryBoarder", "Continuista", "Produtor(a) de Elenco", "Preparador(a) de Elenco", "Diretor(a) de Arte", "Produtor(a) de Arte", "Cenógrafo(a)", "Produtor(a) de objetos", "Figurinista", "Caracterizador(a)", "Supervisor(a) de Efeitos Especiais", "Chefe de Maquinária", "Assistente de Máquinaria", "Chefe de Elétrica | Gaffer", "Eletricista de Pré-Light", "Diretor(a) de Fotografia", "Operador(a) de Câmera", "Assistente de Câmera", "DIT | Técnico(a) de Imagem Digital - TID", "GMA | Logger", "Still", "Operador(a) de Video Assist", "Técnico(a) de Som", "Assistente de Som", "Editor(a)", "Assistente de Edição", "Supervisor(a) de Pós-Produção", "Assistente de Pós-Produção", "Supervisor(a) de Efeitos Visuais", "Produtor(a) de Efeitos Visuais", "Editor(a) On-line", "Correção de Cor", "Editor(a) de Som", "Legendagem", "Supervisor(a) Musical", "Compositor(a) Musical", "Animador(a)"]

export const color = ["Preto", "Pardo", "Branca", "Amarela", "Indigena"]

export const gender = ["Mulher Cis", "Mulher Trans", "Homem Cis", "Homem Trans", "Queer", "Não Binário", "Outro"]

export const identitySegments = ["Audiovisual Negro", "Audiovisual Indígena", "Audiovisual LGBTI+", "Audiovisual Feminista", "Audiovisual Queer", "Audiovisual Ambiental", "Outro"]

export const registryTypes = ["MEI", "EIRELI", "ME", "Outro"]

export const hiringType = ["RPA", "CLT", "PJ - ME", "PJ - MEI", "PJ - EIRELI", "PJ - LTDA", "PJ - S.A"]

export const formations = ["Analfabeta", "Fundamental I incompleto (1o ao 5o ano)", "Fundamental I completo (1o ao 5o ano)", "Fundamental II incompleto (6o ao 9o ano)", "Fundamental II completo (6o ao 9o ano)", "Médio incompleto", "Médio completo", "Superior incompleto", "Superior completo", "Pós Graduação", "Autodidata"]

export const cnpj_type = ["EIRELI", "LTDA", "ME", "MEI", "S.A"]

export const levels = ['Estagiário', 'Júnior', 'Pleno', 'Sênior'];

export const separated_functions = [
    {
        title: 'Roteiro/Pesquisa:',
        list: ["AUTOR / ROTEIRISTA", "PESQUISADOR CINEMATOGRÁFICO", "ESTAGIARIO"]
    },
    {
        title: 'Direção:',
        list: ["DIRETOR", "DIRETOR DE CENA", "DIRETOR DE IMAGEM", "1º ASSISTENTE DE DIREÇÃO", "2º ASSISTENTE DE DIREÇÃO", "CONTINUISTA", "ESTAGIARIO (LEI DO ESTAGIO)"]
    },
    {
        title: 'Elenco:',
        list: ["PREPARADOR DE ELENCO", "COORDENADOR DE ELENCO", "PRODUTOR DE ELENCO / FIGURAÇÃO", "ASSISTENTE DE PREPARADOR DE ELENCO /FIGURAÇÃO", "ESTAGIARIO (LEI DO ESTAGIO)"]
    },
    {
        title: 'Produção:',
        list: ["PRODUTOR GERAL", "PRODUTOR EXECUTIVO", "ASSISTENTE DE PRODUTOR EXECUTIVO", "COORDENADOR DE PRODUÇÃO", "DIRETOR DE PRODUÇÃO", "1º ASSISTENTE DE PRODUÇÃO", "2º ASSISTENTE DE PRODUÇÃO", "PRODUTOR DE SET", "PRODUTOR DE PLATO", "ASSISTENTE DE PLATÔ", "PRODUTOR DE LOCAÇÃO", "ASSISTENTE DE LOCAÇÃO", "ASSISTENTE DE SET (AJUDANTE ESPECIAL)", "ESTAGIARIO (LEI DO ESTAGIO)"]
    },
    {
        title: 'Arte/ Efeitos Especiais:',
        list: ["DIRETOR DE ARTE", "PRODUTOR DE ARTE", "1º ASSISTENTE DE ARTE", "2º ASSISTENTE DE ARTE", "CENOGRAFO", "ASSISTENTE DE CENOGRAFIA", "CENOTÉCNICO", "ASSISTENTE DE CENOTECNICO", "TECNICO EFEITOS ESPECIAIS", "CONTRARREGRA", "ADERECISTA", "PRODUTOR DE OBJETO", "ASSISTENTE DE OBJETO", "FIGURINISTA", "PRODUTOR DE FIGURINO", "1º ASSISTENTE DE FIGURINO", "CAMAREIRO(A) E OU GUARDA ROUPEIRO(A)", "COSTUREIRA", "MAQUIADOR", "MAQUIADOR DE EFEITOS ESPECIAIS", "CABELEIREIRO", "ASSISTENTE DE MAQUIADOR", "ASSISTENTE DE CABELEIREIRO", "ESTAGIARIO (LEI DO ESTAGIO)"]
    },
    {
        title: 'Fotografia:',
        list: ["DIRETOR DE FOTOGRAFIA", "DIRETOR DE FOTOGRAFIA/ OPERADOR DE CAMERA", "OPERADOR DE CÂMERA", "1º ASSISTENTE DE CÂMERA", "2º ASSISTENTE DE CÂMERA", "TID", "GMA", "OPERADOR DE VÍDEO ASSIST", "OPERADOR DE CABO", "OPERADOR DE STEADCAM", "OPERADOR DE 2º CÂMERA", "ASSISTENTE DE 2º CÂMERA", "ESTAGIARIO (LEI DO ESTAGIO)"]
    },
    {
        title: 'Making off:',
        list: ["FOTOGRAFO STILL", "MAKING OFF"]
    },
    {
        title: 'Som:',
        list: ["OPERADOR DE ÁUDIO", "TÉCNICO DE SOM DIRETO", "TÉCNICO DE SOM GUIA", "MICROFONISTA", "ASSISTENTE DE SOM", "ESTAGIARIO (LEI DO ESTAGIO)"]
    },
    {
        title: 'Elétrica/Maquinaria:',
        list: ["GAFFER", "ELETRICISTA CHEFE", "MAQUINISTA CHEFE", "ELETRICISTA/MAQUINISTA", "ASSISTENTE DE ELETRICISTA", "ASSISTENTE DE MAQUINISTA", "OPERADOR DE MOVIMENTO DE CAMERA", "OPERADOR DE GERADOR", "ESTAGIARIO (LEI DO ESTAGIO)"]
    },
    {
        title: 'Edição/ Pós-produção:',
        list: ["PRODUTOR DE FINALIZAÇÃO", "EDITOR / MONTADOR", "ASSISTENTE DE EDIÇÃO", "ASSISTENTE DE MONTAGEM", "SUPERVISOR DE EDIÇÃO SOM", "EDITOR DE SOM", "FINALIZADOR", "OPERADOR DE ESTEREOSCOPIA", "ESTAGIARIO (LEI DO ESTAGIO)"]
    },
    {
        title: 'Animação:',
        list: ["DIRETOR DE ANIMAÇÃO", "ASSISTENTE DE DIREÇÃO DE ANIMAÇÃO", "ANIMADOR", "ASSISTENTE DE ANIMAÇÃO", "ARTE-FINALISTA", "ESTAGIARIO (LEI DO ESTAGIO)"]
    }
]
