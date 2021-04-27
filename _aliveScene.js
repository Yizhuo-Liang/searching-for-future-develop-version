//Place function & variables declared here:
//

let ship1;
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

function aliveScene() {
  background(0);
  moveAround();
  ship1.draw(camX, camY, camZ - 350, 15, tiltZ, tiltX, spaceship);
  if (frameCount === 1 || frameCount % 180 == 0) {
    generatePlanet(ship1);
  }
  drawPlanets();
  getWarningLevel(ship1, planets);
  sb.draw(
    ship1.getLocation().x + _W / 4,
    ship1.getLocation().y - _H / 4,
    ship1.getLocation().z
  );

  displayPoem.draw(
    ship1.getLocation().x,
    ship1.getLocation().y + _H / 4,
    ship1.getLocation().z
  );
}

//--------------------------------- BEGINNING OF PLANET ---------------------------------
let planetCount = 0;
class Planet extends Position{
  constructor(x, y, z, radius, rings) {
    super(x, y, z);
    this.planetNumber = planetCount++;
    this.radius = radius;
    this.rings = rings;
    this.t = int(random(11));
    this.mass = int(random(500, 1000));
    this.angle = 0;
    this.rotateSpeed = int(random(7));
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
  let stopDistance = shipLoc.z - 360 * speedZ;
  let randomRange = 2000;
  let distanceBtwPlanets = 0;
  let beginDistance = shipLoc.z - speedZ * 180;

  for (beginDistance; beginDistance >= stopDistance; beginDistance -= 4000) {
    lowerBound = beginDistance;
    pZ = int(random(lowerBound, lowerBound + 1000));
    pX = random(shipLoc.x - 200, shipLoc.x + 200);
    pY = random(shipLoc.x - 200, shipLoc.x + 200);
    pS = int(random(300, 700));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(
      random(shipLoc.x - 1.2 * randomRange, shipLoc.x - 3 * randomRange)
    );
    pY = int(random(shipLoc.y - randomRange, shipLoc.y - 2 * randomRange));
    pS = int(random(300, 700));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(random(shipLoc.x + randomRange, shipLoc.x + 3 * randomRange));
    pY = int(random(shipLoc.y - randomRange, shipLoc.y - 2 * randomRange));
    pS = int(random(300, 700));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(
      random(shipLoc.x - 1.2 * randomRange, shipLoc.x - 3 * randomRange)
    );
    pY = int(random(shipLoc.y + randomRange, shipLoc.y + 2 * randomRange));
    pS = int(random(300, 700));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(
      random(shipLoc.x + 1.2 * randomRange, shipLoc.x + 3.8 * randomRange)
    );
    pY = int(random(shipLoc.y + randomRange, shipLoc.y + 2 * randomRange));
    pS = int(random(300, 700));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(random(shipLoc.x - 1500, shipLoc.x - 3000));
    pY = int(random(shipLoc.y - 50, shipLoc.y + 50));
    pS = int(random(300, 700));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(random(shipLoc.x + 1500, shipLoc.x + 3000));
    pY = int(random(shipLoc.y - 50, shipLoc.y + 50));
    pS = int(random(300, 700));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(random(shipLoc.x - 5000, shipLoc.x - 10000));
    pY = int(random(shipLoc.y - 200, shipLoc.y + 200));
    pS = int(random(300, 700));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(random(shipLoc.x + 5000, shipLoc.x + 10000));
    pY = int(random(shipLoc.y - 200, shipLoc.y + 200));
    pS = int(random(300, 700));
    planetNew = new Planet(pX, pY, pZ, pS, 0);
    if (!arePlanetsOverlapped(planetNew)) {
      planets.push(planetNew);
    }

    pX = int(random(shipLoc.x - 300, shipLoc.x + 300));
    pY = int(random(shipLoc.y - 1000, shipLoc.y - 5000));
    pS = int(random(300, 700));
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
      isCollide(myShip.position, planets[i], myShip.radius, planets[i].radius)
    ) {
      return true;
    }
  }
  return false;
}

/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
