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
    alert(`Você ganhou em ${rounds} jogadas!`);
  }
}

// CÓDIGO

let cardNumber = 0;

while (cardNumber < 4 || cardNumber > 14 || cardNumber % 2 == 1) {
  cardNumber = prompt("Quantas cartas terá o jogo? (min = 4 e máx = 14)");
  if (cardNumber < 4 || cardNumber > 14 || cardNumber % 2 == 1)
    alert("O valor deve ser um número par entre 4 e 14.");
}

let allCards = document.querySelectorAll(".card");
let cards = []; // cria a matriz das cartas do jogo

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

let rounds = 0;

//Analisa se as cartas irao virar ou nao
function processSelectedCard() {
  let card = this;
  if (document.querySelector(".flipped") === null) {
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

// virar a carta
for (const card of cards) {
  card.addEventListener("click", processSelectedCard);
}
