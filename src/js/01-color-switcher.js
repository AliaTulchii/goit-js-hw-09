function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
  

}

refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);


let intervalId = null;


function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function onStartClick() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    intervalId = setInterval(changeColor, 1000);
}

function onStopClick() {
    
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;

    clearInterval(intervalId);
}


