const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score")
    },
    values: {
        
        velocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare,1000),
        countDownTimerID: setInterval(countDown, 1000), 
    }
};
function countDown() {
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerID);
        clearInterval(state.actions.timerId);
        alert("Pontuação: " + state.values.result)
    };
}

function playSound(soundName) {
    let audio = new Audio(`./src/audios/${soundName}.m4a`);
    audio.volume = 0.3;
    audio.play();
}

function randomSquare() {
    state.view.square.forEach((square) =>{
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquareID = state.view.square[randomNumber];
    randomSquareID.classList.add("enemy");
    state.values.hitPosition = randomSquareID.id;
}

function addListenerHitBox() {
    state.view.square.forEach((square) =>{
       square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
       })
    });
    
}

function main() {
    addListenerHitBox();
}

main();