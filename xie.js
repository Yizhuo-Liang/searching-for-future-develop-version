let x = 0
let y = 0
let realx =0
let realy =0
let z = 10
let theta = 0
let angle = 0
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
	// blackhole1 = new blackhole(50, 24, 16,1,1000);
	// blackhole2 = new blackhole(50, 254, 106,2,10000);
	r = random(255);
  g = random(255);
  b = random(255);
	
}

function draw() {
	background(51);
	// let x = 50
	push();
	// angle +=0.1;
	// rotateX(angle*100);
	// rotateY(angle*10);
	// rotateZ(angle);
	blackhole1 = new blackhole(50+x, 200+y, 106,1/2);
	pop();
	blackhole2 = new blackhole(50, 200, 106,1);
	blackhole1.draw();
	blackhole2.draw();
	theta =frameCount/100
	x = 400 * cos(theta);
	y = 200 * sin(theta)
	// y = 254+500 * cos(frameCount/ 100)
	// z = 500 * cos(frameCount/ 20)

	
	

	
	

	
}





class blackhole{
		constructor(x,y,z,size,mass) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = size;
		this.mass = mass;
	}
		draw() {

			push();
			this.x +=  5*cos(frameCount / 1);

			translate(this.x,this.y,this.z)
			rotateY(millis() / 1000);
			rotateX(frameCount * 0.01);
			rotateZ(frameCount * 0.01);
			push();
			lights(34,56,128);
			stroke(10);
			fill(51,51,51)
			sphere(100*this.size, 24, 16);
			pop();

			rotateY(millis() / 1000);
			noStroke();
			let jet =  60*cos(frameCount/100 );
			fill(random(255),random(255),random(255),90);
			translate(0,-500*this.size,0)
			cone(100*this.size, 1000*this.size, 16*this.size, 16*this.size);
			translate(0,1000*this.size,0)
			cone(100*this.size, -1000*this.size, 16*this.size, 16*this.size);
			pop();
		}

}