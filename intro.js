class intro {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.width = 0;
    this.height = 0;

    this.img = null;
  }

  drawMiniCard(x, y, type) {
    rectMode(CENTER);

    if (type === "cat") {
      fill("#FFF4E2");
      stroke(255);
    }

    if (type === "paw") {
      fill("#D7EEFE");
      stroke(255);
    }

    strokeWeight(10);
    rect(x, y, 140, 180, 20);

    if (type === "cat") {
      this.drawCat(x, y + 10, 80);
    }

    if (type === "paw") {
      imageMode(CENTER);
      image(pawImg, x, y + 10, 120, 120);
    }
  }
  drawCat(x, y, s) {
    push();
    translate(x, y);
    scale(s / 220);

    fill(catColor);
    noStroke();

    // head
    ellipse(0, 0, 220, 200);

    // ears
    triangle(-70, -70, -120, -150, -40, -130);
    triangle(70, -70, 40, -130, 120, -150);

    // eyes
    fill(30);
    ellipse(-40, 0, 18, 18);
    ellipse(40, 0, 18, 18);

    // nose
    triangle(0, 25, -10, 40, 10, 40);

    // whiskers
    stroke(30);
    strokeWeight(4);

    line(-60, 50, -130, 40);
    line(-60, 55, -130, 55);
    line(-60, 60, -130, 70);

    line(60, 50, 130, 40);
    line(60, 55, 130, 55);
    line(60, 60, 130, 70);

    pop();
  }

  drawStar(x, y, size) {
    push();
    translate(x, y);

    fill("#FFEFB5");
    noStroke();

    beginShape();
    vertex(0, -size);
    vertex(size * 0.25, -size * 0.25);
    vertex(size, 0);
    vertex(size * 0.25, size * 0.25);
    vertex(0, size);
    vertex(-size * 0.25, size * 0.25);
    vertex(-size, 0);
    vertex(-size * 0.25, -size * 0.25);
    endShape(CLOSE);

    pop();
  }

  display() {
    if (this.img != null) {
      image(this.img, 0, 0, this.width, this.height);
    }

    background("#F6E7E1");

    // TITLE
    fill("#FE8DCD");
    textFont(myFont);
    textSize(72);
    text("MATCH GAME", width / 2, 100);
    strokeWeight(6);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    stroke(255);

    // cards area
    push();
    translate(width / 2, 300);

    this.drawStar(-150, -80, 30);
    this.drawStar(140, -90, 30);
    this.drawStar(-170, 20, 22);
    this.drawStar(170, 20, 22);

    // paw card (back)
    push();
    rotate(radians(20));
    this.drawMiniCard(60, 0, "paw");
    pop();

    // cat card (front)
    push();
    rotate(radians(-10));
    this.drawMiniCard(-60, 20, "cat");
    pop();

    pop();

    // texts
    fill("#FF7CC9");
    textSize(28);
    text("Find and match all animal pairs.", width / 2, 480);
    text("You have 10 mistakes.", width / 2, 520);
    text("Match all pairs to win.", width / 2, 560);
    strokeWeight(10);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    stroke(255);

    // STA
  }

  async setImage(imagePath) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Create a p5.js compatible image
        const p5Img = createImage(img.width, img.height);
        p5Img.drawingContext.drawImage(img, 0, 0);
        this.img = p5Img;
        this.width = img.width;
        this.height = img.height;
        resolve();
      };
      img.onerror = reject;
      img.src = imagePath;
    });
  }
}
