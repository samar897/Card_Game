//SELECT ELEMENTS
const cards = document.querySelectorAll(".card");
const cardFronts = document.querySelectorAll(".card-front");
const cardBacks = document.querySelectorAll(".card-back");
const announcement = document.querySelector(".announcement h2");
const totalCount = document.querySelector(".total-counter");
const winCount = document.querySelector(".win-counter");
const lossCount = document.querySelector(".loss-counter");
const resetButton = document.querySelector(".reset-button");
const winSound = document.querySelector(".win-sound");
const loseSound = document.querySelector(".lose-sound");

//DEFINE COUNTERS
let result = "";
let totalCounter = 0;
let winCounter = 0;
let lossCounter = 0;

//INITIALIZE GAME: SHUFFLE CARDS
shuffleCards();

//ON CLICKING A CARD
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    //Flip card (if it is clickable). Once flipped, disable card (to prevent player from cheating)
    if ((e.target.childNodes[3].style.pointerEvents = "auto")) {
      e.target.childNodes[3].classList.toggle("front-flip");
      e.target.childNodes[3].style.pointerEvents = "none";
    }

    if ((e.target.childNodes[1].style.pointerEvents = "auto")) {
      e.target.childNodes[1].classList.toggle("back-flip");
      e.target.childNodes[1].style.pointerEvents = "none";
    }

    //Check if card is flipped, then notes down which card is flipped
    flippedCards();

    //When two cards are flipped, check which is the unflipped one (result will be printed on the unflipped card)
    whichFlippedCards();

    //When two cards are flipped, check if two cards match, log result and reset for new round
    matchingTest(flippedCards(), whichFlippedCards());
  });
});

//ON CLICKING RESET BUTTON
resetButton.addEventListener("click", () => {
  resetRound();
});

//FUNCTIONS
function shuffleCards() {
  let selectedCards = ["❤️","🌸","🌸"];
  let numberOfCards = selectedCards.length;
  let randomIndex = 0;

  while (numberOfCards !== 0) {
    //identify current card to be replaced
    let currentIndex = numberOfCards - 1;

    //grab a random card from the selection
    randomIndex = Math.floor(Math.random() * numberOfCards);
    numberOfCards--;

    //swap positions of random card and current card
    let temp = selectedCards[currentIndex];
    selectedCards[currentIndex] = selectedCards[randomIndex];
    selectedCards[randomIndex] = temp;
  }

  //assign shuffled cards to card backs
  cardBacks.forEach((cardBack, index) => {
    cardBack.innerText = `${selectedCards[index]}`;
  });
}

function flippedCards() {
  let flippedCounter = 0;
  cardBacks.forEach((cardBack, index) => {
    if (cardBack.classList.contains("back-flip")) {
      flippedCounter++;
    }
  });

  return flippedCounter;
}

function whichFlippedCards() {
  let flippedCards = [];
  cardBacks.forEach((cardBack) => {
    if (cardBack.classList.contains("back-flip")) {
      flippedCards.push(cardBack);
    }
  });
  return flippedCards;
}

function whichUnFlippedCards() {
  let unFlippedCard = 0;
  cardBacks.forEach((cardBack, index) => {
    if (!cardBack.classList.contains("back-flip")) {
      unFlippedCard = index;
    }
  });
  return unFlippedCard;
}

function matchingTest(flippedCards, whichFlippedCards) {
  //If two cards have been flipped, disable flipping for all cards, match cards and determine result
  // Otherwise, disable flipping for flipped cards only
  if (flippedCards === 2) {
    cards.forEach((card) => {
      card.style.pointerEvents = "none";
    });

    if (whichFlippedCards[0].innerText === whichFlippedCards[1].innerText) {
      result = "Win";
      setTimeout(announceResult, 500);
      setTimeout(newRound, 1500);
    } else {
      result = "Lose";
      setTimeout(announceResult, 500);
      setTimeout(newRound, 1500);
    }
  } else {
    cardBacks.forEach((cardBack) => {
      if (cardBack.classList.contains("back-flip")) {
        cardBack.parentNode.style.pointerEvents = "none";
      }
    });
  }

  //match cards and determine result
}

function announceResult() {
  let unFlippedCard = whichUnFlippedCards();
  cardFronts[unFlippedCard].textContent = `You ${result}!`;

  if (result === "Win") {
    winSound.play();
  } else {
    loseSound.play();
  }
}

function newRound() {
  //update counter
  if (result === "Win") {
    totalCounter++;
    winCounter++;
    totalCount.textContent = `${totalCounter}`;
    winCount.textContent = `${winCounter}`;
    if(winCounter==3){
        window.open("Second.html");
    }
  } else {
    totalCounter++;
    lossCounter++;
    totalCount.textContent = `${totalCounter}`;
    lossCount.textContent = `${lossCounter}`;
  }

  //flip back cards
  cardBacks.forEach((cardBack) => {
    if (cardBack.classList.contains("back-flip")) {
      cardBack.classList.toggle("back-flip");
    }
  });
  cardFronts.forEach((cardFront) => {
    if (cardFront.classList.contains("front-flip")) {
      cardFront.classList.toggle("front-flip");
    }
    cardFront.textContent = "";
  });

  //shuffle cards
  setTimeout(shuffleCards, 200);

  //make cards flippable again
  cards.forEach((card) => {
    card.style.pointerEvents = "auto";
  });

  //reset sounds
  winSound.pause();
  winSound.currentTime = 0;
  loseSound.pause();
  loseSound.currentTime = 0;
}
function resetRound() {
  //reset counters
  result = "";
  totalCounter = 0;
  winCounter = 0;
  lossCounter = 0;

  //reset results
  totalCount.textContent = `${totalCounter}`;
  winCount.textContent = `${winCounter}`;
  lossCount.textContent = `${lossCounter}`;

  //reset sounds
  winSound.pause();
  winSound.currentTime = 0;
  loseSound.pause();
  loseSound.currentTime = 0;

  //flip back cards
  cardBacks.forEach((cardBack) => {
    if (cardBack.classList.contains("back-flip")) {
      cardBack.classList.toggle("back-flip");
    }
  });
  cardFronts.forEach((cardFront) => {
    if (cardFront.classList.contains("front-flip")) {
      cardFront.classList.toggle("front-flip");
    }
    cardFront.textContent = "";
  });

  //enable flipping of cards for player
  cards.forEach((card) => {
    card.style.pointerEvents = "auto";
  });

  //shuffle cards

  setTimeout(shuffleCards, 200);
}

