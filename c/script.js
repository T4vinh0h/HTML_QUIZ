// Data dos 10 módulos com questões e flashcards
const quizData = [
    {
        id: 1,
        module: "Acessibilidade Dinâmica",
        suffix: "-ty",
        suffixWords: ["usability", "accessibility"],
        question: "Em uma arquitetura de Design System complexa, um desenvolvedor cria um componente customizado de alternância (toggle switch) utilizando um elemento <div> genérico. Do ponto de vista de acessibilidade e da semântica da API do DOM, qual implementação é necessária?",
        options: [
            "Apenas aria-label='Notificações' é suficiente para acessibilidade",
            "ARIA atributos alteram automaticamente o CSS e comportamento de teclado",
            "Aplicar role='switch', aria-checked, aria-label, tabindex='0' e gerenciar eventos de teclado manualmente",
            "O uso de <div> com ARIA substitui completamente a necessidade de elementos nativos"
        ],
        correct: 2,
        hint: "Lembre-se: ARIA apenas modifica a árvore de acessibilidade, não adiciona comportamento nativo. Elementos não semânticos precisam de tabindex e gerenciamento de teclado manual.",
        explanation: "Atributos ARIA modificam unicamente a árvore de acessibilidade. Ao substituir um elemento nativo por uma <div>, o engenheiro assume a responsabilidade de restaurar a interatividade via teclado gerenciando o tabindex e os manipuladores de evento (keydown/keyup)."
    },
    {
        id: 2,
        module: "Validação de Formulários",
        suffix: "-tion",
        suffixWords: ["validation", "specification"],
        question: "Em uma SPA que intercepta o evento onsubmit de um formulário, o desenvolvedor deseja disparar a validação nativa do navegador e exibir as bolhas de erro visuais originais caso haja dados inválidos. Qual método deve ser utilizado?",
        options: [
            "checkValidity() - exibe caixas de diálogo visuais e retorna booleano",
            "reportValidity() - avalia restrições, exibe mensagens de erro nativas e retorna booleano",
            "validate() - método que bloqueia a submissão automaticamente",
            "setCustomValidity() - suficiente para exibir erros nativos"
        ],
        correct: 1,
        hint: "checkValidity() apenas retorna true/false sem mostrar erros visuais. Para exibir as mensagens nativas do navegador, você precisa do método que 'reporta' a validação.",
        explanation: "O método reportValidity() executa a verificação e obriga o agente de usuário a apresentar os avisos visuais ao usuário final, retornando false se qualquer campo violar restrições. O checkValidity() apenas retorna um booleano sem exibir interface visual."
    },
    {
        id: 3,
        module: "Processamento Assíncrono",
        suffix: "-ly",
        suffixWords: ["concurrently", "asynchronously"],
        question: "Ao projetar um módulo de processamento de dados estatísticos delegado a um Web Worker, qual é a característica correta sobre o contexto de execução?",
        options: [
            "O Web Worker possui acesso completo ao DOM e objetos window/document",
            "O Worker pode manipular o DOM diretamente via blocos sincronizados",
            "O contexto do Worker não possui acesso ao DOM, window ou document; comunicação é via postMessage()",
            "O Worker possui acesso a modais como alert() e confirm()"
        ],
        correct: 2,
        hint: "Web Workers rodam em uma thread isolada por segurança. Eles não podem acessar o DOM para evitar race conditions. A comunicação é feita exclusivamente por mensagens.",
        explanation: "O contexto do Web Worker (DedicatedWorkerGlobalScope) carece de acesso ao DOM, aos objetos window, document e parent. Toda a transferência de dados ocorre por meio do protocolo de passagem de mensagens (postMessage)."
    },
    {
        id: 4,
        module: "Persistência de Dados",
        suffix: "-ance",
        suffixWords: ["persistence", "performance"],
        question: "Sobre o comportamento do localStorage para armazenar preferências de estado, qual afirmação está correta?",
        options: [
            "O localStorage envia dados automaticamente via cabeçalhos HTTP",
            "Os dados persistem após fechamento do navegador e são acessíveis por qualquer aba com mesma origem",
            "O localStorage suporta nativamente objetos e funções sem serialização",
            "A API do localStorage é assíncrona e não bloqueia a thread principal"
        ],
        correct: 1,
        hint: "localStorage segue a Política de Mesma Origem (SOP). Dados persistem mesmo após fechar o navegador. Diferente de cookies, não são enviados automaticamente em requisições HTTP.",
        explanation: "O localStorage opera sob a Política de Mesma Origem (SOP). Os dados persistem indefinidamente até serem apagados. Contudo, a API é estritamente síncrona e pode bloquear o ciclo de renderização em operações extensas."
    },
    {
        id: 5,
        module: "Isolamento de Contexto",
        suffix: "-ence",
        suffixWords: ["restriction", "difference"],
        question: "Ao incorporar uma página web externa com <iframe sandbox='allow-scripts allow-same-origin'>, qual é o impacto de segurança?",
        options: [
            "A combinação allow-scripts e allow-same-origin permite que o conteúdo remova o sandbox e execute scripts com privilégios do documento pai",
            "O sandbox causa incompatibilidade automática com HTTPS",
            "As permissões sandbox afetam apenas o CSS do iframe",
            "O iframe sandboxed nunca pode executar scripts independentemente das permissões"
        ],
        correct: 0,
        hint: "allow-same-origin dá ao iframe a mesma origem do documento pai. Combinado com allow-scripts, o conteúdo pode remover o sandbox e executar código com privilégios elevados.",
        explanation: "Conceder simultaneamente allow-scripts e allow-same-origin anula os benefícios de segurança. O script executado dentro do iframe passa a ter a mesma origem da aplicação principal e pode manipular a árvore do DOM pai."
    },
    {
        id: 6,
        module: "Mídia Responsiva",
        suffix: "-al",
        suffixWords: ["directional", "optimal"],
        question: "Ao usar o elemento <picture> para servir WebP para navegadores modernos e JPEG como fallback, como o navegador seleciona a imagem?",
        options: [
            "O navegador baixa todas as fontes declaradas simultaneamente",
            "O navegador analisa as declarações <source> sequencialmente, selecionando a primeira correspondência verdadeira",
            "A seleção é feita dinamicamente via eventos JavaScript",
            "O <picture> substitui automaticamente todas as imagens por WebP"
        ],
        correct: 1,
        hint: "O <picture> usa o primeiro <source> que corresponder às condições (media query e tipo suportado). É uma avaliação sequencial de cima para baixo, não simultânea.",
        explanation: "O navegador percorre os elementos <source> na ordem exata. A primeira fonte que satisfizer as restrições declaradas nos atributos media e type é escolhida. A tag <img> final atua como fallback."
    },
    {
        id: 7,
        module: "Comunicação em Tempo Real",
        suffix: "-tion",
        suffixWords: ["notification", "connection"],
        question: "Sobre a API Server-Sent Events (SSE) implementada via EventSource, qual caracterização está correta?",
        options: [
            "O SSE exige handshake na porta 8080 como um WebSocket",
            "O SSE limita a conexão a uma única mensagem por requisição",
            "O cliente inicializa via new EventSource(url), servidor responde com Content-Type: text/event-stream, conexão é unidirecional servidor-cliente",
            "O SSE não suporta reconexão automática"
        ],
        correct: 2,
        hint: "SSE usa HTTP padrão, não WebSocket. É unidirecional (servidor→cliente). O servidor mantém a conexão aberta enviando dados com Content-Type: text/event-stream.",
        explanation: "Server-Sent Events é um padrão leve para transmissão unidirecional servidor-cliente sobre HTTP. O servidor mantém a conexão aberta enviando blocos com Content-Type: text/event-stream. A API EventSource gerencia reconexão automaticamente."
    },
    {
        id: 8,
        module: "Semântica de Conteúdo",
        suffix: "-ty",
        suffixWords: ["semantics", "navigability"],
        question: "Ao refatorar uma estrutura de <div> para tags semânticas HTML5 (<main>, <nav>, <section>), qual é o impacto direto no processamento da página?",
        options: [
            "Tags semânticas reduzem o tempo de compilação do CSSOM",
            "Tags semânticas tornam o texto editável por padrão",
            "O agente de usuário atribui automaticamente papéis de marco (landmark roles) implícitos, permitindo atalhos de navegação direta",
            "Tags semânticas não afetam tecnologias assistivas"
        ],
        correct: 2,
        hint: "Tags semânticas como <main> e <nav> mapeiam automaticamente para ARIA landmark roles. Isso permite que leitores de tela ofereçam navegação rápida entre seções.",
        explanation: "Elementos semânticos do HTML5 mapeiam nativamente papéis de marco (implicit ARIA landmark roles). Isso permite que usuários de tecnologias assistivas utilizem teclas de atalho para saltar diretamente para os blocos principais."
    },
    {
        id: 9,
        module: "Navegação por Teclado",
        suffix: "-ance",
        suffixWords: ["compliance", "governance"],
        question: "Ao implementar o padrão Roving TabIndex em um componente de conjunto de abas (Tab Widget), qual estratégia está correta?",
        options: [
            "Atribuir tabindex='0' a todos os botões simultaneamente",
            "Usar valores positivos (tabindex='1', tabindex='2') para definir ordem customizada",
            "Atribuir tabindex='0' exclusivamente à aba ativa e tabindex='-1' às inativas, usando setas para alternar",
            "O Roving TabIndex não é necessário para componentes customizados"
        ],
        correct: 2,
        hint: "tabindex='-1' remove o elemento da ordem de Tab global mas permite foco programático. tabindex='0' coloca na ordem natural. Use -1 para inativos e 0 apenas para o ativo.",
        explanation: "Ao atribuir tabindex='0', o elemento selecionado entra na sequência normal de foco. Sub-elementos inativos recebem tabindex='-1', removendo-os da ordem global mas permitindo foco programático via JavaScript."
    },
    {
        id: 10,
        module: "Restrições de Entrada",
        suffix: "-al",
        suffixWords: ["structural", "behavioral"],
        question: "Considerando o atributo pattern em um campo <input pattern='[A-Z]{3}[0-9]{4}'>, como o navegador aplica a expressão regular?",
        options: [
            "O atributo realiza apenas buscas parciais de substring",
            "O atributo bloqueia fisicamente o evento keydown durante a digitação",
            "O navegador aplica implicitamente âncoras ^ e $, exigindo que todo o valor corresponda exatamente à regra",
            "O pattern é avaliado apenas na submissão do formulário"
        ],
        correct: 2,
        hint: "O pattern é automaticamente envolvido por ^ e $. Isso significa que o valor inteiro deve corresponder, não apenas uma parte. É uma correspondência completa, não parcial.",
        explanation: "A expressão regular no atributo pattern é avaliada como se estivesse envolta por ^(?:pattern)$. O valor inteiro deve corresponder estritamente ao padrão. Falhas definem validity.patternMismatch = true."
    }
];

