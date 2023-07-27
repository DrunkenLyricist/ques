var timeLeft = 0;
var countdown;
var score = 0;
var masterTime = 0;
var audio = new Audio("C:/Users/DrunkenLyricist/Desktop/07_radiate.mp3");
var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

var timerInput = prompt("For one question?");
if (timerInput) {
  timeLeft = parseInt(timerInput) * 60; // Convert minutes to seconds
}

var masterTimeInput = prompt("How long?");
if (masterTimeInput) {
  masterTime = parseInt(masterTimeInput) * 60; // Convert minutes to seconds
}

document.body.onkeyup = function (e) {
  if (isMobileDevice) return; // Ignore key events on mobile devices

  if (e.keyCode == 13) { // Spacebar keycode
    resetTimer();
    increaseScore();
  } else if (e.keyCode == 8 && timeLeft == 0) { // Backspace keycode
    restartTimer();
  }
};

if (isMobileDevice) {
  var enterButton = document.getElementById("enterButton");
  enterButton.style.display = "block";

  enterButton.addEventListener("click", function () {
    resetTimer();
    increaseScore();
  });
} else {
  var enterButton = document.getElementById("enterButton");
  enterButton.style.display = "none";

  document.addEventListener("click", function () {
    playMusic();
  });
}



function updateTimer() {
  if (masterTime == 0) {
    clearInterval(countdown);
    showGameExhaustedScreen();
    stopMusic();
    return;
  }

  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft % 60;

  var timerElement = document.getElementById("timer");
  timerElement.innerHTML = ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);

  if (timeLeft == 0) {
    clearInterval(countdown);
    restartTimer();
    decreaseScore();
    playMusic();
  } else {
    timeLeft--;
    masterTime--; // Decrement the master time
  }
  if (score < 0) {
    showLoseScreen();
  }

  updateMasterTimeDisplay();
}

function playMusic() {
  // Play the audio only if it's paused to avoid overlapping audio
  if (audio.paused) {
    audio.play().catch(function (error) {
      // In case of an error, you can handle it here (optional)
      console.error("Audio playback failed: ", error);
    });
  }
}

function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
}

function resetTimer() {
  timeLeft = parseInt(timerInput) * 60; // Reset the timer back to the initial value
}

function restartTimer() {
  timeLeft = parseInt(timerInput) * 60; // Restart the timer back to the initial value
  countdown = setInterval(updateTimer, 1000); // Start the countdown again
  document.getElementById("master-time").innerHTML = masterTimeInput + ":00";
  document.getElementById("timer").innerHTML = timerInput + ":00";
  document.getElementById("score").innerHTML = "0";
}

function increaseScore() {
  score += 1;
  updateScoreDisplay();
}

function decreaseScore() {
  score -= 1;
  updateScoreDisplay();
}

function updateScoreDisplay() {
  var scoreElement = document.getElementById("score");
  scoreElement.innerHTML = score;
}

function updateMasterTimeDisplay() {
  var minutes = Math.floor(masterTime / 60);
  var seconds = masterTime % 60;
  var masterTimeElement = document.getElementById("master-time");
  masterTimeElement.innerHTML = ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
}

function showLoseScreen() {
  var scoreElement = document.getElementById("score");
  scoreElement.innerHTML = "Final Score: " + score;

  var loseScreenElement = document.createElement("div");
  loseScreenElement.innerHTML = "you lose";

  var containerElement = document.createElement("div");
  containerElement.appendChild(loseScreenElement);
  containerElement.appendChild(scoreElement);

  document.body.innerHTML = "";
  document.body.appendChild(containerElement);
}

function showGameExhaustedScreen() {
  var scoreElement = document.getElementById("score");
  scoreElement.innerHTML = "Final Score: " + score;

  var exhaustedScreenElement = document.createElement("div");
  exhaustedScreenElement.innerHTML = "Game Exhausted";

  var containerElement = document.createElement("div");
  containerElement.appendChild(exhaustedScreenElement);
  containerElement.appendChild(scoreElement);

  document.body.innerHTML = "";
  document.body.appendChild(containerElement);
}

if (masterTime > 0 && timeLeft > 0) {
  countdown = setInterval(updateTimer, 1000); // Start the countdown
}
