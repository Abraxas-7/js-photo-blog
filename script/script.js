function generateCards() {
  const apiUrl = "https://jsonplaceholder.typicode.com/photos?_limit=6";
  const cardContainerElement = document.getElementById("cardsContainer");

  axios
    .get(apiUrl)
    .then((response) => {
      const data = response.data;

      cardContainerElement.innerHTML = "";

      data.forEach((element) => {
        const template = `
          <div class="card shadow">
              <img class="pin" src="../img/pin.svg" alt="pin"/>
  
              <div class="debug card-image">
                  <img src="${element.url}" alt="Photo Number ${element.id}">
              </div>
  
              <div class="debug card-text">
                  <p>${element.title}</p>
              </div>
          </div>
          `;

        cardContainerElement.innerHTML += template;
      });
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
}

window.onload = generateCards();

