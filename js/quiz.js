const API_URL = "questions.json";

let fullQuizData = [];
let activeQuizData = [];
let currentQuestionIndex = 0;
let score = 0;
let userHasAnswered = false;

const screens = {
  loading: document.getElementById("loading-screen"),
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
};

const ui = {
  questionText: document.getElementById("question-text"),
  imageContainer: document.getElementById("image-container"),
  questionImage: document.getElementById("question-image"),
  optionsContainer: document.getElementById("options-container"),
  explanationBox: document.getElementById("explanation-box"),
  explanationText: document.getElementById("explanation-text"),
  nextBtn: document.getElementById("next-btn"),
  questionTracker: document.getElementById("question-tracker"),
  progressBar: document.getElementById("progress-bar"),
  finalScore: document.getElementById("final-score"),
  resultMessage: document.getElementById("result-message"),
  resultIcon: document.getElementById("result-icon"),
};

async function fetchQuestions() {
  try {
    const response = await fetch(API_URL);
    fullQuizData = await response.json();
    screens.loading.classList.add("hidden");
    screens.start.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    ui.questionText.innerText =
      "Error loading questions. Please try again later.";
  }
}

function startQuiz() {
  activeQuizData = fullQuizData.sort(() => 0.5 - Math.random()).slice(0, 10);
  currentQuestionIndex = 0;
  score = 0;
  screens.start.classList.add("hidden");
  screens.result.classList.add("hidden");
  screens.quiz.classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  userHasAnswered = false;
  const q = activeQuizData[currentQuestionIndex];

  ui.explanationBox.classList.add("hidden");
  ui.nextBtn.classList.add("hidden");
  ui.optionsContainer.innerHTML = "";

  ui.questionTracker.innerText = `Question ${currentQuestionIndex + 1} / ${activeQuizData.length}`;
  ui.progressBar.style.width = `${((currentQuestionIndex + 1) / activeQuizData.length) * 100}%`;
  ui.questionText.innerText = q.question;

  if (q.hasImage) {
    ui.imageContainer.classList.remove("hidden");
    ui.questionImage.src = q.imagePath;
  } else {
    ui.imageContainer.classList.add("hidden");
  }

  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className =
      "btn-3d w-full text-left p-4 rounded-2xl border-2 border-b-[6px] border-gray-200 bg-white font-bold text-gray-700 hover:bg-emerald-100 hover:border-emerald-200 hover:border-b-emerald-500 focus:outline-none text-lg";
    btn.innerText = option;
    btn.onclick = () => handleAnswer(option, btn, q);
    ui.optionsContainer.appendChild(btn);
  });
}

function handleAnswer(selectedOption, buttonElement, q) {
  if (userHasAnswered) return;
  userHasAnswered = true;

  const buttons = ui.optionsContainer.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.remove(
      "hover:bg-emerald-100",
      "hover:border-emerald-200",
      "hover:border-b-emerald-500",
    );
    btn.style.cursor = "default";
  });

  if (selectedOption === q.answer) {
    score++;
    buttonElement.className =
      "w-full text-left p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-500 text-white font-bold text-lg shadow-lg transform scale-[1.02] transition-transform";
  } else {
    buttonElement.className =
      "w-full text-left p-4 rounded-2xl border-2 border-red-500 bg-red-50 text-red-700 font-bold text-lg";
    buttons.forEach((btn) => {
      if (btn.innerText === q.answer) {
        btn.className =
          "w-full text-left p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-100 text-emerald-900 font-bold text-lg";
      }
    });
    ui.explanationText.innerText = q.explanation;
    ui.explanationBox.classList.remove("hidden");
  }
  ui.nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < activeQuizData.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  screens.quiz.classList.add("hidden");
  screens.result.classList.remove("hidden");
  ui.finalScore.innerText = score;

  if (score === activeQuizData.length) {
    ui.resultMessage.innerText = "Incredible! You are a certified BSF Expert!";
    ui.resultIcon.innerText = "🌟";
  } else if (score >= activeQuizData.length / 2) {
    ui.resultMessage.innerText =
      "Great job! You have a solid grasp on eco-friendly waste management.";
    ui.resultIcon.innerText = "🌱";
  } else {
    ui.resultMessage.innerText =
      "Good try! There is always more to learn about sustainable practices.";
    ui.resultIcon.innerText = "📚";
  }
}

window.onload = fetchQuestions;
