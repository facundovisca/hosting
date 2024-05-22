$(document).ready(function() {
  // Arreglos de comentarios
  const likeComments = [
      "¡Me encanta esto!",
      "¡Totalmente de acuerdo!",
      "¡Es genial!",
      "¡Buen punto!",
      "¡Muy interesante!"
  ];

  const hateComments = [
      "No estoy de acuerdo.",
      "la pelotudez mas grande que lei en el dia",
      "las cosas que hay que leer hoy en dia",
      "Esto es terrible.",
      "No me gusta para nada.",
      "¡Qué mal!",
      "Totalmente en desacuerdo."
  ];

  // Función para crear un nuevo tweet con la estética correspondiente
  function createTweet(text, type) {
      // Creamos un nuevo elemento card para el tweet
      var card = $("<div>").addClass("card tweet-card mb-3");

      // Contador de comentarios
      var likeCounter = 0;
      var hateCounter = 0;

      // Contenedor de la imagen y contenido del tweet
      var cardBody = $("<div>").addClass("d-flex align-items-start");

      // Creamos un elemento de imagen para la foto de perfil
      var profileImg = $("<img>").addClass("rounded-circle avatar mr-3").attr("src", "data/user.png");

      // Creamos un elemento de texto para el contenido del tweet
      var tweetContent = $("<div>").addClass("tweet-content");
      var tweetText = $("<p>").text(text);
      tweetContent.append(tweetText);

      // Contenedor para los contadores de comentarios
      var countersContainer = $("<div>").addClass("d-flex align-items-center justify-content-center mt-2");

      // Contador de likes
      var likeCounterElement = $("<div>").addClass("comment-counter mr-3");
      var likeCounterImg = $("<img>").attr("src", "data/like.png").addClass("counter-img");
      likeCounterImg.css({"width": "30px", "height": "30px"});
      var likeCounterText = $("<span>").text(likeCounter).addClass("counter-text");
      likeCounterElement.append(likeCounterImg);
      likeCounterElement.append(likeCounterText);

      // Contador de hates
      var hateCounterElement = $("<div>").addClass("comment-counter");
      var hateCounterImg = $("<img>").attr("src", "data/hate.png").addClass("counter-img");
      hateCounterImg.css({"width": "30px", "height": "30px"});
      var hateCounterText = $("<span>").text(hateCounter).addClass("counter-text");
      hateCounterElement.append(hateCounterImg);
      hateCounterElement.append(hateCounterText);

      // Añadimos la imagen y el contenido al card
      cardBody.append(profileImg);
      cardBody.append(tweetContent);
      card.append(cardBody);

      // Añadimos los contadores al card
      countersContainer.append(likeCounterElement);
      countersContainer.append(hateCounterElement);
      card.append(countersContainer);

      // Dependiendo del tipo (like o hate), aplicamos la clase correspondiente al card
      if (type === "like") {
          card.addClass("like-card");
      } else if (type === "hate") {
          card.addClass("hate-card");
          hateCounterElement.css("color", "red");
      }

      // Insertamos el card en el contenedor de tweets
      $("#tweetList").prepend(card);

      // Añadir comentarios automáticamente
      var commentsInterval = setInterval(function() {
          var commentsContainer = card.find(".comments-container");
          if (commentsContainer.length === 0) {
              commentsContainer = $("<div>").addClass("comments-container mt-2");
              card.append(commentsContainer);
          }

          var commentText = type === "like" ? likeComments[Math.floor(Math.random() * likeComments.length)] : hateComments[Math.floor(Math.random() * hateComments.length)];
          var commentElement = $("<p>").text(commentText).addClass("tweet-comment");
          commentsContainer.append(commentElement);

          // Actualizar contador
          if (type === "like") {
              likeCounter++;
              likeCounterText.text(likeCounter);
          } else if (type === "hate") {
              hateCounter++;
              hateCounterText.text(hateCounter);
          }
      }, 1000);

      // Detener la adición de comentarios cuando se hace clic en la card
      card.click(function() {
          clearInterval(commentsInterval);
      });
  }

  // Evento clic para el botón "Me gusta"
  $("#likeButton").click(function(event) {
      event.preventDefault();
      var tweetText = $("#tweetText").val().trim();
      if (tweetText) {
          createTweet(tweetText, "like");
          $("#tweetText").val(""); // Limpiamos el campo de texto
      }
  });

  // Evento clic para el botón "No me gusta"
  $("#hateButton").click(function(event) {
      event.preventDefault();
      var tweetText = $("#tweetText").val().trim();
      if (tweetText) {
          createTweet(tweetText, "hate");
          $("#tweetText").val(""); // Limpiamos el campo de texto
      }
  });
});
