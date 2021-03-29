let _W;
let _H;

let camZ;
let spaceship;
let earth;
let planet1;
let planet2;
let planet3;
let planet4;
let planet5;
let explosionEffect;

let explosde_sound;
let ending;
let explosion_ball;
let re_explosion_ball;

function preload() {
  spaceship = loadModel("assets/spaceship2.obj");
  earth = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fearth.jpg?v=1616633286407"
  );
  planet1 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet2.jpg?v=1616633287289"
  );
  planet2 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet2.jpg?v=1616633287289"
  );
  planet3 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet3.jpg?v=1616633288086"
  );
  planet4 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet4.jpg?v=1616633289270"
  );
  planet5 = loadImage(
    "https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2Fplanet5.png?v=1616633291018"
  );
  soundFormats('mp3', 'ogg');
	explosde_sound = loadSound("https://cdn.glitch.com/48b3940f-dc59-484b-bb22-aaa9c4991ca3%2F11369.mp3?v=1617032492745");
}
let planetlist = [earth, planet1, planet2, planet3, planet4, planet5];
let sb;
let bumi;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  _W = windowWidth;
  _H = windowHeight;
  angleMode(DEGREES);
  smooth();
  frameRate(30);
  camZ = height / 2.0 / tan(30.0);
  sb = new Scoreboard(0.8 * _W, 0.1 * _H, camZ, 100)
  // bumi = new Planet(0, 0, camZ - 400, 300, 0)
  // detail = createSlider(3, 24, 14);
  // detail.position(10, height - 30);
  // detail.style("width", "80px");
}

//
let ship1;
let planets = [];
let status = "alive";

function draw() {
  if (status === "alive") {
    background(0);
    moveAround();
    ship1 = new Spaceship(
      camX,
      camY,
      camZ - 350,
      15,
      tiltZ,
      tiltX,
      spaceship
    );
    ship1.draw();
    // bumi.draw();
    if (frameCount % 100 === 0) {
      generatePlanet(ship1);
    }
    drawPlanets(planets);
    sb.draw(ship1.getLocation().z);
    if (testCollision(planets, ship1)) {
      status = "justdied";
    }
    
  } else if (status === "justdied") {
    explosion_ball = new Explosion(
      ship1.getLocation().x,
      ship1.getLocation().y,
      ship1.getLocation().y,
      4,
      250,
      250,
      0,
      10
    );
    re_explosion_ball = new Re_explosion(ship1.getLocation().x, ship1.getLocation().y, ship1.getLocation().z, 1000);
    ending = new EndScene(ship1.getLocation().x, ship1.getLocation().y, ship1.getLocation().z, _W);
    status = "died";
  } else {
    background(0);
    if (explosion_ball.getSize() < 900) {
		explosion_ball.draw();
	}

	if (explosion_ball.getSize() > 900) {
		background(0);
    re_explosion_ball.draw();
		ending.draw();
  }
  }

  // status = !testCollision(planets,ship1);  //<<<-------------- Check the state of the game
}

// Planet class introduction:
// 1. constructor has 5 arguments
// 2. x, y, z denotes the position of the plannet with radius
// 3. number of rings can be either 0, 1, or 2
// 4. move() function has 3 arguments which are increment amount of x, y, z
// 5. draw() can be used to draw the plannet directly on its position

//--------------------------------- BEGINNING OF PLANET ---------------------------------
class Planet {
  constructor(x, y, z, radius, rings) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.rings = rings;
    this.t = earth;
  }

  move(xDist, yDist, zDist) {
    this.x += xDist;
    this.y += yDist;
    this.z += zDist;
  }

  getRadius() {
    return this.radius;
  }

  getZ() {
    return this.z;
  }

  draw() {
    push();
    translate(this.x, this.y, this.z);
    noStroke();
    texture(earth);
    sphere(this.radius, 30, 30);
    pop();
    console.log("planet called");
    // noFill();
    // stroke(255);
    // strokeWeight(3);
    // push();
    // rotateX(1.1 * (PI / 2));
    // if (this.rings >= 1) {
    //   circle(0, 0, 5 * this.radius * random(0.95, 1.05));
    // }
    // pop();
    // push();
    // rotateY(-1.1 * (PI / 2));
    // if (this.rings >= 2) {
    //   circle(0, 0, 5 * this.radius * random(0.95, 1.05));
    // }
    // pop();
    // rotateY(millis() / 2500);
  }
}
//--------------------------------- END OF PLANET ---------------------------------

