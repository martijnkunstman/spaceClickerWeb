//config
let shipTypes = [
  { style: "locust", minSpeed: 1, maxSpeed: 3 },
  { style: "mantis", minSpeed: 2, maxSpeed: 6 },
  { style: "cricket", minSpeed: 3, maxSpeed: 12 },
];
let backgroundtypes = [
  "backgroundStars",
  "blueDust",
  "coldNebula",
  "exoPlanet2",
  "exoPlanet3",
  "hotNebula",
  "iceGiant",
  "redGiant",
  "sun",
  "violetDust",
  "yellowDust",
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

//create background
function createBackground() {
  for (let i = 0; i < backgroundtypes.length; i++) {
    let newBackground = new Background(backgroundtypes[i]);
    backgrounds.push(newBackground);
  }
}
createBackground();

//game loop
function gameLoop() {
  if (time % 100 == 0) {
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
