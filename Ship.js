class Ship {
  constructor(shipType, shipId) {
    this.x = document.documentElement.clientWidth;
    this.y = document.documentElement.clientHeight * Math.random();
    this.speed = getRandomArbitrary(shipType.minSpeed, shipType.maxSpeed);
    this.style = shipType.style;
    this.shipId = shipId;
    this.phase = 0;
    this.extra = 0;
    this.element = document.createElement("div");
    this.element.classList.add(this.style);
    this.element.classList.add("ship");
    this.element.id = "ship" + this.shipId;
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.size = getRandomArbitrary(40, 400);
    this.element.style.width = this.size + "px";
    this.element.style.height = this.size + "px";
    document.body.appendChild(this.element);
    this.element.style.zIndex = Math.round(this.size) + "000";
    this.element.addEventListener("click", () => {
      this.remove();
      score++;
      document.getElementById("score").innerHTML = score;
    });
  }
  update() {
    this.x -= this.speed;
    this.element.style.left = this.x + "px";
    this.phase = this.phase + 0.01 * this.speed;
    this.extra = Math.sin(this.phase) * 40;
    this.element.style.top = this.y + this.extra + "px";

    // Calculate rotation angle based on the sine wave with a scaling factor
    const rotationAngle = Math.atan(0.1 * Math.cos(this.phase));

    // Convert radians to degrees for the CSS rotation
    const rotationDegrees = -rotationAngle * (180 / Math.PI) - 90;

    // Apply rotation to the ship element
    this.element.style.transform = `rotate(${rotationDegrees}deg)`;

    if (this.x < -this.size) {
      this.element.remove();
      ships.splice(ships.indexOf(this), 1);
    }
  }
  remove() {
    this.element.remove();
    ships.splice(ships.indexOf(this), 1);
  }
}
