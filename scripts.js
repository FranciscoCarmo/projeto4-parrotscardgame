// FUNÇÕES

// Função que gera o embaralhamento
function comparador() {
  return Math.random() - 0.5;
}

// Vira a carta
function flip(card) {
  card.children[0].classList.add("flipped");
  card.children[1].classList.add("flipped");

  rounds++;
}

// Desvira as cartas que estavam flipped
function unflipCards() {
  let flippedFaces = document.querySelectorAll(".flipped");
  for (const face of flippedFaces) {
    face.classList.remove("flipped");
    face.classList.remove("flipped");
  }
}

// Passa as frentes que estao flipped para correct
function correctCards() {
  let flippedFaces = document.querySelectorAll(".flipped");
  for (const face of flippedFaces) {
    face.classList.add("correct");
    face.classList.add("correct");
  }
}

// Analisa se o jogador ganhou
function didPlayerWin() {
  correctFronts = document.querySelectorAll(".correct");
  if (correctFronts.length == cardNumber * 2) {
    alert(`Você ganhou em ${rounds} jogadas em ${timer} segundos!`);
    won = true;

    setTimeout(reiniciar, 1000);
  }
}

//Analisa se as cartas irao virar ou nao
function processSelectedCard() {
  let card = this;
  if (document.querySelectorAll(".flipped").length > 2)
    unflipCards; //Barra a escolha de mais do que 2 cartas por jogada
  else if (document.querySelector(".flipped") === null) {
    flip(card);
  } else if (
    card.children[0].classList.contains("flipped") ||
    card.children[0].classList.contains("correct")
  ) {
    console.log("Clicou repetido"); // Não faz nada pq clicou na mesma carta
  } else {
    let firstCard = document.querySelector(".flipped");
    let firstCardImg = firstCard.nextElementSibling.firstChild.src;
    let secondCardImg = card.children[0].nextElementSibling.firstChild.src;

    if (firstCardImg == secondCardImg) {
      flip(card);

      correctCards();
      unflipCards();

      setTimeout(didPlayerWin, 500);
    } else {
      flip(card);
      setTimeout(unflipCards, 1000);
    }
  }
}

function addSecond() {
  if (!won) {
    timer++;
    document.querySelector("p").textContent = timer;
  }
}

function reiniciar() {
  let answer = "";
  while (answer !== "sim" && answer !== "não") {
    answer = prompt("Deseja reiniciar a partida? (sim ou não)");

    if (answer == "sim") {
      let correct = document.querySelectorAll(".correct");
      for (const correctCards of correct) {
        correctCards.classList.remove("correct");
      }

      let flipped = document.querySelectorAll(".flipped");
      for (const flippedCards of flipped) {
        flippedCards.classList.remove("flipped");
      }

      //remover todos os gifs
      let gifs = document.querySelectorAll(".back-face>img");
      for (const gif of gifs) {
        gif.remove();
      }

      //reset as variaveis e chama as funcoes
      cardNumber = 0;

      allCards = document.querySelectorAll(".card");
      cards = []; // cria a matriz das cartas do jogo

      iniciar();
      createCards(); //Chama a funcao que cria as cartas

      rounds = 0;
      won = false;
      timer = 0;

      addFlipEvent();
    } else if (answer == "não") {
      return;
    } else {
      alert("A resposta deve ser sim ou não.");
    }
  }
}

function iniciar() {
  while (cardNumber < 4 || cardNumber > 14 || cardNumber % 2 == 1) {
    cardNumber = prompt("Quantas cartas terá o jogo? (min = 4 e máx = 14)");
    if (cardNumber < 4 || cardNumber > 14 || cardNumber % 2 == 1)
      alert("O valor deve ser um número par entre 4 e 14.");
  }
}

function createCards() {
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].classList.add("hidden");
  }

  for (let i = 0; i < cardNumber; i++) {
    allCards[i].classList.remove("hidden");
    cards.push(allCards[i]);
  }

  // Cria matriz dos links dos gifs
  let gifs = [
    "images/bobrossparrot.gif",
    "images/bobrossparrot.gif",
    "images/explodyparrot.gif",
    "images/explodyparrot.gif",
    "images/fiestaparrot.gif",
    "images/fiestaparrot.gif",
    "images/metalparrot.gif",
    "images/metalparrot.gif",
    "images/revertitparrot.gif",
    "images/revertitparrot.gif",
    "images/tripletsparrot.gif",
    "images/tripletsparrot.gif",
    "images/unicornparrot.gif",
    "images/unicornparrot.gif",
  ];

  let selectedGifs = [];

  // Seleciona o numero correto de gifs
  for (let i = 0; i < cardNumber; i++) {
    selectedGifs.push(gifs[i]);
  }

  //Embaralha os links
  selectedGifs = selectedGifs.sort(comparador); // Após esta linha, a minhaArray estará embaralhada

  for (let i = 0; i < cardNumber; i++) {
    let img = document.createElement("img");
    let faceDown = cards[i].querySelector(".back-face");
    img.src = selectedGifs[i];
    faceDown.appendChild(img);
  }
}

function addFlipEvent() {
  for (const card of cards) {
    card.addEventListener("click", processSelectedCard);
  }
}

// CÓDIGO

let cardNumber = 0;

let allCards = document.querySelectorAll(".card");
let cards = []; // cria a matriz das cartas do jogo
let rounds = 0;
let won = false;
let timer = 0;

iniciar();
createCards(); //Chama a funcao que cria as cartas

addFlipEvent();

setInterval(addSecond, 1000);
