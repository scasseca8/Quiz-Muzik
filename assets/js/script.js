const start_btn = document.querySelector(".start__btn__game");
const info_box = document.querySelector(".info_box");
const overlay = document.getElementById("overlay");
const exit_btn = info_box.querySelector(".buttons .quit");
const continued_btn = info_box.querySelector(".buttons .continued");
const user_box = document.querySelector(".user_box");
const back_btn = user_box.querySelector(".buttons .back");
const continue_btn = user_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

start_btn.addEventListener("click", () => {
  info_box.classList.add("activeInfo");
  overlay.classList.add("activeOverlay");
});

exit_btn.addEventListener("click", () => {
  info_box.classList.remove("activeInfo");
  overlay.classList.remove("activeOverlay");
});

continued_btn.addEventListener("click", () => {
  info_box.classList.remove("activeInfo");
  user_box.classList.add("activeUser");
  overlay.classList.add("activeOverlay");
});

back_btn.addEventListener("click", () => {
  user_box.classList.remove("activeUser");
  info_box.classList.add("activeInfo");
  overlay.classList.add("activeOverlay");
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const userNameInput = document.querySelector(
  ".user_box input[name='username']"
);

continue_btn.onclick = () => {
  userName = userNameInput.value.trim();
  if (userName === "") {
    alert("Por favor, insira seu nome para começar o jogo.");
  } else {
    user_box.classList.remove("activeUser");
    quiz_box.classList.add("activeQuiz");
    shuffle(questions);
    showQuetions(que_count);
    queCounter(que_numb);
    startTimer(15);
    startTimerLine(0);
  }
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  user_box.classList.remove("activeUser");
  info_box.classList.remove("activeInfo");
  overlay.classList.add("activeOverlay");

  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;

  showQuetions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Tempo Restante";
  next_btn.classList.remove("show");
};

quit_quiz.onclick = () => {
  window.location.reload();
  overlay.classList.remove("show");
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {

    que_count++;
    que_numb++;
    showQuetions(que_count);
    queCounter(que_numb); 
    clearInterval(counter);
    clearInterval(counterLine); 
    startTimer(timeValue);
    startTimerLine(widthValue); 
    timeText.textContent = "Tempo Restante";
    next_btn.classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
};

function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

 
  let video_tag = `<video class="question-video" id="question-video" muted>
                         <source src="${questions[index].video}" type="video/mp4">
                         Your browser does not support the video tag.
                     </video>`;

  let que_tag = `<span>${questions[index].question}</span>`;
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";

  que_text.innerHTML = que_tag + video_tag;
  option_list.innerHTML = option_tag; 

  const videoElement = document.getElementById("question-video");
  videoElement.addEventListener("click", togglePlayPause);
  videoElement.addEventListener("play", muteDuringMiddle);

  const option = option_list.querySelectorAll(".option");


  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}


function togglePlayPause() {
  const videoElement = document.getElementById("question-video");
  if (videoElement.paused) {
    videoElement.play();
  } else {
    videoElement.pause(); 
  }
}


function muteDuringMiddle() {
  const videoElement = document.getElementById("question-video");


  const muteStart = videoElement.duration / 2; 
  const muteEnd = muteStart + 2;

  videoElement.addEventListener("timeupdate", () => {

    if (
      videoElement.currentTime >= muteStart &&
      videoElement.currentTime <= muteEnd
    ) {
      videoElement.muted = true; 
    } else {
      videoElement.muted = false; 
    }
  });
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter); 
  clearInterval(counterLine); 
  let userAns = answer.textContent; 
  let correcAns = questions[que_count].answer;
  const allOptions = option_list.children.length; 

  if (userAns == correcAns) {

    userScore += 10; 
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag); 
  } else {
    answer.classList.add("incorrect"); 
    answer.insertAdjacentHTML("beforeend", crossIconTag); 

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {

        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show"); 
}


function startQuiz() {
  const nameInput = document.querySelector("#nameInput");
  userName = nameInput.value; 
  if (!userName) {
    alert("Por favor, insira seu nome antes de começar o quiz.");
    return;
  }
  info_box.classList.add("activeInfo");
}

let userName = "";
let userAttempts = 0;
let incorrectAnswers = 0;

function showResult(gameOver = false) {
  info_box.classList.remove("activeInfo");
  user_box.classList.remove("activeUser");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");

  const scoreText = result_box.querySelector(".score_text");
  const maxScore = questions.length * 10;
  const correctAnswers = userScore / 10;

  let scoreTag = gameOver
    ? `
      <span>Que pena, <strong>${userName}</strong>! 😞</span>
      <p>Você errou 3 perguntas e perdeu o jogo.</p>
      <p>Sua pontuação foi <strong>${userScore}</strong>.</p>
    `
    : `
      <span>Parabéns, <strong>${userName}</strong>! 🎉🎊</span>
      <p>Você acertou <strong>${correctAnswers}</strong> de <strong>${questions.length}</strong> perguntas.</p>
      <p>Sua pontuação total foi <strong>${userScore}</strong> de <strong>${maxScore}</strong> pontos possíveis!</p>
    `;

  scoreText.innerHTML = scoreTag;


  saveToLocalStorage();
}

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correcAns = questions[que_count].answer;
  const allOptions = option_list.children.length;

  if (userAns === correcAns) {
    userScore += 10;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
  } else {
    incorrectAnswers++; 
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent === correcAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
      }
    }

    
    if (incorrectAnswers === 3) {
      showResult(true);
      return;
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show");
}

restart_quiz.onclick = () => {
  userAttempts++; 
  saveToLocalStorage(); 

  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  user_box.classList.remove("activeUser");
  info_box.classList.remove("activeInfo");
  overlay.classList.add("activeOverlay");

  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0; 
  widthValue = 0;
  incorrectAnswers = 0; 

  showQuetions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Tempo Restante";
  next_btn.classList.remove("show");
};

function saveToLocalStorage() {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  const userData = { name: userName, score: userScore, attempts: userAttempts };

  const userIndex = scores.findIndex((user) => user.name === userName);

  if (userIndex !== -1) {
    scores[userIndex].score += userScore;
    scores[userIndex].attempts += 1;
  } else {
    scores.push(userData);
  }

  localStorage.setItem("quizScores", JSON.stringify(scores));
}

document.addEventListener("DOMContentLoaded", () => {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  const currentUser = scores.find((user) => user.name === userName);

  if (currentUser) {
    userAttempts = currentUser.attempts;
  }
});


function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--; 
    if (time < 9) {

      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; 
    }
    if (time < 0) {
      
      clearInterval(counter); 
      timeText.textContent = "Tempo acabou";
      const allOptions = option_list.children.length;
      let correcAns = questions[que_count].answer;
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
        
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
          console.log("Tempo acabou: Resposta selecionada automaticamente.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.classList.add("show"); 
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 14);
  function timer() {
    time += 1;
    time_line.style.width = time + "px"; 
    if (time > 1100) {
     
      clearInterval(counterLine); 
    }
  }
}

function queCounter(index) {

  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> das <p>" +
    questions.length +
    "</p> Perguntas</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; 
}

overlay.addEventListener("click", () => {
  info_box.classList.remove("activeInfo");
  user_box.classList.remove("activeUser");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.remove("activeResult");
  overlay.classList.remove("activeOverlay");
});
