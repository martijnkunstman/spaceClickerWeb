class Explosion {
  constructor(x, y) {
    this.element = document.createElement("div");
    this.element.classList.add("explosion");
    this.element.style.top = y + "px";
    this.element.style.left = x + "px";
    document.body.appendChild(this.element);
    setTimeout(() => {
      this.element.remove();
    }, 1000);
  }
}
