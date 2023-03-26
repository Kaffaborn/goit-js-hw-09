const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
}
let intervalId = null;


refs.startBtn.addEventListener('click', colorChanger);
refs.stopBtn.addEventListener('click', stopColorChanger);

function colorChanger() {
    intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.startBtn.disabled = true;
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function stopColorChanger() {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
}