// Estado da aplicação
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let currentFlashcard = 0;
let flashcardFlipped = false;
let flashcardMastery = {};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    initializeQuiz();
    initializeFlashcards();
    initializeNavigation();
    initializeProgressSection();
});

// Sistema de Navegação entre Abas (Roving TabIndex)
function initializeNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => switchTab(tab));
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const newIndex = (index + direction + tabs.length) % tabs.length;
                switchTab(tabs[newIndex]);
            }
        });
    });

    function switchTab(selectedTab) {
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-pressed', 'false');
            tab.setAttribute('tabindex', '-1');
        });
        
        tabContents.forEach(content => content.classList.remove('active'));

        selectedTab.classList.add('active');
        selectedTab.setAttribute('aria-pressed', 'true');
        selectedTab.setAttribute('tabindex', '0');
        selectedTab.focus();

        const targetTab = selectedTab.getAttribute('data-tab');
        document.getElementById(`${targetTab}-section`).classList.add('active');
    }
}

// Sistema de Quiz com Constraint Validation API
function initializeQuiz() {
    loadQuestion();
    
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    document.getElementById('hint-btn').addEventListener('click', showHint);
    document.getElementById('quiz-form').addEventListener('submit', submitQuiz);
}

function loadQuestion() {
    const container = document.getElementById('question-container');
    const question = quizData[currentQuestion];
    
    // Função para escapar HTML
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    
    container.innerHTML = `
        <div class="question-card" role="group" aria-labelledby="question-${question.id}">
            <div class="question-header">
                <span class="module-badge">${escapeHtml(question.module)}</span>
                <span class="suffix-badge" aria-label="Sufixo nominal: ${question.suffix}">${escapeHtml(question.suffix)}</span>
            </div>
            <h3 id="question-${question.id}" class="question-text">${escapeHtml(question.question)}</h3>
            <div class="options-container" role="radiogroup" aria-label="Opções de resposta">
                ${question.options.map((option, index) => `
                    <label class="option-label">
                        <input type="radio" name="answer" value="${index}" 
                            ${userAnswers[currentQuestion] === index ? 'checked' : ''}
                            required
                            aria-describedby="feedback-${question.id}">
                        <span class="option-text">${escapeHtml(option)}</span>
                    </label>
                `).join('')}
            </div>
            <div id="feedback-${question.id}" class="feedback" role="alert" aria-live="polite"></div>
        </div>
    `;

    updateQuizUI();
}

