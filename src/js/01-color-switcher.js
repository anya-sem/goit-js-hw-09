const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body')

startButton.addEventListener("click", onClick)
stopButton.addEventListener("click", offClick)

function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }

let intervalId;

function onClick() {
      startButton.disabled = true;
      stopButton.disabled = false;

      intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
}

function offClick() {
      startButton.disabled = false;
      stopButton.disabled = true;

      clearInterval(intervalId);
}