//--------------------------------- START OF MOVEAROUND ---------------------------------
let camX = 0;
let camY = 0;
let tiltZ = 0;
let tiltX = 0;
function moveAround() {
  let triggerZ = 0;
  let triggerX = 0;
  if (keyIsDown(LEFT_ARROW)) {
    camX -= 5;
    tiltZ -= 4;
    triggerZ = 1;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    camX += 5;
    tiltZ += 4;
    triggerZ = 1;
  }

  if (keyIsDown(UP_ARROW)) {
    camY -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    camY += 5;
  }
  if (keyIsDown(107) || keyIsDown(187)) {
    camZ -= 5;
    tiltX += 5;
    triggerX = 1;
  }

  if (keyIsDown(109) || keyIsDown(189)) {
    camZ += 5;
    tiltX -= 5;
    triggerX = 1;
  }

  if (triggerZ === 0) {
    if (tiltZ > 0) {
      tiltZ -= 2;
    } else if (tiltZ < 0) {
      tiltZ += 2;
    }
  }

  if (triggerX === 0) {
    if (tiltX > 0) {
      tiltX -= 2;
    } else if (tiltX < 0) {
      tiltX += 2;
    }
  }

  if (tiltZ > 0) {
    tiltZ = min(tiltZ, 16);
  } else if (tiltZ < 0) {
    tiltZ = max(tiltZ, -16);
  }

  if (tiltX > 0) {
    tiltX = min(tiltX, 16);
  } else if (tiltX < 0) {
    tiltX = max(tiltX, -16);
  }

  camera(camX, camY, camZ + 300, camX, camY, camZ - 100);
}
//--------------------------------- END OF MOVEAROUND ---------------------------------

//--------------------------------- START OF POSITION ---------------------------------
class Position {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  stePosition(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
//--------------------------------- END OF POSITION ---------------------------------

//--------------------------------- START OF COLLISION DETECTING ---------------------------------

function isCollide(objPosition, trgtPosition, objRadius, trgtRadius) {
  let distance = dist(
    objPosition.x,
    objPosition.y,
    objPosition.z,
    trgtPosition.x,
    trgtPosition.y,
    trgtPosition.z
  );
  return distance < objRadius + trgtRadius;
}

function testCollision(planets, myShip) {
  for (let i = 0; i < planets.length; i++) {
    if (isCollide(myShip.position, planets[i], 155, planets[i].radius)) {
      return true;
    }
  }
  return false;
}

//--------------------------------- END OF COLLISION DETECTING ---------------------------------

//--------------------------------- START OF SPACESHIP ---------------------------------
class Spaceship {
  constructor(x, y, z, size, angleZ, angleX, shipModel) {
    this.position = new Position(x, y, z);
    this.size = size;
    this.angleZ = angleZ;
    this.angleX = angleX;
    this.shipModel = shipModel;
  }

  draw() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateZ(this.angleZ);
    rotateX(this.angleX);
    scale(this.size);
    model(this.shipModel);
    pop();
  }

  getLocation() {
    return this.position;
  }
}

//--------------------------------- END OF SPACESHIP ---------------------------------




//--------------------------------- END OF EXPLOSION ---------------------------------

function generatePlanet(ship) {
  let shipLoc = ship.getLocation();
  let lowerBound = shipLoc.z - 800;
  let pZ = int(random(lowerBound, lowerBound - 700));
  let pX = int(random(shipLoc.X - 50, shipLoc.X + 50));
  let pY = int(random(shipLoc.Y - 50, shipLoc.Y + 50));
  let pS = int(random(450, 690));
  let planetN = new Planet(pX, pY, pZ, pS, 0);
  planets.push(planetN);
  console.log("Planet created");
}

function drawPlanets(planets) {
  // planets = planets.filter(planetIsTooFar)
  for (let i = 0; i < planets.length; i++) {
    planets[i].draw();
    console.log(
      "Planet drawn" + str(planets[i].x) + str(planets[i].y) + str(planets[i].z)
    );
  }
}

function planetIsTooFar(planet) {
  if (planet.z - ship1.getLocation().z > 50) {
    return true;
  } else {
    console.log("Planet destroyed");
    return false;
  }
}



class Scoreboard{
		constructor(x,y,z,size){
			this.x = x;
			this.y = y;
			this.z = z;
			this.size = size
			this.expand_value = 0;
		}
	