function updateQuizUI() {
    document.getElementById('question-counter').textContent = `Questão ${currentQuestion + 1} de ${quizData.length}`;
    document.getElementById('score-display').textContent = `Pontuação: ${score}`;
    
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    
    const isLastQuestion = currentQuestion === quizData.length - 1;
    document.getElementById('next-btn').style.display = isLastQuestion ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = isLastQuestion ? 'inline-block' : 'none';
}

function nextQuestion() {
    const container = document.getElementById('question-container');
    const selectedAnswer = container.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        showFeedback('Selecione uma resposta antes de continuar.', 'warning');
        return;
    }

    userAnswers[currentQuestion] = parseInt(selectedAnswer.value);
    
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function showFeedback(message, type) {
    const container = document.getElementById('question-container');
    const feedbackEl = container.querySelector('.feedback');
    if (feedbackEl) {
        feedbackEl.textContent = message;
        feedbackEl.className = `feedback ${type}`;
    }
}

function showHint() {
    const question = quizData[currentQuestion];
    const hintDisplay = document.getElementById('hint-display');
    
    hintDisplay.textContent = question.hint;
    hintDisplay.style.display = 'block';
    hintDisplay.classList.add('hint-visible');
    
    // Ocultar dica após 10 segundos
    setTimeout(() => {
        hintDisplay.classList.remove('hint-visible');
        setTimeout(() => {
            hintDisplay.style.display = 'none';
        }, 300);
    }, 10000);
}

