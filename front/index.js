const template = document.getElementById("card");

async function load() {
  if (navigator.onLine) {
    console.log("online");
  } else {
    console.log("offline");
  }
  const spinner = loader();
  const scoreElement = document.getElementById("score");
  scoreElement.appendChild(spinner);
  try {
    let data;
    if (navigator.onLine) {
      const response = await fetch('http://0.0.0.0:3000/score');
      data = await response.json();
      localStorage.setItem('score', JSON.stringify(data));
      setInterval(async function() {
        const response = await fetch('http://0.0.0.0:3000/score');
        data = await response.json();
        localStorage.setItem('score', JSON.stringify(data));
        scoreElement.textContent = `Team 1: ${data.team1}, Team 2: ${data.team2}`;
      }, 10000);
    } else {
      data = JSON.parse(localStorage.getItem('score'));
    }
    scoreElement.textContent = `Team 1: ${data.team1}, Team 2: ${data.team2}`;
    if (!navigator.onLine) {
      const reloadButton = document.createElement('button');
      reloadButton.textContent = 'Recharger';
      reloadButton.addEventListener('click', function () {
        window.location.reload();
      });

      const offlineMessage = document.createElement('p');
      offlineMessage.textContent = 'Vous êtes actuellement hors ligne.';
      scoreElement.appendChild(offlineMessage);
      scoreElement.appendChild(reloadButton);
    }
    console.log(data);
  } catch (e) {
    console.error('Erreur:', e);
    const errorElement = createErrorElement();
    scoreElement.appendChild(errorElement);
    const reload = (e) => {
      window.removeEventListener("online", reload);
      e.preventDefault();
      errorElement.remove();
      load();
    };
    window.addEventListener("online", reload);
    errorElement.querySelector(".js-reload").addEventListener("click", reload);
  } finally {
    spinner.remove();
  }
}

function error() {
  const div = document.createElement("div");
  div.appendChild(
    document.importNode(document.getElementById("error").content, true)
  );
  return div;
}

function loader() {
  const div = document.createElement("div");
  div.appendChild(
    document.importNode(document.getElementById("loader").content, true)
  );
  return div;
}

function wait(time = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, time);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  load();
});

