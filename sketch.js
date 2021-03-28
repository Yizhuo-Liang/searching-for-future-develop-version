let _W;
let _H;

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
  spaceship = loadModel("assets/spaceship2.obj");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  _W = windowWidth;
  _H = windowHeight;
  angleMode(DEGREES);
  smooth();
  frameRate(30);
  camZ = height / 2.0 / tan(30.0);
  // detail = createSlider(3, 24, 14);
  // detail.position(10, height - 30);
  // detail.style("width", "80px");
  // frameRate(30);
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
    sphere(this.radius, 24, 14);
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
//--------------------------------- END OF PLANET ---------------------------------

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
//End of moveAround()

// Start of Position()
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
// End of position

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
  
  for(let i = 0;i < planets.length;i++) {
    if(isCollide(myShip.position, planets[i].position, 50, planets[i].radius)) {
      return true;
    }
  }
  return false;
}

//--------------------------------- END OF COLLISION DETECTING ---------------------------------

class Spaceship {
  constructor(x, y, z, size, angleZ, angleX, shipModel) {
    this.position = new Position(x, y, z);
    this.size = size;
    this.angleZ = angleZ;
    this.angleX = angleX;
    this.shipModel = shipModel;
  }
  
  draw(){
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateZ(this.angleZ);
    rotateX(this.angleX);
    scale(this.size);
    model(this.shipModel);
    pop();
  }
}


//
let ship1;
let pluto = new Planet(100, 100, 100, 50, 0);
let planets = [];
let alive = true;
function draw() {
  background(0);
  // saturn = new Planet(50, 50, 50, 40, 1);
  // pluto = new Planet(-150, -100, 20, 25, 2);
  // mars = new Planet(-200, 150, 0, 15, 0);
  // saturn.draw();
  // pluto.draw();
  // mars.draw();
  moveAround();
  ship1 = new Spaceship(camX, camY + 150, camZ - 350, 15, tiltZ, tiltX, spaceship);
  
  alive = !testCollision(planets,ship1);  //<<<-------------- Check the state of the game
  
  ship1.draw();
  pluto.draw();
}




/* global p5 sphere detail objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