function submitQuiz(e) {
    e.preventDefault();
    
    // Usa reportValidity() da Constraint Validation API
    const form = document.getElementById('quiz-form');
    if (!form.reportValidity()) {
        return;
    }

    const container = document.getElementById('question-container');
    const selectedAnswer = container.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentQuestion] = parseInt(selectedAnswer.value);
    }

    // Calcula pontuação - apenas conta questões respondidas corretamente
    score = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] !== undefined && userAnswers[i] === quizData[i].correct) {
            score++;
        }
    }

    // Exibe resultados
    displayResults();
    saveProgress();
}

function displayResults() {
    const resultsContainer = document.getElementById('quiz-results');
    const percentage = Math.round((score / quizData.length) * 100);
    
    resultsContainer.innerHTML = `
        <div class="results-summary">
            <h3>Quiz Finalizado!</h3>
            <p class="score-big">${score} / ${quizData.length} (${percentage}%)</p>
            <p>${percentage >= 70 ? '🎉 Parabéns! Você demonstrou excelente conhecimento.' : 
                 percentage >= 50 ? '👍 Bom trabalho! Continue estudando.' : 
                 '📚 Recomendamos revisar os módulos.'}</p>
        </div>
        <div class="results-details">
            <h4>Detalhes por Módulo:</h4>
            ${quizData.map((q, index) => {
                const isAnswered = userAnswers[index] !== undefined;
                const isCorrect = isAnswered && userAnswers[index] === q.correct;
                const statusClass = !isAnswered ? 'unanswered' : (isCorrect ? 'correct' : 'incorrect');
                const statusIcon = !isAnswered ? '−' : (isCorrect ? '✓' : '✗');
                return `
                    <div class="result-item ${statusClass}">
                        <span class="result-status">${statusIcon}</span>
                        <span class="result-module">${q.module}</span>
                        <span class="result-suffix">${q.suffix}</span>
                    </div>
                `;
            }).join('')}
        </div>
        <button type="button" class="btn btn-primary" onclick="resetQuiz()">Refazer Quiz</button>
    `;
    
    resultsContainer.style.display = 'block';
    document.getElementById('question-container').style.display = 'none';
    document.querySelector('.quiz-controls').style.display = 'none';
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.querySelector('.quiz-controls').style.display = 'flex';
    loadQuestion();
}

