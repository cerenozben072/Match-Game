// I got help from ChatGPT for the game mechanisim also with creating gradient backgrounds
// Lets test the app.
// To see if we did some typo or mistake...

// Now instantiate the game scene via game class
// Declare the variable
var sceneGame;
var sceneIntro;

// define a current variable
// we will have 3 main scenes -> "intro", "game", "end"
var currentScene;

let restartButton;
let homeButton;
let tryAgainButton;

let myFont;
let pawImg;

let catColor;
let page = "start";

function preload() {
  myFont = loadFont("font.otf");
  pawImg = loadImage("paw.png");
}

function drawMiniCard(x, y, type) {
  rectMode(CENTER);

  // CARD COLORS
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

  // card faces
  if (type === "cat") {
    drawCat(x, y + 10, 80);
  }

  if (type === "paw") {
    imageMode(CENTER);
    image(pawImg, x, y + 10, 120, 120);
  }
}

function drawCat(x, y, s) {
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

function setup() {
  createCanvas(800, 800);
  textAlign(CENTER, CENTER);

  catColor = color("#FFC0EE");

  sceneIntro = new intro();
  sceneGame = new game();
  currentScene = "intro";

  // Initialize button
  restartButton = new Button(width / 2, 670);
  restartButton.setImage("btn.png");
  restartButton.addListener(restartTimer);

  homeButton = new Button(width / 2, 720);
  homeButton.setImage("btn.png");
  homeButton.addListener(goHome);

  tryAgainButton = new Button(width / 2, 720);
  tryAgainButton.setImage("btn.png");
  tryAgainButton.addListener(tryAgain);
  //disable by default
  homeButton.disable();
  tryAgainButton.disable();
}

function draw() {
  background(250);

  // enable buttons only on correct screens
  if (currentScene === "intro") {
    restartButton.enable();
    homeButton.disable();
    tryAgainButton.disable();
  } else if (currentScene === "endWin") {
    restartButton.disable();
    homeButton.enable();
    tryAgainButton.disable();
  } else if (currentScene === "endLose") {
    restartButton.disable();
    homeButton.disable();
    tryAgainButton.enable();
  } else {
    // game
    restartButton.disable();
    homeButton.disable();
    tryAgainButton.disable();
  }

  //SCENES
  if (currentScene == "intro") {
    sceneIntro.display();
    restartButton.draw();
  }

  if (currentScene == "game") {
    sceneGame.display();
  }

  if (currentScene == "endWin") {
    drawWinGradient();
    drawHappyCat(width / 2, 380);

    homeButton.draw();

    fill("#FE8DCD");
    textFont(myFont);
    textSize(64);
    text("YOU WIN!", width / 2, 140);

    // soft support text
    textSize(36);
    fill("#FE8DCD");
    text("Congratulations!", width / 2, 550);
  }

  if (currentScene == "endLose") {
    drawLoseGradient();
    drawSadCat(width / 2, 410);

    tryAgainButton.draw();

    fill("#9AD6F7");
    textFont(myFont);
    textSize(64);
    text("YOU LOSE!", width / 2, 170);

    // soft support text
    textSize(26);
    fill("#8FBEDC");
    text("Don't be sad, you'll win next time.", width / 2, 550);
  }
}

function restartTimer() {
  sceneGame = new game(); // reset every time you start
  currentScene = "game";
}

function goHome() {
  sceneGame = new game(); // reset for next play
  currentScene = "intro";
}

function tryAgain() {
  sceneGame = new game(); // reset for next play
  currentScene = "intro"; // go back to intro
}

function mousePressed() {
  // Card clicking only in game scene
  if (currentScene === "game") {
    sceneGame.handleClick(mouseX, mouseY);
  }
}
function goHome() {
  sceneGame = new game();
  currentScene = "intro";
}
function tryAgain() {
  sceneGame = new game();
  currentScene = "intro";
}
function drawHappyCat(x, y) {
  push();
  translate(x, y);

  fill("#FFC0EE");
  noStroke();
  ellipse(0, 0, 220, 200);

  triangle(-70, -70, -120, -150, -40, -130);
  triangle(70, -70, 40, -130, 120, -150);

  fill(30);
  ellipse(-40, 0, 18, 18);
  ellipse(40, 0, 18, 18);

  // nose
  triangle(0, 25, -10, 40, 10, 40);
  // whiskers
  stroke(30);
  strokeWeight(4);

  // left
  line(-40, 40, -90, 35);
  line(-40, 45, -90, 45);
  line(-40, 50, -90, 55);

  // right
  line(40, 40, 90, 35);
  line(40, 45, 90, 45);
  line(40, 50, 90, 55);

  // HAPPY MOUTH (cuter + smaller)
  noFill();
  stroke("#FE72C2");
  strokeWeight(6);
  strokeCap(ROUND);

  // small smile
  arc(0, 58, 48, 32, 0.15 * PI, 0.85 * PI);
  pop();
}

function drawSadCat(x, y) {
  push();
  translate(x, y);

  fill("#A0E7FF");
  noStroke();
  ellipse(0, 0, 220, 200);

  triangle(-70, -70, -120, -150, -40, -130);
  triangle(70, -70, 40, -130, 120, -150);

  fill(30);
  ellipse(-40, 0, 18, 18);
  ellipse(40, 0, 18, 18);

  // nose
  triangle(0, 25, -10, 40, 10, 40);

  // whiskers
  stroke(30);
  strokeWeight(4);

  // left
  line(-40, 40, -90, 35);
  line(-40, 45, -90, 45);
  line(-40, 50, -90, 55);

  // right
  line(40, 40, 90, 35);
  line(40, 45, 90, 45);
  line(40, 50, 90, 55);

  // SAD MOUTH
  noFill();
  stroke("#6BB7E8");
  strokeWeight(6);
  strokeCap(ROUND);
  arc(0, 78, 70, 45, PI, TWO_PI);

  pop();
}

function drawLoseGradient() {
  push();

  strokeWeight(1);

  let cTop = color("#CFE8FF");
  let cMid = color("#EAD6F7");
  let cBot = color("#F6E7E1");

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let finalCol;

    if (inter < 0.5) {
      let transition = map(inter, 0, 0.5, 0, 1);
      finalCol = lerpColor(cTop, cMid, transition);
    } else {
      let transition = map(inter, 0.5, 1, 0, 1);
      finalCol = lerpColor(cMid, cBot, transition);
    }

    stroke(finalCol);
    line(0, y, width, y);
  }
  pop();
}
function drawWinGradient() {
  push();
  strokeWeight(1);
  let cTop = color("#FFF9C4");
  let cMid = color("#FFEBF8");

  let cBot = color("#F6E7E1");

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let finalCol;

    if (inter < 0.5) {
      let transition = map(inter, 0, 0.5, 0, 1);
      finalCol = lerpColor(cTop, cMid, transition);
    } else {
      let transition = map(inter, 0.5, 1, 0, 1);
      finalCol = lerpColor(cMid, cBot, transition);
    }

    stroke(finalCol);
    line(0, y, width, y);
  }
  pop();
}
function keyPressed() {
  if (key === "s") {
    // Use the following naming convention while uploading the images.
    saveCanvas("week4-assignment-alptugan.jpg");
  }
}
