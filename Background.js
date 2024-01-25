class Background {
  constructor(backgroundType) {
    this.element = document.createElement("div");
    this.element.id = backgroundType;
    this.element.classList.add("planet");
    this.x = getRandomArbitrary(0, document.documentElement.clientWidth);
    this.rotation = 0;
    this.rotationSpeed = getRandomArbitrary(-0.2, 0.2);
    this.speed = getRandomArbitrary(0.1, 0.5);
    this.element.style.left = this.x + "px";
    this.element.style.top =
      getRandomArbitrary(0, document.documentElement.clientHeight) + "px";
    let size = getRandomArbitrary(100, 300);
    if (this.element.id != "backgroundStars") {
      this.element.style.width = size + "px";
      this.element.style.height = size + "px";
      this.element.style.zIndex = size;
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
        this.x = document.documentElement.clientWidth + 100;
      }
    }
  }
}
