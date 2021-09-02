// const playerScreen = document.querySelector('#player_details_score')
// const playerName = document.querySelector('#player_details_name')
// const computerScreen = document.querySelector('#computer_details_score')
// const computerName = document.querySelector('#computer_details_name')
const playerButtons = document.querySelectorAll(".player_side .btn");
const resetButton = document.querySelector(".computer_side .reset");
const resultText = document.querySelector("#result_text");
const selector = document.querySelector("#selector");
const gameImagesDiv = document.querySelector("#game-images");

//am grupat toate proprietatile ce tin de player/user
const player = {
  name: document.querySelector("#player_details_name"),
  screen: document.querySelector("#player_details_score"),
  score: 0,
  scoreAnimationTimerId: null, // 🢣 timer-id player 🢣 pt a inlatura setTimeout API in cazul mai multe instante ale acestuia
};
//am grupat toate proprietatile ce tin de computer
const computer = {
  name: document.querySelector("#computer_details_name"),
  screen: document.querySelector("#computer_details_score"),
  choices: ["rock", "paper", "scissors"],
  score: 0,
  scoreAnimationTimerId: null, // 🢣 timer-id computer 🢣 pt a inlatura setTimeout API in cazul mai multe instante ale acestuia
};

let maxScore = 3,
  gameOver = false,
  imagesTimerId,
  resultTextTimerId,
  coreLogicTimerId;

//adaug un event listener pt fiecare buton si preiau valoarea acestuia
for (let button of playerButtons) {
  button.addEventListener("click", function () {
    //apelez functia cu argumentul fiind valoarea butonului selectat
    play(this.value);

    // disableButtons(true);
  });
}

//selectez numarul maxim de jocuri
selector.addEventListener("change", function (ev) {
  maxScore = parseInt(this.value);
  reset();
});

//setez butonul de reset
resetButton.addEventListener("click", reset);

//functie ce-mi verifica si termina timerul existent
const checkAndClearTimer = (timerId) => {
  if (timerId) {
    clearTimeout(timerId);
  }
};

function play(userPick) {
  if (!gameOver) {
    const computerPick = computer.choices[Math.floor(Math.random() * 3)];

    // apelez functia ce implementeaza animatiile pt aceste alegeri
    gameImagesAnimation({ player: userPick, computer: computerPick });

    // console.log("user ->", userPick);
    // console.log("computer ->", computerPick);

    // implementez timer pt a intarzia executarea si actualizarea logicii de baza 🢣 vreau sa astepte pana cand se executa animatiile imaginilor de joc
    checkAndClearTimer(coreLogicTimerId);
    coreLogicTimerId = setTimeout(() => {
      if (computerPick === userPick) {
        console.log("Remiza, incearca din nou");
        resultText.innerText = "..DRAW..";
      } else if (
        (computerPick === "rock" && userPick === "scissors") ||
        (computerPick === "paper" && userPick === "rock") ||
        (computerPick === "scissors" && userPick === "paper")
      ) {
        console.log("computer won");
        upScore(computer, player);
      } else {
        console.log("user won");
        upScore(player, computer);
      }

      resultText.classList.add("show");
      checkAndClearTimer(resultTextTimerId);
      resultTextTimerId = setTimeout(() => {
        resultText.classList.remove("show");
        resultTextTimerId = null; // 🢣 practic resetat pt a nu executa functia clearTimeout la fiecare executie a codului
      }, 1200);

      coreLogicTimerId = null;
    }, 300);
  }
}

//functie generica ce updateaza scorul si adauga stilizarile 🢣 1-ul parametru a castigat +1 ...
function upScore(player, opponent) {
  resultText.innerText = `${player.name.innerText} WON`;
  player.score += 1;

  // am un timer pe fiecare oponent 🢣 aici verific daca am deja un timer setat pe castigatorul acestei reprize
  checkAndClearTimer(player.scoreAnimationTimerId);

  // 🢣 verificare daca s-a atins scorul final si declararea unui castigator
  if (player.score === maxScore) {
    gameOver = true;
    player.name.classList.add("winner"); // aici puteam adauga o clasa direct pe elem parinte si evitam adaugarea multipla
    player.screen.classList.add("winner");
    opponent.name.classList.add("loser");
    opponent.screen.classList.add("loser");
    disableButtons(true);
  }

  player.screen.innerText = player.score;

  player.screen.classList.add("bump");
  player.scoreAnimationTimerId = setTimeout(() => {
    player.screen.classList.remove("bump");
    player.scoreAnimationTimerId = null;
  }, 300);
}

function reset() {
  gameOver = false;
  resultText.textContent = "Let's game";
  for (let el of [player, computer]) {
    el.score = 0;
    el.screen.textContent = 0;
    el.name.classList.remove("winner", "loser");
    el.screen.classList.remove("winner", "loser");
  }
  disableButtons(false);
}

// ultima adaugata 🢣 daca vreau sa le dezactivez, in caz contrar le reactivez
function disableButtons(disable) {
  if (disable) {
    for (let button of playerButtons) {
      button.disabled = true;
    }
  } else {
    for (let button of playerButtons) {
      button.disabled = false;
    }
  }
}

// ********************** functions for animations

// functie ce-mi anima imaginile jocului
function gameImagesAnimation(picks) {
  checkAndClearTimer(imagesTimerId);

  //selectez toate imaginile si verific pe fiecare in parte daca contine aceasta clasa  *********poate fi adaugata intr-o functie
  const gameImages = gameImagesDiv.querySelectorAll("img");
  for (let img of gameImages) {
    if (img.classList.contains("move-right"))
      img.classList.remove("move-right");
    if (img.classList.contains("move-left")) img.classList.remove("move-left");
  } // trebuie sa le inlatur pt ca de fiecare data imi adauga clasele acestea pe imagini diferite.

  // selectez si adaug animatiiile pe imagini
  const playerImg = document.querySelector(`.player_choices__${picks.player}`);
  const computerImg = document.querySelector(
    `.computer_choices__${picks.computer}`
  );
  playerImg.classList.add("move-right");
  computerImg.classList.add("move-left");

  imagesTimerId = setTimeout(() => {
    playerImg.classList.remove("move-right");
    computerImg.classList.remove("move-left");
    imagesTimerId = null; // la sfarsitul timerului reinitializez variabila pt id

    // disableButtons(false);
  }, 1500);
}

// Varianta medie
// if(computer === user)
//     console.log('Draw. Try again')
// else if (computer === 'rock' && user === 'paper')
//     console.log('User win')
// else if (computer === 'scissor' && user === 'rock')
//     console.log('User win')
// else if (computer === 'paper' && user === 'scissor')
//     console.log('User win')
// else if (computer === 'rock' && user === 'scissor')
//     console.log('Computer win')
// else if (computer === 'scissor' && user === 'paper')
//     console.log('Computer win')
// else console.log('Computer win')

// alta varianta mai lunga
// if (computer === user){
//     console.log('Remiza')
// }else if( computer === 'rock'){
//         if( user === 'scissors' ) {
//             console.log('computer won')
//         }else { console.log ('user won')}
// }else if( computer === 'paper'){
//         if ( user === 'rock'){
//             console.log('computer won')
//         }else { console.log('user won')}
// }else if (user === 'paper'){
//         console.log('computer won')
//         }else console.log('user won')
