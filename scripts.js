// FUNÇÕES

// Função que gera o embaralhamento
function comparador() {
  return Math.random() - 0.5;
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
