let particles;
let x = 0;
let y = 0;
let realx = 0;
let realy = 0;
let z = 10;
let theta = 0;
let angle = 0;

let spaceship;
function preload() {
  spaceship = loadModel('spaceship.obj')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  camZ = (height/2.0) / tan(30.0);
  detail = createSlider(3, 24, 14);
  detail.position(10, height - 30);
  detail.style("width", "80px");
  frameRate(30);
}



// Planet class introduction:
// 1. constructor has 5 arguments
// 2. x, y, z denotes the position of the plannet with radius
// 3. number of rings can be either 0, 1, or 2
// 4. move() function has 3 arguments which are increment amount of x, y, z
// 5. draw() can be used to draw the plannet directly on its position

//BEGINNING OF PLANET
class Planet {
  constructor(x, y, z, radius, rings) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.rings = rings;
  }

  move(xDist, yDist, zDist) {
    this.x += xDist;
    this.y += yDist;
    this.z += zDist;
  }

  getRadius() {
    return this.radius;
  }

  draw() {
    push();
    translate(this.x, this.y, this.z);
    push();
    noFill();
    stroke(220);
    strokeWeight(0.5);
    rotateY(millis() / 2500);
    sphere(this.radius, 24, detail.value());
    noFill();
    stroke(255);
    strokeWeight(3);
    push();
    rotateX(1.1 * (PI / 2));
    if (this.rings >= 1) {
      circle(0, 0, 5 * this.radius * random(0.95, 1.05));
    }
    pop();
    push();
    rotateY(-1.1 * (PI / 2));
    if (this.rings >= 2) {
      circle(0, 0, 5 * this.radius * random(0.95, 1.05));
    }
    pop();
    pop();
    pop();
  }
}
//END OF PLANET

//BEGINNNING OF BLACKHOLE
class Blackhole {
  constructor(x, y, z, size, mass) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.mass = mass;
  }

  draw() {
    push();
    this.x += 5 * cos(frameCount / 1);
    translate(this.x, this.y, this.z);
    rotateY(millis() / 1000);
    rotateX(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    push();
    lights(34, 56, 128);
    stroke(10);
    fill(51, 51, 51);
    sphere(100 * this.size, 24, 16);
    pop();
    rotateY(millis() / 1000);
    noStroke();
    let jet = 60 * cos(frameCount / 100);
    fill(random(255), random(255), random(255), 90);
    translate(0, -500 * this.size, 0);
    cone(100 * this.size, 1000 * this.size, 16 * this.size, 16 * this.size);
    translate(0, 1000 * this.size, 0);
    cone(100 * this.size, -1000 * this.size, 16 * this.size, 16 * this.size);
    pop();
  }
}
// END OF BLACKHOLE


//Start of moveAround()
let camX = 0;
let camY = 0;
let camZ;
function moveAround(){  
	if (keyIsDown(LEFT_ARROW)) {
    camX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    camX += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    camY -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    camY += 5;
  }
	if (keyIsDown(107) || keyIsDown(187)){
		camZ -= 5
	}
	if (keyIsDown(109) || keyIsDown(189)){
		camZ += 5
	}
  camera(camX, camY, camZ, camX, camY, camZ - 100);
}
//End of moveAround()

function draw() {
  background(0);
  // saturn = new Planet(50, 50, 50, 40, 1);
  // pluto = new Planet(-150, -100, 20, 25, 2);
  // mars = new Planet(-200, 150, 0, 15, 0);
  // saturn.draw();
  // pluto.draw();
  // mars.draw();
  // push();
  // blackhole1 = new blackhole(50+x, 200+y, 106,1/2);
  // pop();
  // blackhole2 = new blackhole(50, 200, 106,1);
  // blackhole1.draw();
  // blackhole2.draw();
  // theta =frameCount/100
  // x = 400 * cos(theta);
  // y = 200 * sin(theta);
  // pop();
  model(spaceship);
  moveAround();
  console.log(camX, camY, camZ);
}

