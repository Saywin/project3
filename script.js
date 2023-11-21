'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0'); 
const player1Element = document.querySelector('.player--1'); 

let totalScores, currentScore, activePlayer, isPlaying; // переменные для того чтоб в функции передать им значения
//Создали функцию в которой собрали все начальные параметры
const initGame = function(){
    diceElement.classList.add('hidden');
     totalScores = [0, 0];
     currentScore = 0;
     activePlayer = 0; 
     isPlaying = true; 
    score0Element.textContent = 0;  // обнуляем счет для 1 игрока 
    score1Element.textContent = 0; //// обнуляем счет для 1 игрока 
    current0Element.textContent = 0; // обнуляем текущие очки для 1 игрока
    current1Element.textContent = 0; //обнуляем текущие очки для 2 игрока
    diceElement.classList.add('hidden'); //добавляем свойство скрыть кубик
    player0Element.classList.remove('player--winner');//убираем класс css игрок выиграл для 1 игрока
    player1Element.classList.remove('player--winner'); //убираем класс css игрок выиграл для 2 игрока
    player0Element.classList.remove('player--active'); //убираем класс css активный игрок для 1 игрока
    player1Element.classList.remove('player--active'); ////убираем класс css активный игрок для 2 игрока
    player0Element.classList.add('player--active'); // Добавляем класс активный игрок 1 игроку
}
initGame(); //вызываем функцию вначале для обнуления всех счетчиков

const switchActivePlayer = function(){
    currentScore = 0; 
    document.getElementById(`current--${activePlayer}`).textContent = currentScore; 
    activePlayer = activePlayer === 1 ? 0 : 1; 
    player0Element.classList.toggle('player--active'); 
    player1Element.classList.toggle('player--active'); 
}; 
btnRoll.addEventListener('click', function(){
    if (isPlaying){ 
   const diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`
    if (diceNumber !== 1) {
        currentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`)
        .textContent = currentScore; 
    }else { 
        switchActivePlayer()
    }}
})
btnHold.addEventListener('click', function(){
    if(isPlaying){
    totalScores[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer]; 
   if(totalScores[activePlayer] >= 100){
    isPlaying = false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');  
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); 
    switchActivePlayer();
    diceElement.classList.add('hidden');
   } else {
    switchActivePlayer();
   }
}
})

btnNew.addEventListener('click', initGame); // Клик новая игра вызывает функцию initGame