// Sistema de Flashcards com Repetição Espaçada
function initializeFlashcards() {
    loadFlashcard();
    
    document.getElementById('flashcard').addEventListener('click', flipFlashcard);
    document.getElementById('flashcard').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            flipFlashcard();
        }
    });
    
    document.getElementById('flashcard-flip').addEventListener('click', flipFlashcard);
    document.getElementById('flashcard-next').addEventListener('click', nextFlashcard);
    document.getElementById('flashcard-prev').addEventListener('click', prevFlashcard);
    
    document.querySelectorAll('.mastery-btn').forEach(btn => {
        btn.addEventListener('click', () => setMastery(btn.getAttribute('data-mastery')));
    });
}

function loadFlashcard() {
    const card = quizData[currentFlashcard];
    
    document.getElementById('flashcard-title').textContent = card.module;
    document.getElementById('flashcard-question').textContent = card.question.substring(0, 150) + '...';
    document.getElementById('flashcard-answer').textContent = card.explanation;
    document.getElementById('flashcard-suffix').textContent = `Sufixo: ${card.suffix} (${card.suffixWords.join(', ')})`;
    
    document.getElementById('flashcard-counter').textContent = `Card ${currentFlashcard + 1} de ${quizData.length}`;
    
    flashcardFlipped = false;
    document.getElementById('flashcard').classList.remove('flipped');
    
    updateFlashcardControls();
    updateMasteryDisplay();
}

function flipFlashcard() {
    flashcardFlipped = !flashcardFlipped;
    document.getElementById('flashcard').classList.toggle('flipped', flashcardFlipped);
}

function nextFlashcard() {
    if (currentFlashcard < quizData.length - 1) {
        currentFlashcard++;
        loadFlashcard();
    }
}

function prevFlashcard() {
    if (currentFlashcard > 0) {
        currentFlashcard--;
        loadFlashcard();
    }
}

function updateFlashcardControls() {
    document.getElementById('flashcard-prev').disabled = currentFlashcard === 0;
    document.getElementById('flashcard-next').disabled = currentFlashcard === quizData.length - 1;
}

