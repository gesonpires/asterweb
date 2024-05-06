const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let attempts = 2 // Adiciona a contagem de tentativas

let questions = [
    {
        question: 'A astronomia antiga esteve relacionada ao(à)',
        choice1: 'descoberta de que a Terra orbita o Sol',
        choice2: 'necessidade medir o tempo e prever melhor época para plantio',
        choice3: 'desenvolvimento da teoria do big-bang',
        choice4: 'desenvolvimento da lei da gravitação universal',
        answer: 2,
        supportText: 'Dica: está relacionada ao cotidiano.'
    },{
        question: 'Galáxias são',
        choice1: 'sistema composto por gás, poeira e plasma',
        choice2: 'sistema composto por gás e poeira',
        choice3: 'conjuntos de estrelas 10 vezes maiores que o Sol',
        choice4: 'um grande sistema, gravitacionalmente ligado, de estrelas, restos de estrelas envoltos por gás e poeira',
        answer: 4,
        supportText: 'Dica: massa atrai massa.'
    },{
        question: 'Uma nebulosa é',
        choice1: 'o sinônimo de galáxia',
        choice2: 'uma galáxia menor que a Via Láctea',
        choice3: 'nuvens de poeira de elementos residuais de uma estrela que implodiu',
        choice4: 'uma galáxia que contém pelo menos um buraco-negro',
        answer: 3,
        supportText: 'Dica: resulta da desagregação.'
    },{
        question: 'De acordo com a lei de Hubble, as galáxias',
        choice1: 'estão se aproximando',
        choice2: 'estão se afastando',
        choice3: 'mantém a distância constante',
        choice4: 'devem possuir pelo menos 1 buraco-negro em seu centro',
        answer: 2,
        supportText: 'Dica: expansão.'
       
    },{
        question: 'No modelo copernicano,',
        choice1: 'os epiciclos explicam o movimento retrógrado',
        choice2: 'os equantes estão relacionados aos eclipses lunares',
        choice3: 'as órbitas são circulares e não há epiclicos',
        choice4: 'as órbitas são elípticas e não há epiciclos',
        answer: 3,
        supportText: 'Dica: formas perfeitas.'
    },{
        question: 'A paralaxe heliocêntrica é',
        choice1: 'um método para prever eclipses solares',
        choice2: 'a distância percorrida pela luz em 1 ano',
        choice3: 'usada para medir a distância das estrelas mais próximas de nós',
        choice4: 'usada para medir a distância do Sol até nós',
        answer: 3,
        supportText: 'Dica: medidas mais "próximas".'
    },{
        question: 'De acordo com a teoria do Big-Bang ...',
        choice1: 'no passado, o Universo continha átomos mais pesados',
        choice2: 'as galáxias estão cada vez mais próximas',
        choice3: 'o Universo tende a se contrair',
        choice4: 'no passado, o Universo era  muito quente e muito brilhante',
        answer: 4,
        supportText: 'Dica: mais energia interna.'
    },{
        question: 'A observação de objetos celestes depende da captação de',
        choice1: 'radiação eletromagnética emitida por eles',
        choice2: 'radioatividade de pulsares',
        choice3: 'neutrinos emitidos por buracos-negros',
        choice4: 'raios cósmicos',
        answer: 1,
        supportText: 'Dica: viaja pelo espaço sideral.'
    },{
        question: 'A unidade astronômica(UA) equivale à distância média entre ...',
        choice1: 'Sol e Plutão',
        choice2: 'Terra e Lua',
        choice3: 'Sol e Terra',
        choice4: 'Sol e Marte',
        answer: 3,
        supportText: 'Dica: essa é decoreba.'
    },{
        question: 'Um método para medir a distância das estrelas até nós é o(a)',
        choice1: 'desvio para o azul',
        choice2: 'paralaxe heliocêntrica',
        choice3: 'desvio para o vermelho',
        choice4: 'efeito Doppler',
        answer: 2,
        supportText: 'Dica: parecida com outra questão.'
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/astronomia/endastro.html')
    }

    questionCounter++
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
    attempts = 2; // Reseta as tentativas para a nova pergunta
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'incorrect') {
            attempts--;
            if (attempts > 0) {
                Swal.fire({
                    title: 'Resposta Incorreta!',
                    text: `Tentativas restantes: ${attempts}\n${currentQuestion.supportText}`,
                    imageUrl: '../assets/img/error-10376.svg',
                    confirmButtonText: 'Tentar Novamente',
                    imageWidth: 80,
                    imageHeight: 80,
                    imageAlt: 'Ícone de erro customizado',
                });
                acceptingAnswers = true; // Permite que o usuário tente novamente
            } else {
                Swal.fire({
                    title: 'Sem mais tentativas!',
                    text: 'A resposta correta era: ' + currentQuestion['choice' + currentQuestion.answer],
                    imageUrl: '../assets/img/error-10376.svg',
                    confirmButtonText: 'Tentar Novamente',
                    imageWidth: 80,
                    imageHeight: 80,
                    imageAlt: 'Ícone de erro customizado',
                }).then(() => {
                    getNewQuestion();
                });
            }
        } else if (classToApply === 'correct') {
            Swal.fire({
                title:'Correto!',
                text: 'Parabéns, você acertou!',
                confirmButtonText: 'Próxima pergunta',
                imageUrl: '../assets/img/check-7050.svg',
                imageWidth: 80,
                imageHeight: 80,
                imageAlt: 'Ícone de check customizado',    

            }).then(() => {
                incrementScore(SCORE_POINTS);
                getNewQuestion();
            })
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();