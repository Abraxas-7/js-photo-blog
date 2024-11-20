function generateCards() {
  const apiUrl = "https://jsonplaceholder.typicode.com/photos?_limit=6";
  const cardContainerElement = document.getElementById("cardsContainer");

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response);

      const data = response.data;

      console.log(data);

      cardContainerElement.innerHTML = "";

      data.forEach((element) => {
        const template = `
          <div id="card-${element.id}" class="card shadow">
            <img class="pin" src="./img/pin.svg" alt="pin"/>
  
            <div class="debug card-image">
              <img src="${element.url}" alt="Photo Number ${element.id}">
            </div>
  
            <div class="debug card-text">
              <p>${element.title
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}</p> 
            </div>
          </div>
          `; // element.title.split... fa la maiuscola di ogni parola

        cardContainerElement.innerHTML += template;
      });
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
}

window.onload = generateCards();

const body = document.querySelector("body");
const overlay = document.getElementById("overlay");
const overlayImg = document.querySelector("#overlay img");
const overlayButton = document.querySelector("#overlay button");

const cardContainerElement = document.getElementById("cardsContainer");

cardContainerElement.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (card) {
    const img = card.querySelector(".card-image img");
    if (img) {
      overlayImg.src = img.src;
      overlay.classList.remove("d-none");
      body.classList.add("no-scroll");
    }
  }
});

overlayButton.addEventListener("click", () => {
  overlay.classList.add("d-none");
  body.classList.remove("no-scroll");
});

/*
  Quando una carta all'interno di cardContainerElement viene cliccata, il codice cerca l'elemento più vicino con la classe .card
  Quando lo trova restituisce quell'elemento
  Non posso prendere direttamente le card perche quando viene letto il codice ancora non esistono, quindi le faccio risalire dal 
  padre quando le clicco se ci sono

  Event Delegation posso fare eventi su elementi generati dinamicamente, comodo perchè almeno non devo neanche prendere tuttte le cards,
  ci pensa direttamente lui ad agise sulla card che a noi interessa 
*/