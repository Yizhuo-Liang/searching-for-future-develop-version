//Variables declared in this page:
/* planetlist planets aliveScene planetCount Planet generatePlanet planetIsNotTooFar drawPlanets planetIsNotTooFar arePlanetsOverlapped isCollide testCollision Terrain */

//Variables declared in other files:
/* global _W _H universe startPng camZ spaceship earth planet1 planet2 planet3 planet4 planet5 planet6 planet7 planet8 planet9 planet10 BGM ship1 status explosion_sound ending explosion_ball start_explosion_ball explosion_bgm cam1 started theStartPage narratePoem soundMap terrainPic xp yp maxSpeed sb displayPoem space_age victoryBGM victory keyPressed Position Spaceship */
/* global particles explosion_timer diedScene Particle Explosion Re_explosion start_explosion */
/* global EndScene */
/* global reviveAnimation() */
/* global startPage */
/* global startMillis startMillisNotInitialized Scoreboard poem DisplayWords isClose getWarningLevel Warning drawBackground*/
/* global camX camY tiltZ tiltX speedZ moveAround */
/* global victoryScene winningRays WinningRay WinningScene rayIsNotBehind */

let planetlist = [
  earth,
  planet1,
  planet2,
  planet3,
  planet4,
  planet5,
  planet6,
  planet7,
  planet8,
  planet9,
  planet10
];
let planets = [];


function aliveScene() {
  background(0);
  ship1.draw(camX, camY, camZ - 350, 15, tiltZ, tiltX, spaceship);
  if (frameCount === 1 || frameCount % 180 == 0) {
    generatePlanet(ship1);
  }
  drawPlanets();
  getWarningLevel(ship1, planets);
  // soundMap.draw();
}

//--------------------------------- BEGINNING OF PLANET ---------------------------------
let planetCount = 0;
class Planet extends Position {
  constructor (x, y, z, radius, rings) {
    super(x, y, z);
    this.alphabets = ["A", "E", "I", "O", "U", "M", "N", "N", "1", "4", "7", "8", "9", "2", "3", "5", "6"];
    this.planetNumber = planetCount++;
    this.radius = radius;
    this.rings = rings;
    this.t = int(random(11));
    this.mass = int(random(500, 1000));
    this.angle = 0;
    this.rotateSpeed = int(random(7));
    this.code = random(this.alphabets) + random(this.alphabets) + random(this.alphabets) + random(this.alphabets) + random(this.alphabets) + random(this.alphabets)
    this.temperature = str(round(random(-1000, 2000), 2))+"°C";
    this.oxygen = str(round(random(0, 100), 2))+"%";
    this.water = str(round(random(0,100),2))+"%";
    this.gravity = str(round(random(0,1000),2))+"m/s2";
    this.image = null;
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
  
  getConditions(){
    return [this.code, this.temperature, this.oxygen, this.water, this.gravity]
  }

  rotatePlanet() {
    this.angle += this.rotateSpeed;
    rotateY(this.angle);
  }
  
  draw() {
    push();
    translate(this.x, this.y, this.z);
    noStroke();
    if (this.t === 0) {
      texture(earth);
    } else if (this.t === 1) {
      texture(planet1);
    } else if (this.t === 2) {
      texture(planet2);
    } else if (this.t === 3) {
      texture(planet3);
    } else if (this.t === 4) {
      texture(planet4);
    } else if (this.t === 5) {
      texture(planet5);
    } else if (this.t === 6) {
      texture(planet6);
    } else if (this.t === 7) {
      texture(planet7);
    } else if (this.t === 8) {
      texture(planet8);
    } else if (this.t === 9) {
      texture(planet9);
    } else if (this.t === 10) {
      texture(planet10);
    }
    this.rotatePlanet();
    sphere(this.radius, 30, 30);
    pop();
  }
}
//--------------------------------- END OF PLANET ---------------------------------

//--------------------------------- START OF PLANETSFUNCTIONS ---------------------------------
function generatePlanet(ship) {
  let shipLoc = ship.getLocation();
  let pZ, pY, pS, pX, planetNew, lowerBound, randomness;
  let stopDistance = shipLoc.z - 360 * speedZ; //12 seconds from where ship is
  let randomRange = 2000;
  let distanceBtwPlanets = 0;
  let beginDistance = shipLoc.z - speedZ * 180; // 6 seconds from where ship is

  for (beginDistance; beginDistance >= stopDistance; beginDistance -= 4000) {
    lowerBound = beginDistance;
    pZ = int(random(lowerBound, lowerBound + 3000));

    pX = random(shipLoc.x - 200, shipLoc.x + 200);
    pY = random(shipLoc.x - 200, shipLoc.x + 200);
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(
      random(shipLoc.x - 2 * randomRange, shipLoc.x - 3 * randomRange)
    );
    pY = int(random(shipLoc.y - randomRange, shipLoc.y - 2 * randomRange));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }
    
    pX = int(
      random(shipLoc.x - randomRange, shipLoc.x - 4 * randomRange)
    );
    pY = int(random(shipLoc.y - 2 * randomRange, shipLoc.y - 4 * randomRange));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(random(shipLoc.x + randomRange, shipLoc.x + 3 * randomRange));
    pY = int(random(shipLoc.y - randomRange, shipLoc.y - 2 * randomRange));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }
    
