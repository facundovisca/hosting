let likesCount = {};
let hatesCount = {};

document.getElementById("likeButton").addEventListener("click", function () {
  const speech = document.getElementById("speech").value.trim();
  if (speech) {
    likesCount[speech] = (likesCount[speech] || 0) + 1;
    updateCounts(speech, "like");
    addNodeFromSpeech(speech, "like");
  }
});

document.getElementById("hateButton").addEventListener("click", function () {
  const speech = document.getElementById("speech").value.trim();
  if (speech) {
    hatesCount[speech] = (hatesCount[speech] || 0) + 1;
    updateCounts(speech, "hate");
    addNodeFromSpeech(speech, "hate");
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateCounts(speech, type) {
  if (speech) {
    let currentCount = type === "like" ? likesCount[speech] || 0 : hatesCount[speech] || 0;
    let increment = getRandomInt(10, 50); // Incremento aleatorio
    let limit = getRandomInt(10000, 1000000); // Límite máximo aleatorio
    let stopTime = getRandomInt(5000, 20000); // Tiempo de detención aleatorio entre 30 y 50 segundos
    let interval = setInterval(function () {
      currentCount += increment; // Suma aleatoria
      if (type === "like") {
        document.getElementById(`likeCount_${speech}`).innerText = currentCount;
      } else {
        document.getElementById(`hateCount_${speech}`).innerText = currentCount;
      }
      if (currentCount >= limit) {
        // Cambia el valor de parada al límite aleatorio
        clearInterval(interval);
      }
    }, 5); // Intervalo más corto para una velocidad más rápida
    setTimeout(function () {
      clearInterval(interval);
    }, stopTime); // Detener después de un tiempo aleatorio
  }
}

function addNodeFromSpeech(speech, type) {
  const outputDiv = document.getElementById("output");
  if (speech) {
    let newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `
      <p class="speech ${type === "like" ? "like-text" : "hate-text"}">${speech}</p>
      <div class="counter">
        <span class="like">Me gusta: <span id="likeCount_${speech}">${likesCount[speech] || 0}</span></span>
        <span class="hate">No me gusta: <span id="hateCount_${speech}">${hatesCount[speech] || 0}</span></span>
      </div>
    `;
    outputDiv.appendChild(newCard);
    document.getElementById("speech").value = "";
  }
}
