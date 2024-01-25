//config
let shipTypes = [
  { style: "locust", minSpeed: 1, maxSpeed: 3 },
  { style: "mantis", minSpeed: 2, maxSpeed: 6 },
  { style: "cricket", minSpeed: 3, maxSpeed: 12 },
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
let score = 0;
let shipId = 0;
let time = 0;
let waveStep = 0;

//ship class

class Ship {
  constructor(shipType, shipId) {
    this.x = document.documentElement.clientWidth;
    this.y = document.documentElement.clientHeight * Math.random();
    this.speed = getRandomArbitrary(shipType.minSpeed, shipType.maxSpeed);
    this.style = shipType.style;
    this.shipId = shipId;
    this.element = document.createElement("div");
    this.element.classList.add(this.style);
    this.element.classList.add("ship");
    this.element.id = "ship" + this.shipId;
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
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
  time++;
  requestAnimationFrame(gameLoop);
}
gameLoop();

//helpers
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
