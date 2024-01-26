//config
let shipTypes = [
  { style: "locust", minSpeed: 1, maxSpeed: 3 },
  { style: "mantis", minSpeed: 2, maxSpeed: 6 },
  { style: "cricket", minSpeed: 3, maxSpeed: 12 },
];
let backgroundtypes = [
  ["backgroundStars","background"],
  ["blueDust","dust"],
  ["coldNebula","dust"],
  ["exoPlanet2","planet"],
  ["exoPlanet3","planet"],
  ["hotNebula","dust"],
  ["iceGiant","planet"],
  ["redGiant","planet"],
  ["sun","planet"],
  ["violetDust","dust"],
  ["yellowDust","dust"]
];
let waves = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 0, 0],
  [2, 2],
  [1, 1],
  [0, 0, 0, 0],
  [2],
];

//vars
let ships = [];
let backgrounds = [];
let score = 0;
let shipId = 0;
let time = 0;
let waveStep = 0;

if (localStorage.getItem("score") != null) {
  score = localStorage.getItem("score");
}
else {  
  localStorage.setItem("score", score);
}
document.getElementById("score").innerHTML = score;

//create background
function createBackground() {
  for (let i = 0; i < backgroundtypes.length; i++) {
    let newBackground = new Background(backgroundtypes[i]);
    backgrounds.push(newBackground);
  }
}
createBackground();

//init
function init() {
  window.addEventListener("click", function(event) {
    let newExplosion = new Explosion(event.clientX, event.clientY);    
  });
}
init();

//game loop
function gameLoop() {
  if (time % 200 == 0) {
    for (let i = 0; i < waves[waveStep].length; i++) {
      let newShip = new Ship(shipTypes[waves[waveStep][i]], shipId);
      ships.push(newShip);
      shipId++;
    }
    waveStep++;
    if (waveStep >= waves.length) {
      waveStep = 0;
    }
  }
  for (let i = 0; i < ships.length; i++) {
    ships[i].update();
  }
  for (let i = 0; i < backgrounds.length; i++) {
    backgrounds[i].update();
  }
  time++;
  requestAnimationFrame(gameLoop);
}
gameLoop();

//helpers
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
