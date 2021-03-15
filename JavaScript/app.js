// const playerScreen = document.querySelector('#player_details_score')
// const playerName = document.querySelector('#player_details_name')
// const computerScreen = document.querySelector('#computer_details_score')
// const computerName = document.querySelector('#computer_details_name')
const playerButtons = document.querySelectorAll('.player_side .btn')
const resetButton = document.querySelector('.computer_side .reset')
const resultText = document.querySelector('#result_text')
const selector = document.querySelector('#selector')

//am grupat toate proprietatile ce tin de player/user
const player = {
    name: document.querySelector('#player_details_name'),
    screen: document.querySelector('#player_details_score'),
    score: 0
}
//am grupat toate proprietatile ce tin de computer
const computer = {
    name: document.querySelector('#computer_details_name'),
    screen: document.querySelector('#computer_details_score'),
    choices: ['rock', 'paper', 'scissors'],
    score: 0
}

let maxScore = 3;
let gameOver = false;

for (let button of playerButtons) {
    button.addEventListener('click', function () { 
        //apelez functia cu argumentul fiind valoarea butonului selectat
        play(this.value)
    });
}

//selectez numarul maxim de jocuri
selector.addEventListener('change', function (ev) {
    maxScore = parseInt(this.value);
    reset();
})

//setez butonul de reset
resetButton.addEventListener('click', reset)

function play(userPick) {
    if (!gameOver) {
        const computerPick = computer.choices[Math.floor(Math.random() * 3)];

        console.log('user ->', userPick)
        console.log('computer ->', computerPick)


        if (computerPick === userPick) {
            console.log('Remiza, incearca din nou');
            resultText.innerText = '..DRAW..';

        } else if (computerPick === 'rock' && userPick === 'scissors' || computerPick === 'paper' && userPick === 'rock' || computerPick === 'scissors' && userPick === 'paper') {
            console.log('computer won');
            upScore(computer, player);

        } else {
            console.log('user won');
            upScore(player, computer);
        }
    }
}

function upScore(player, opponent) {
    resultText.innerText = `${player.name.innerText} WON`;
    player.score += 1;

    if (player.score === maxScore) {
        gameOver = true;
        player.name.classList.add('winner')
        player.screen.classList.add('winner')
        opponent.name.classList.add('loser')
        opponent.screen.classList.add('loser')
        for (let button of playerButtons) {
            button.disabled = true;
        }
    }

    player.screen.textContent = player.score;
}

function reset() {
    gameOver = false;
    resultText.textContent = "Let's game";
    for (let el of [player, computer]) {
        el.score = 0;
        el.screen.textContent = 0;
        el.name.classList.remove('winner', 'loser')
        el.screen.classList.remove('winner', 'loser')
    }
    for (let button of playerButtons) {
        button.disabled = false;
    }
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



function updateScore() {

}