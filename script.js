const generalKnowledgeQuestions = [
    // General Knowledge questions here
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            {text: "Mount Everest", correct: true},
            {text: "K2", correct: false},
            {text: "Sahyadri", correct: false},
            {text: "Kilimanjaro", correct: false}, 
        ] 
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}, 
        ] 
    }
];

const historyQuestions = [
    // History questions here
    {
        question: "Who is credited with discovering America?",
        answers: [
            {text: "Christopher Columbus", correct: true},
            {text: "Amerigo Vespucci", correct: false},
            {text: "Ferdinand Magellan", correct: false},
            {text: "Vasco da Gama", correct: false}, 
        ] 
    },
    {
        question: "Which year did World War II end?",
        answers: [
            {text: "1945", correct: true},
            {text: "1939", correct: false},
            {text: "1918", correct: false},
            {text: "1941", correct: false}, 
        ] 
    }
];

const cricketQuestions = [
    // Cricket questions here
    {
        question: "Which country won the ICC Cricket World Cup in 2019?",
        answers: [
            {text: "England", correct: true},
            {text: "India", correct: false},
            {text: "Australia", correct: false},
            {text: "New Zealand", correct: false}, 
        ] 
    },
    {
        question: "Who is the leading run-scorer in Test cricket?",
        answers: [
            {text: "Sachin Tendulkar", correct: false},
            {text: "Ricky Ponting", correct: false},
            {text: "Brian Lara", correct: false},
            {text: "Kumar Sangakkara", correct: true}, 
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];

function loadGeneralKnowledge() {
    currentQuestions = generalKnowledgeQuestions;
    startQuiz();
}

function loadHistory() {
    currentQuestions = historyQuestions;
    startQuiz();
}

function loadCricket() {
    currentQuestions = cricketQuestions;
    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    document.querySelector('.sections').style.display = "none";
    document.querySelector('.quiz').style.display = "block";
}

const TIMER_DURATION = 10; // Duration of the timer in seconds

let timerInterval; // Variable to store the timer interval
let timerCountdown; // Variable to store the current countdown value

function startTimer() {
  timerCountdown = TIMER_DURATION;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timerCountdown--;
    updateTimerDisplay();

    if (timerCountdown <= 0) {
      clearInterval(timerInterval);
      handleNextButton();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    timerElement.innerText = `Time Left: ${timerCountdown} seconds`;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerCountdown = TIMER_DURATION;
  updateTimerDisplay();
}


function showQuestion() {
    resetState();
    resetTimer(); // Reset the timer for each question
    startTimer();
    const question = currentQuestions[currentQuestionIndex];
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${currentQuestions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < currentQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
