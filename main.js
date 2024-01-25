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

//background class
class Background {
  constructor(backgroundType) {
    this.element = document.createElement("div");
    this.element.id = backgroundType;
    this.element.classList.add("planet");
    this.x = getRandomArbitrary(0, document.documentElement.innerWidth);
    this.rotation = 0;
    this.rotationSpeed = getRandomArbitrary(-0.2, 0.2);
    this.speed = getRandomArbitrary(0.1, 0.5);
    this.element.style.left = this.x + "px";
    this.element.style.top =
      getRandomArbitrary(0, document.documentElement.innerHeight) + "px";
      let size = getRandomArbitrary(100, 300);
      if (this.element.id != "backgroundStars") {
    this.element.style.width = size+ "px";
    this.element.style.height =size+ "px";
    this.element.style.zIndex = size
      }
      let background = document.getElementById("background");
    background.appendChild(this.element);
  }
  update() {
    this.x -= this.speed;
    this.rotation += this.rotationSpeed;
    if (this.element.id != "backgroundStars") {
      this.element.style.transform = "rotate(" + this.rotation + "deg)";
      this.element.style.left = this.x + "px";
      if (this.x < -100) {
        this.x = document.documentElement.innerWidth + 100;
      }
    }
  }
}

//create background
function createBackground() {
  for (let i = 0; i < backgroundtypes.length; i++) {
    let newBackground = new Background(backgroundtypes[i]);
    backgrounds.push(newBackground);
  }
}
createBackground();

//ship class
class Ship {
  constructor(shipType, shipId) {
    this.x = document.documentElement.innerWidth;
    this.y = document.documentElement.innerHeight * Math.random();
    this.speed = getRandomArbitrary(shipType.minSpeed, shipType.maxSpeed);
    this.style = shipType.style;
    this.shipId = shipId;
    this.element = document.createElement("div");
    this.element.classList.add(this.style);
    this.element.classList.add("ship");
    this.element.id = "ship" + this.shipId;
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    let size = getRandomArbitrary(50, 200);
    this.element.style.width = size + "px";
    this.element.style.height = size + "px";
    document.body.appendChild(this.element);
    this.element.addEventListener("click", () => {
      this.remove();
      score++;
      document.getElementById("score").innerHTML = score;
    });
  }
  update() {
    this.x -= this.speed;
    this.element.style.left = this.x + "px";
    if (this.x < -200) {
      this.element.remove();
      ships.splice(ships.indexOf(this), 1);
    }
  }
  remove() {
    this.element.remove();
    ships.splice(ships.indexOf(this), 1);
  }
}

//set background
function setBackground() {}
setBackground;

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