		draw(z){
			let graphics = createGraphics(200,200)
			let distance=int(millis()/100)
			let expand = false;
			// background(0);
			graphics.background(255,0)
			graphics.fill(255,0,255)
			graphics.textSize(50);
			graphics.text(distance+'AU',10,80,700,700);

			texture(graphics);
			
			translate(this.x,this.y, z)
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



//--------------------------------- START OF EXPLOSION ---------------------------------

class Explosion {
	constructor(x, y, z, size, r, g, b, transparent) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = size;
		this.r = r;
		this.g = g;
		this.b = b;
		this.transparent = transparent;
    this.explosion_status=false;
	}

	growBall() {
    

		if (this.transparent < 255) {
			this.transparent += 0.3;
		}
    if (this.size < 10) {
			this.size = this.size * 1.009;
      this.b += 0.8;
		}
    if (this.size > 10 && this.size < 70 ) {
			this.size = this.size * 1.0653;
      this.b += 0.8;
		}
    if (this.size > 70 && this.size < 100 ) {
			this.size = this.size * 1.0065;
      this.b += 0.08;
		}
		if (this.size > 100 && this.size < 900) {
			this.size = this.size * 1.04;
      this.b += 2.5;
		}
    
	}
	getSize() {
		return this.size
	}

	draw() {
		this.growBall();
    
    if(this.explosion_status == false){
      explosde_sound.play();
      console.log(this.explosion_status)
      this.explosion_status=true;
    }
    
		push();
		this.x += 5 * cos(frameCount / 1);

		translate(this.x, this.y, this.z)

		push();

		noStroke();

		fill(this.r, this.g, this.b, this.transparent);

		for (let i = 1; i < 6; i++) {
			noStroke();
			fill(this.r, this.g, this.b, this.transparent);
			sphere(this.size + i * 5, 24, 16);
		}

		pop();

		push();
		rotateX(60);
		noStroke();
		fill(245, 245, 237);
		torus(this.size * 2.5, this.size * 0.07);
		pop();

	}

}

//--------------------------------- END OF EXPLOSION ---------------------------------





//--------------------------------- START OF RE_EXPLOSION ---------------------------------
class Re_explosion {
	constructor(x, y, z, size) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = size;	
    // this.explosion_status=false;
	}

	growBall() {
    


		if (this.size > 20) {
			this.size = this.size * 0.9;
		}
    
	}
	getSize() {
		return this.size
	}

	draw() {
		this.growBall();
    
    // if(this.explosion_status == false){
    //   explosde_sound.play();
    //   this.explosion_status=true;
    // }
    
		push();
		translate(this.x, this.y, this.z);
    noStroke();
    fill(255);
    sphere(this.size, 24, 16);
		pop();
	}
}

//--------------------------------- END OF RE_EXPLOSION ---------------------------------




//--------------------------------- START OF ENDSCENE ---------------------------------
class EndScene {
	constructor(x, y, z, w, s = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = w / 2;
		this.graphics = createGraphics(w/3, w/3)
		this.graphics.textSize(w/30);
		this.graphics.fill(255);
		this.graphics.background(0, 0);
		this.graphics.textAlign(CENTER,CENTER);
		this.graphics.text("GAME OVER!\n you score: " + str(s), 0,0, w/3, w/3);

	}

	draw() {


		translate(this.x, this.y, this.z)
		rotateX(frameCount * 0.01);
		rotateY(frameCount * 0.01);
		rotateZ(frameCount * 0.01);

		stroke(255);
		texture(this.graphics);
		
		box(this.size);

	}
}
//--------------------------------- END OF ENDSCENE ---------------------------------


/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
