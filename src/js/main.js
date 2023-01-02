// inicializacion de variables
let uncoveredCard = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let counterMovements = 0;
let counterHits = 0;
let timerIsValid = true;
let timer = 60;
let counterTimer = null;
let initialTimer = timer;
let winAudio = new Audio('/src/assets/sounds/win.wav');
let clickAudio = new Audio('/src/assets/sounds/click.wav');
let loseAudio = new Audio('/src/assets/sounds/lose.wav');
let rightAudio = new Audio('/src/assets/sounds/right.wav');
let wrongAudio = new Audio('/src/assets/sounds/wrong.wav');

// obtener documento HTML
const hits = document.querySelector('#hits');
const timeReminning = document.querySelector('#time-remaining');
const movements = document.querySelector('#movements');


// generacion de numeros aleatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(() => Math.random() - 0.5); 

// funciones
const counterTimeReminning = () =>{
    counterTimer = setInterval(() => {
        timer--;
        timeReminning.textContent = `Timer: ${timer} seconds`;
        if(timer === 0){
            clearInterval(counterTimer);
            disabledCards();
            loseAudio.play();
        }
    },1000);
}

const disabledCards = () =>{
    for(let i = 0; i <= 15; i++){
        let disabledCard = document.getElementById(i);
        disabledCard.innerHTML = `<img src="/src/assets/images/${numbers[i]}.png" alt="${numbers[i]}">`;
        disabledCard.disabled = true;
    }
}

// funcion principal
const uncover = (id) =>{

    if(timerIsValid === true){
        counterTimeReminning();
        timerIsValid = false;
    }

    uncoveredCard++;

    if(uncoveredCard === 1){
        // mostrar primer numero
        uncoverFirstCard(id);

    }else if(uncoveredCard === 2){
        // mostrar segundo numero
        uncoverSecondCard(id);

        // evaluar el primer resultado con el seundo resultado
        checkResults();
    }
}

// uncover first card
const uncoverFirstCard = (id) =>{
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = `<img src="/src/assets/images/${firstResult}.png" alt="${firstResult}">`;
    clickAudio.play();
    // deshabilitar y cambiar de color primer boton
    card1.disabled = true;
}

// uncover second card
const uncoverSecondCard = (id) =>{
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = `<img src="/src/assets/images/${secondResult}.png" alt="${secondResult}">`;
    // deshabilitar y cambiar de color segundo numero
    card2.disabled = true;
    counterMovements++;
    movements.textContent = `Movements: ${counterMovements}`;
}

// evaluar primer resultado con el segundo resultado
const checkResults = () => {
    if(firstResult === secondResult){
        // resetear contador uncover card
        uncoveredCard = 0;
        // aumentar hits
        counterHits++;
        hits.textContent = `Hits: ${counterHits}`;
        rightAudio.play();

        // show win result
        win();

    }else{
        wrongAudio.play();
        // mostrar momentaneamente valores y volver a tapar
        setTimeout(() => {
            card1.innerHTML = '';
            card1.disabled = false;
            card2.innerHTML = '';
            card2.disabled = false;
            uncoveredCard = 0;
        },800);
    }
}

const win = () =>{
    if(counterHits === 8){
        winAudio.play();
        clearInterval(counterTimer);
        hits.textContent = `Hits: ${counterHits} 😮`;
        movements.textContent = `Movements: ${counterMovements} 😎`;
        timeReminning.textContent = `Super! you only discouraged ${initialTimer - timer} seconds 🎉🎈`;
    }
}