function setMastery(level) {
    const cardId = quizData[currentFlashcard].id;
    flashcardMastery[cardId] = level;
    saveProgress();
    updateMasteryDisplay();
    
    // Feedback visual
    const btn = document.querySelector(`.mastery-btn[data-mastery="${level}"]`);
    btn.classList.add('mastery-selected');
    setTimeout(() => btn.classList.remove('mastery-selected'), 500);
}

function updateMasteryDisplay() {
    const mastered = Object.values(flashcardMastery).filter(v => v === 'easy').length;
    const percentage = Math.round((mastered / quizData.length) * 100);
    document.getElementById('mastery-display').textContent = `Domínio: ${percentage}%`;
}

// Sistema de Persistência com localStorage
function saveProgress() {
    const progress = {
        quiz: {
            bestScore: Math.max(score, getProgress().quiz?.bestScore || 0),
            lastScore: score,
            completed: userAnswers.length === quizData.length
        },
        flashcards: {
            mastery: flashcardMastery,
            reviewed: Object.keys(flashcardMastery).length
        },
        suffixes: calculateSuffixProgress()
    };
    
    try {
        localStorage.setItem('htmlQuizProgress', JSON.stringify(progress));
    } catch (e) {
        console.error('Erro ao salvar progresso:', e);
    }
}

function loadProgress() {
    const saved = getProgress();
    
    if (saved.flashcards?.mastery) {
        flashcardMastery = saved.flashcards.mastery;
    }
}

function getProgress() {
    try {
        const saved = localStorage.getItem('htmlQuizProgress');
        return saved ? JSON.parse(saved) : {};
    } catch (e) {
        console.error('Erro ao carregar progresso:', e);
        return {};
    }
}

function calculateSuffixProgress() {
    const suffixProgress = {};
    
    quizData.forEach(q => {
        if (!suffixProgress[q.suffix]) {
            suffixProgress[q.suffix] = { correct: 0, total: 0 };
        }
        suffixProgress[q.suffix].total++;
        
        const answerIndex = userAnswers[quizData.indexOf(q)];
        if (answerIndex === q.correct) {
            suffixProgress[q.suffix].correct++;
        }
    });
    
    Object.keys(suffixProgress).forEach(suffix => {
        suffixProgress[suffix] = Math.round(
            (suffixProgress[suffix].correct / suffixProgress[suffix].total) * 100
        );
    });
    
    return suffixProgress;
}

// Seção de Progresso
function initializeProgressSection() {
    updateProgressDisplay();
    
    document.getElementById('reset-progress').addEventListener('click', () => {
        if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
            localStorage.removeItem('htmlQuizProgress');
            flashcardMastery = {};
            userAnswers = [];
            score = 0;
            updateProgressDisplay();
        }
    });
    
    document.getElementById('export-progress').addEventListener('click', exportProgress);
}

function updateProgressDisplay() {
    const progress = getProgress();
    
    // Quiz stats
    const quizCompletion = progress.quiz?.completed ? 100 : 0;
    document.getElementById('quiz-completion').textContent = `${quizCompletion}% concluído`;
    document.getElementById('quiz-best-score').textContent = `Melhor pontuação: ${progress.quiz?.bestScore || 0}`;
    
    // Flashcards stats
    const masteryPercentage = Object.values(flashcardMastery).filter(v => v === 'easy').length / quizData.length * 100;
    document.getElementById('flashcards-mastery').textContent = `${Math.round(masteryPercentage)}% domínio`;
    document.getElementById('flashcards-reviewed').textContent = `Cards revisados: ${Object.keys(flashcardMastery).length}`;
    
    // Suffix progress
    const suffixProgress = calculateSuffixProgress();
    document.querySelectorAll('.suffix-item').forEach(item => {
        const suffix = item.getAttribute('data-suffix');
        const percentage = suffixProgress[suffix] || 0;
        item.textContent = `${suffix}: ${percentage}%`;
    });
}

function exportProgress() {
    const progress = getProgress();
    const dataStr = JSON.stringify(progress, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz-progress.json';
    a.click();
    
    URL.revokeObjectURL(url);
}