    pX = int(random(shipLoc.x + randomRange, shipLoc.x + 3 * randomRange));
    pY = int(random(shipLoc.y - 2*randomRange, shipLoc.y - 4 * randomRange));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(
      random(shipLoc.x - 1.2 * randomRange, shipLoc.x - 3 * randomRange)
    );
    pY = int(random(shipLoc.y + randomRange, shipLoc.y + 2 * randomRange));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }
    
    pX = int(
      random(shipLoc.x - randomRange, shipLoc.x - 4 * randomRange)
    );
    pY = int(random(shipLoc.y + 2*randomRange, shipLoc.y + 4 * randomRange));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }
    
    pX = int(
      random(shipLoc.x + 1.2 * randomRange, shipLoc.x + 3 * randomRange)
    );
    pY = int(random(shipLoc.y + randomRange, shipLoc.y + 2 * randomRange));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }
    
    pX = int(
      random(shipLoc.x + randomRange, shipLoc.x + 4 * randomRange)
    );
    pY = int(random(shipLoc.y +2* randomRange, shipLoc.y + 4 * randomRange));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(random(shipLoc.x - 500, shipLoc.x + 500));
    pY = int(random(shipLoc.y - 500, shipLoc.y - 1000));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }
    
    pX = int(random(shipLoc.x - 500, shipLoc.x + 500));
    pY = int(random(shipLoc.y + 500, shipLoc.y + 1000));
    pS = int(random(600, 1100));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }
  }
}

function drawPlanets() {
  console.log(planets.length);
  planets = planets.filter(planetIsNotTooFar);
  console.log(planets.length);
  for (let i = 0; i < planets.length; i++) {
    planets[i].draw();
  }
}

function planetIsNotTooFar(planet) {
  if (planet.z - ship1.getLocation().z > 20000 || status === "alive_again") {
    console.log("Planet destroyed");
    return false;
  } else {
    return true;
  }
}

function arePlanetsOverlapped(planet) {
  if (testCollision(planets, planet)) {
    return true;
  } else {
    return false;
  }
}

//--------------------------------- END OF PLANETFUNCTIONS ---------------------------------

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
    if (
      isCollide(myShip.getLocation(), planets[i], myShip.radius, planets[i].radius)
    ) {
      return true;
    }
  }
  return false;
}

class Terrain extends Position{
  constructor(x, y, z, w, h, scale, detial, flying, peak, high) {
    super(x, y, z);
    this.w = w;
    this.h = h;
    this.scale = scale;
    this.detial = detial;
    this.flying = flying;
    this.peak = peak;
    this.high = high;
    this.cols = w / scale;
    this.terrain = [];
    this.rows = h / scale;
    this.createTerrain();
    console.log("successfully created")
  }

  createTerrain() {
    for (let x = 0; x < this.cols; x++) {
      this.terrain[x] = [];
      for (let y = 0; y < this.rows; y++) {
        this.terrain[x][y] = 0; // default value
      }
    }
  }
  
  move() {
    
  }

  draw() {
    push();
    this.flying -= 0.1; // decrease noise space every cycle
    let yoff = this.flying; // y offset
    for (let y = 0; y < this.rows; y++) {
      let xoff = 0; // x offset
      for (let x = 0; x < this.cols; x++) {
        this.terrain[x][y] = map(noise(xoff, yoff), 0, 1, -20, 50);
        xoff += this.peak;
      }
      yoff += this.peak;
    }
    stroke(255);
    noFill();
    rotateX(180 / 2.5);
    translate(this.x, this.y, this.z); // draw relative to center of window
    // ortho()
    for (let y = 0; y < this.rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < this.cols; x++) {
        vertex(x * this.scale, y * this.scale, this.terrain[x][y]);
        vertex(x * this.scale, (y + 1) * this.scale, this.terrain[x][y + 1]);
      }
      endShape();
    }
    pop();
  }
}





/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
/* moveAround */