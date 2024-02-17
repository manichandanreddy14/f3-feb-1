let timers = [];

function startTimer(hours, minutes, seconds) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  const timerObject = {
    hours,
    minutes,
    seconds,
    totalSeconds,
    intervalId: null,
    displayElement: null
  };

  timers.push(timerObject);

  const displayElement = createTimerDisplay(timerObject);
  timerObject.displayElement = displayElement;

  timerObject.intervalId = setInterval(() => {
    updateTimer(timerObject);
  }, 1000);
}

function createTimerDisplay(timer) {
  const timerDisplay = document.createElement("div");
  timerDisplay.classList.add("timer");
  document.getElementById("active-timers-section").appendChild(timerDisplay);

  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop Timer";
  stopButton.addEventListener("click", () => stopTimer(timer));

  timerDisplay.appendChild(stopButton);

  return timerDisplay;
}

function updateTimer(timer) {
  timer.totalSeconds--;

  if (timer.totalSeconds < 0) {
    clearInterval(timer.intervalId);
    handleTimerEnd(timer);
  } else {
    const hours = Math.floor(timer.totalSeconds / 3600);
    const minutes = Math.floor((timer.totalSeconds % 3600) / 60);
    const seconds = timer.totalSeconds % 60;

    timer.displayElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

function stopTimer(timer) {
  clearInterval(timer.intervalId);
  removeTimer(timer);
}

function handleTimerEnd(timer) {
  timer.displayElement.classList.add("timer-ended");
  document.getElementById("timer-alert").play();
}

function removeTimer(timer) {
  const index = timers.indexOf(timer);
  if (index !== -1) {
    timers.splice(index, 1);
    timer.displayElement.remove();
  }
}

document.getElementById("startTimerButton").addEventListener("click", () => {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  if (hours > 0 || minutes > 0 || seconds > 0) {
    startTimer(hours, minutes, seconds);
  } else {
    alert("Please enter a valid time.");
  }
});
