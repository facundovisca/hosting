var exitButton = document.getElementById("exit-button");

exitButton.addEventListener("click", function() {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  
  var buttonWidth = exitButton.offsetWidth * 3; // Triplicamos el ancho
  var buttonHeight = exitButton.offsetHeight * 3; // Triplicamos la altura
  
  var maxX = screenWidth - buttonWidth;
  var maxY = screenHeight - buttonHeight;
  
  var randomX = Math.floor(Math.random() * maxX);
  var randomY = Math.floor(Math.random() * maxY);
  
  exitButton.style.left = randomX + "px";
  exitButton.style.top = randomY + "px";
});

document.addEventListener("click", function(event) {
  var imageContainer = document.getElementById("image-container");

  var image = new Image();
  var index = Math.floor(Math.random() * 8) + 1;
  image.src = "data/" + index + ".png";
  image.classList.add("image");

  // Ajustar la posición de la imagen restando 20px en X e Y
  image.style.left = (event.clientX - 100) + "px";
  image.style.top = (event.clientY - 20) + "px";

  imageContainer.appendChild(image);

  // Sonido de clic
  var clickSound = new Audio("data/error.mp3");
  clickSound.play();
});
