const input = document.querySelector('.input'),
    inputMinutes = document.getElementById('minutes'),
    inputSeconds = document.getElementById('seconds'),
    output = document.getElementById('output'),
    outputMinutes = document.getElementById('output__minutes'),
    outputSeconds = document.getElementById('output__seconds'),
    launchBtn = document.getElementById('launchBtn'),
    restartBtn = document.getElementById('restartBtn');

launchBtn.addEventListener("click", startTimer);

function startTimer(){
    if (inputSeconds.value < 0 || inputSeconds.value > 60 || inputMinutes.value < 0){
        alert('Ошибка! Введите корректные значения.')
        return
    }

    input.classList.add('inactive');
    output.classList.add('active');
    
    let minutes = inputMinutes.value;
    let seconds = inputSeconds.value;

    function outputSec(seconds){
        if (seconds >= 0 && seconds < 10){
            outputSeconds.textContent = `0${seconds}`;
        } else {
            outputSeconds.textContent = seconds;
        }
    }
    function outputMin(minutes){
        if (minutes >= 0 && minutes < 10){
            outputMinutes.textContent = `0${minutes}`;
        } else {
            outputMinutes.textContent = minutes;
        }
    }
    outputMin(minutes);
    outputSec(seconds);

    let timerId = setInterval(function setTime() {
        if (seconds == 0){
            if (minutes == 0) {
                clearInterval(timerId);
                return
            }
            minutes--;
            seconds = 59;
            outputMin(minutes);
            outputSec(seconds);
        } else {
            seconds--;
            outputSec(seconds);
            outputMin(minutes);
        }
    }, 1000)


    restartBtn.addEventListener('click', () => {
        clearInterval(timerId);
        input.classList.remove('inactive');
        output.classList.remove('active');
    });
}