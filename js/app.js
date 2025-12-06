let startTime = 0;
let elapsed = 0;
let timerInterval;

const display = document.getElementById("timerDisplay");
const lapsList = document.getElementById("lapsList");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

function formatTime(ms) {
  let totalSeconds = ms / 1000;
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = Math.floor(totalSeconds % 60);
  let centi = Math.floor((ms % 1000) / 10);

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0") +
    "." +
    String(centi).padStart(2, "0")
  );
}

function startTimer() {
  if (timerInterval) return;

  startTime = Date.now() - elapsed;

  timerInterval = setInterval(() => {
    elapsed = Date.now() - startTime;
    display.textContent = formatTime(elapsed);
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsed = 0;
  display.textContent = "00:00:00.00";
  lapsList.innerHTML = "";
}

function addLap() {
  lapsList.scrollTop = lapsList.scrollHeight;

  if (elapsed === 0) return;

  const li = document.createElement("li");
  li.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(
    elapsed
  )}`;
  lapsList.appendChild(li);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
