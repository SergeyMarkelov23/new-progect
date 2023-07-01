let data = [];
let timerId;
let time = 100;
let selectedIndex = 0;
let loadingCount = 5;
function updateTimer() {
  time -= 0.2;
  if (time <= 0) {
    selectImage(selectedIndex + 1);
    time = 100;
  }
  document.querySelector(".bar").style.width = time + "%";
  startTimer();
}
function toggleTimer(event) {
  if (event.target.textContent === "STOP") {
    event.target.textContent = "PLAY";
    stopTimer();
  } else {
    event.target.textContent = "STOP";
    startTimer();
  }
}
function stopTimer() {
  time = 100;
  document.querySelector(".bar").style.width = time + "%";
  clearTimeout(timerId);
}

function startTimer() {
  timerId = setTimeout(updateTimer, 10);
}

function selectImage(index) {
  selectedIndex = Number(index);
  if (selectedIndex === data.length) {
    loadIamges();
  }
  document.querySelectorAll(".thumb div").forEach((item, i) => {
    if (i === selectedIndex) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
  document.querySelector(".preview img").src = data[selectedIndex].url;
  document.querySelector(".preview img").classList.add("loading");
  document.querySelector(".preview .author").textContent =
    data[selectedIndex].title;
}

function drawImages() {
  const images = document.querySelectorAll(".thumb img");
  data.forEach((item, i) => {
    images[i].src = item.url;
    images[i].classList.add("loading");
  });
  selectImage(0);
}

function loadIamges() {
  loadingCount = 5;
  stopTimer();
  const url = "https://jsonplaceholder.typicode.com/photos";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      data = [
        json[Math.floor(Math.random() * 5000)],
        json[Math.floor(Math.random() * 5000)],
        json[Math.floor(Math.random() * 5000)],
        json[Math.floor(Math.random() * 5000)]
      ];

      drawImages();
    });
}

function onThumbClick(event) {
  if (event.target.tagName !== "IMG") return;
  stopTimer();
  document.querySelector(".play").textContent = "PLAY";
  selectImage(event.target.dataset.index);
}

function removeLoading(event) {
  loadingCount -= 1;
  if (
    loadingCount === 0 &&
    document.querySelector(".play").textContent === "STOP"
  ) {
    startTimer();
  }
  event.target.classList.remove("loading");
}

function init() {
  loadIamges();
  document.querySelector(".thumb").addEventListener("click", onThumbClick);
  document.querySelector(".new").addEventListener("click", loadIamges);
  document.querySelectorAll("img").forEach((item) => {
    item.onload = removeLoading;
  });
  document.querySelector(".play").addEventListener("click", toggleTimer);
}

window.addEventListener("DOMContentLoaded", init);