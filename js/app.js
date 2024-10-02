// 1) Define the required variables used to track the state of the game.

// 2) Store cached element references.

// 3) Upon loading, the game state should be initialized, and a function should 
//    be called to render this game state.

// 4) The state of the game should be rendered to the user.

// 5) Handle the game over logic. 

// 6) Handle each instance of a player clicking a button with the use of a 
//    `handleClick()` function.

// 7) Create reset functionality.

/*-------------------------------- Constants --------------------------------*/

const state = {
    boredom: 0,
    hunger: 0,
    sleepiness: 0,
}

/*---------------------------- Variables (state) ----------------------------*/

let timer;
let gameOver;

/*------------------------ Cached Element References ------------------------*/

// spans
const boredomStatEl = document.querySelector("#boredom-stat");
const hungerStatEl = document.querySelector("#hunger-stat");
const sleepinessStatEl = document.querySelector("#sleepiness-stat");
const gameMessageEl = document.querySelector("#message");

// buttons
const playBtnEl = document.querySelector("#play");
const feedBtnEl = document.querySelector("#feed");
const sleepBtnEl = document.querySelector("#sleep");
const sectionBtnEl = document.querySelector(".button-wrapper"); // get parent element and use event bubbling instead
const resetBtnEl = document.querySelector("#restart");

/*-------------------------------- Functions --------------------------------*/

// invoke initiate function on load
init();

function init() {
    gameOver = false;
    // run every 2 seconds
    timer = setInterval(runGame, 2000);
    // hide reset and game message
    resetBtnEl.classList.add("hidden");
    gameMessageEl.classList.add("hidden");
    // enable all buttons
    playBtnEl.classList.remove("disable");
    feedBtnEl.classList.remove("disable");
    sleepBtnEl.classList.remove("disable");
    playBtnEl.disabled = false;
    feedBtnEl.disabled = false;
    sleepBtnEl.disabled = false;
    // reset values
    state.boredom = 0;
    state.hunger = 0;
    state.sleepiness = 0;
    // display 
    render();
}

function runGame() {
    updateStates();
    checkGameOver();
    render();
}

function updateStates() {
    // loop through all properties in state and increment it by a random number between 0-3
    for (let key of Object.keys(state)) {
        state[key] += Math.floor(Math.random() * 4);
    }
}

function checkGameOver() {
    // loop through all properties in state
    for (let key of Object.keys(state)) {
        // if any property has a value of 10 or more, end the game
        if (state[key] >= 10) {
            gameOver = true;
        }
    }
}

const handleGameBtnClick = (event) => {
    // reset the button clicked
    switch (event.target.id) {
        case "play":
            state.boredom = 0
            break;
        case "feed":
            state.hunger = 0
            break;
        case "sleep":
            state.sleepiness = 0
            break;
    }
    // update values displayed
    render();
}

const handleResetBtnClick = (event) => {
    init();
}

function render() {
    // display the values of each stat from state object
    boredomStatEl.textContent = state.boredom;
    hungerStatEl.textContent = state.hunger;
    sleepinessStatEl.textContent = state.sleepiness;

    // if game is over, clear interval and display game over message
    if (gameOver) {
        clearInterval(timer);
        resetBtnEl.classList.remove("hidden");
        gameMessageEl.classList.remove("hidden");
        // disable all buttons and make them gray
        playBtnEl.disabled = true;
        feedBtnEl.disabled = true;
        sleepBtnEl.disabled = true;
        playBtnEl.classList.add("disable");
        feedBtnEl.classList.add("disable");
        sleepBtnEl.classList.add("disable");
    }
}

/*----------------------------- Event Listeners -----------------------------*/

sectionBtnEl.addEventListener('click', handleGameBtnClick);
resetBtnEl.addEventListener('click', handleResetBtnClick)