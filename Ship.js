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
