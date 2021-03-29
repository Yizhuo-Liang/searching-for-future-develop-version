let scoreboard1
let pg;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

}

function draw() {
  background(51);

	
	scoreboard1 = new scoreboard(200,-200,-200,1000);
	scoreboard1.draw();

}

class scoreboard{
		constructor(x,y,z,size){
			this.x = x;
			this.y = y;
			this.z = z;
			this.size = size
			this.expand_value = 0;
		}
	
		draw(){
			let graphics = createGraphics(200,200)

			let distance=int(millis()/100)
			let expand = false;
			// background(0);
			graphics.background(255,0)
			graphics.fill(255,0,255)
			graphics.textSize(50);
			graphics.text(distance+'AU',10,80,700,700);

			texture(graphics);
			
			translate(this.x,this.y,this.z)
			// rotateX(frameCount * 0.01);
			// rotateY(frameCount * 0.01);
			// rotateZ(frameCount * 0.01);
			// box(200+this.expand_value);
			
			if(distance%100==1){
				this.expand_value=this.size/2
			}
  		noStroke();
			plane(this.size+this.expand_value);
		}
	
		
}