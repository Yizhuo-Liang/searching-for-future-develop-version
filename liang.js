function setup() {
	createCanvas(600, 600, WEBGL);
	detail = createSlider(3, 24, 14);
  detail.position(10, height - 30);
  detail.style('width', '80px');
	frameRate(30);
}

function draw() {
	
	background(100);
	saturn = new Planet(50, 50, 50, 40, 1);
	pluto = new Planet(-150, -100, 20, 25, 2);
	mars = new Planet(-200, 150, 0, 15, 0);
	saturn.draw();
	pluto.draw();
	mars.draw();
}

// Plannet class introduction:
// 1. constructor has 5 arguments
// 2. x, y, z denotes the position of the plannet where radius is simply the radius
// 3. number of rings can be either 0, 1, or 2
// 4. move() function has 3 arguments which are increment amount of x, y, z
// 5. draw() can be used to draw the plannet directly on its position

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
		rotateX(1.1*(PI/2));
		if(this.rings >= 1) circle(0, 0, 5 * this.radius * random(0.95, 1.05));
		pop();
		push();
		rotateY(-1.1*(PI/2));
		if(this.rings >= 2) circle(0, 0, 5 * this.radius * random(0.95, 1.05));
		pop();
		pop();
		pop();
	}
}