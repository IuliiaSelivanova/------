const input = document.querySelector('.input'),
    inputMinutes = document.getElementById('minutes'),
    inputSeconds = document.getElementById('seconds'),
    output = document.getElementById('output'),
    outputTime = document.querySelector('.output__timer'),
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

    function outputTimer(minutes, seconds){
        if (seconds >= 0 && seconds < 10){
            outputTime.textContent = `${minutes} : 0${seconds}`;
        } else {
            outputTime.innerHTML = `${minutes} : ${seconds}`;
        }
    }

    outputTimer(minutes, seconds);

    let totalSeconds = +minutes * 60 + +seconds;
    let animate = `polygon ${totalSeconds} linear infinite`;
    let newStyles = document.createElement('style');
    document.head.append(newStyles);
    newStyles.innerHTML = `.output__timer::before{
        animation: polygon ${totalSeconds}s linear forwards;
    }`;

    let timerId = setInterval(function setTime() {
        if (seconds == 0){
            if (minutes == 0) {
                clearInterval(timerId);
                return
            }
            minutes--;
            seconds = 59;
            outputTimer(minutes, seconds);
        } else { 
            seconds--;
            outputTimer(minutes, seconds);
        }
    }, 1000)
    

    restartBtn.addEventListener('click', () => {
        clearInterval(timerId);
        input.classList.remove('inactive');
        output.classList.remove('active');
    });
}