const playerButtons = document.querySelectorAll('.player_side .btn')
const playerScreen = document.querySelector('#player_details_score')
const playerName = document.querySelector('#player_details_name')
const computerScreen = document.querySelector('#computer_details_score')
const computerName = document.querySelector('#computer_details_name')
const resetButton = document.querySelector('.computer_side .reset')
const resultText = document.querySelector('#result_text')
const selector = document.querySelector('#selector')


const choices = ['rock', 'paper', 'scissors'];
let maxScore = 3;
let gameOver = false;

let playerScore = 0;
let computerScore = 0;

for (let button of playerButtons) {
    button.addEventListener('click', function (ev) {
        if (!gameOver) {
            const computer = choices[Math.floor(Math.random() * 3)];
            const user = this.value;

            console.log('user ->', user)
            console.log('computer ->', computer)


            if (computer === user) {
                console.log('Remiza, incearca din nou');
                resultText.innerText = 'DRAW';


            } else if (computer === 'rock' && user === 'scissors' || computer === 'paper' && user === 'rock' || computer === 'scissors' && user === 'paper') {
                console.log('computer won');
                resultText.innerText = 'Computer WON';
                computerScore += 1;

                if (computerScore === maxScore) {
                    gameOver = true;
                    computerName.classList.add('winner')
                    computerScreen.classList.add('winner')
                    playerName.classList.add('loser')
                    playerScreen.classList.add('loser')
                    for (let button of playerButtons) {
                        button.disabled = true;
                    }
                }

                computerScreen.textContent = computerScore;


            } else {
                console.log('user won');
                resultText.innerText = 'Player WON';
                playerScore += 1;

                if (playerScore === maxScore) {
                    gameOver = true;
                    playerName.classList.add('winner')
                    playerScreen.classList.add('winner')
                    computerName.classList.add('loser')
                    computerScreen.classList.add('loser')
                    for (let button of playerButtons) {
                        button.disabled = true;
                    }
                }
                
                playerScreen.textContent = playerScore;
            }
        }


    });
}

//selectez numarul maxim de jocuri
selector.addEventListener('change', function (ev) {
    maxScore = parseInt(this.value);
    console.log(maxScore)

    //partea de reset .... (cel mai indicat ar fi sa fac o functie de reset)
    playerScore = 0;
    computerScore = 0;
    playerScreen.textContent = 0;
    computerScreen.textContent = 0;
    resultText.textContent = "Let's game";
    gameOver = false;
    for (let button of playerButtons) {
        button.disabled = false;
    }
    playerName.classList.remove('winner', 'loser')
    playerScreen.classList.remove('winner', 'loser')
    computerName.classList.remove('loser', 'winner')
    computerScreen.classList.remove('loser', 'winner')
})

//setez butonul de reset
resetButton.addEventListener('click', function (ev) {
    //functia de reset <<<--------------
    playerScore = 0;
    computerScore = 0;
    playerScreen.textContent = 0;
    computerScreen.textContent = 0;
    resultText.textContent = "Let's game";
    gameOver = false;
    for (let button of playerButtons) {
        button.disabled = false;
    }
    playerName.classList.remove('winner', 'loser')
    playerScreen.classList.remove('winner', 'loser')
    computerName.classList.remove('loser', 'winner')
    computerScreen.classList.remove('loser', 'winner')

})




// let user = prompt('Pick your choice');







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