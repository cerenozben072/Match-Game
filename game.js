class game {
  constructor() {
    // --- Grid settings (12 cards: 4x3) ---
    this.cols = 4;
    this.rows = 3;
    this.cardW = 120;
    this.cardH = 150;
    this.gap = 18;
    this.topY = 280;

    // --- Game rules ---
    this.mistakes = 0;
    this.maxMistakes = 10;

    // --- 6 pastel colors (each appears twice) ---
    this.palette = [
      "#FFC0EE",
      "#FFD6A5",
      "#FDFFB6",
      "#CAFFBF",
      "#BDB2FF",
      "#A0E7E5",
    ];

    // Create 12 values: 0..5 twice
    let values = [];
    for (let i = 0; i < 6; i++) {
      values.push(i);
      values.push(i);
    }
    this.shuffle(values);

    // Create card objects
    this.cards = [];
    for (let i = 0; i < 12; i++) {
      this.cards.push({
        value: values[i],
        faceUp: false,
        matched: false,
        x: 0,
        y: 0,
      });
    }
    this.layout();

    // Two picks
    this.first = null;
    this.second = null;

    // Simple lock to prevent fast clicking
    this.locked = false;
    this.hideAt = 0;
  }

  layout() {
    // Center the grid
    const gridW = this.cols * this.cardW + (this.cols - 1) * this.gap;
    const startX = width / 2 - gridW / 2 + this.cardW / 2;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const i = r * this.cols + c;
        this.cards[i].x = startX + c * (this.cardW + this.gap);
        this.cards[i].y = this.topY + r * (this.cardH + this.gap);
      }
    }
  }

  display() {
    // Background + header
    background("#F7C9C7");

    textAlign(CENTER, CENTER);
    stroke(255);
    strokeWeight(10);
    fill("#FE8DCD");
    textFont(myFont);
    textSize(64);
    text("MATCH GAME", width / 2, 90);
    noStroke();

    textSize(36);
    strokeWeight(6);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    stroke(255);
    textAlign(RIGHT, CENTER);
    text(`Mistakes ${this.mistakes}/${this.maxMistakes}`, width - 15, 30);
    textAlign(CENTER, CENTER);

    // Draw cards
    for (let card of this.cards) {
      this.drawCard(card);
    }

    // Hide two wrong cards after delay
    if (this.locked && millis() > this.hideAt) {
      this.first.faceUp = false;
      this.second.faceUp = false;
      this.first = null;
      this.second = null;
      this.locked = false;
    }

    // Win / Lose switch (use separate scenes)
    if (this.allMatched()) currentScene = "endWin";
    if (this.mistakes >= this.maxMistakes) currentScene = "endLose";
  }

  drawCard(card) {
    rectMode(CENTER);
    stroke(255);
    strokeWeight(10);

    // Back side
    if (!card.faceUp && !card.matched) {
      fill("#D7EEFE");
      rect(card.x, card.y, this.cardW, this.cardH, 22);

      imageMode(CENTER);
      image(pawImg, card.x, card.y, this.cardW * 0.7, this.cardW * 0.7);
      return;
    }

    // Front side
    fill("#FFF4E2");
    rect(card.x, card.y, this.cardW, this.cardH, 22);

    const col = this.palette[card.value];
    this.drawCat(card.x, card.y + 8, 70, col);
  }

  // Draw your cat, but color comes from the card
  drawCat(x, y, s, colHex) {
    push();
    translate(x, y);
    scale(s / 220);

    fill(colHex);
    noStroke();
    ellipse(0, 0, 220, 200);

    triangle(-70, -70, -120, -150, -40, -130);
    triangle(70, -70, 40, -130, 120, -150);

    fill(30);
    ellipse(-40, 0, 18, 18);
    ellipse(40, 0, 18, 18);

    triangle(0, 25, -10, 40, 10, 40);

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

  // Call this from sketch.js mousePressed()
  handleClick(mx, my) {
    if (this.locked) return;

    const card = this.getCardAt(mx, my);
    if (!card || card.faceUp || card.matched) return;

    card.faceUp = true;

    if (this.first === null) {
      this.first = card;
      return;
    }

    this.second = card;

    // Check match
    if (this.first.value === this.second.value) {
      this.first.matched = true;
      this.second.matched = true;
      this.first = null;
      this.second = null;
    } else {
      this.mistakes++;
      this.locked = true;
      this.hideAt = millis() + 700; // 0.7s delay
    }
  }

  getCardAt(mx, my) {
    for (let card of this.cards) {
      const left = card.x - this.cardW / 2;
      const right = card.x + this.cardW / 2;
      const top = card.y - this.cardH / 2;
      const bottom = card.y + this.cardH / 2;
      if (mx >= left && mx <= right && my >= top && my <= bottom) return card;
    }
    return null;
  }

  allMatched() {
    return this.cards.every((c) => c.matched);
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = floor(random(i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}
