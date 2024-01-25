class Background {
  constructor(backgroundType) {
    this.element = document.createElement("div");
    this.element.id = backgroundType[0];
    this.element.type = backgroundType[1];
    this.element.classList.add("planet");
    let background = document.getElementById("background");
    background.appendChild(this.element);
    this.rotation = 0;
    this.init();
  }
  init() {
    this.size = getRandomArbitrary(
      document.documentElement.clientHeight / 10,
      document.documentElement.clientHeight / 2
    );
    this.x = getRandomArbitrary(0, document.documentElement.clientWidth);
    this.y = getRandomArbitrary(
      0 - this.size,
      document.documentElement.clientHeight
    );
    if (this.element.type == "planet") {
      this.rotationSpeed = getRandomArbitrary(-0.02, 0.02);
    } else {
      this.rotationSpeed = 0;
    }
    this.speed = getRandomArbitrary(0.05, 0.3);
    this.element.style.left = this.x + "px";

    this.element.style.top = this.y + "px";
    if (this.element.type != "background") {
      this.element.style.width = this.size + "px";
      this.element.style.height = this.size + "px";
      this.element.style.zIndex = Math.round(this.size) + "00";
    }
    if (this.element.type == "dust") {
      this.element.style.zIndex = Math.round(this.size) + "0";
    }
  }
  update() {
    this.x -= this.speed;
    this.y -= this.rotationSpeed;
    this.rotation += this.rotationSpeed;
    if (this.element.type != "background") {
      if (this.x < -this.size) {
        this.init();
        this.x = document.documentElement.clientWidth;
      }
      this.element.style.transform = "rotate(" + this.rotation + "deg)";
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px";
    }
  }
}
