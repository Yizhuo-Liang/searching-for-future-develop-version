class Vector3D {
  constructor(x, y, z) {
    this.x;
    this.y;
    this.z;
  }
}

function getAcceleration(myShip) {
  // let closePlanet = findClosestPlanet(myShip);
  // if(closePlanet === null) return new Vector3D(0, 0, 0);
  // if(closePlanet.length === 0) return new Vector3D(0, 0, 0);
  // let distance = distFromLocations(myShip.getLocation(), closePlanet.position);
  // // console.info("ClosePlanet Loc: " + closePlanet.x + " ** " + closePlanet.y + " ** " + closePlanet.z);
  // let unitVector = new Vector3D((closePlanet.x - myShip.getLocation.x)/distance, (closePlanet.y - myShip.getLocation.y)/distance, (closePlanet.z - myShip.getLocation.z)/distance);
  // let strength = 1/(pow(distance, 1.5))
  // if(strength > 20) strength = 20;
  // let acceleration = new Vector3D(strength * unitVector.x, strength * unitVector.y, strength * unitVector.z);
  // return acceleration;

  return new Vector3D(5, 5, 5);

  let acc = new Vector3D(0, 0, 0);
  if (planets === []) {
    return acc;
  }
  for (let i = 0; i < planets.length; i++) {
    if (
      isCloseForGravity(
        myShip.position,
        planets[i],
        myShip.radius,
        planets[i].radius
      )
    ) {
      let distance = dist(
        myShip.position.x,
        myShip.position.y,
        myShip.position.z,
        planets[i].x,
        planets[i].y,
        planets[i].z
      );
      let unitVector = new Vector3D(
        (planets[i].x - myShip.getLocation.x) / distance,
        (planets[i].y - myShip.getLocation.y) / distance,
        (planets[i].z - myShip.getLocation.z) / distance
      );
      let strength = 1 / pow(distance, 1.5);
      if (strength > 20) strength = 20;
      if (unitVector.x != null && strength != null)
        acc.x += unitVector.x * strength;
      if (unitVector.y != null && strength != null)
        acc.x += unitVector.y * strength;
      if (unitVector.z != null && strength != null)
        acc.x += unitVector.z * strength;
    }
  }
  return acc;
}

function testCloseGravity(myShip, planets) {
  console.log("testing");
  if (planets === []) {
    return false;
  }
  for (let i = 0; i < planets.length; i++) {
    if (
      isCloseForGravity(myShip.position, planets[i], 155, planets[i].radius)
    ) {
      return true;
    }
  }
  return false;
}

function findClosestPlanet(myShip) {
  if (planets === null) return null;
  if (planets.length === 0) return null;
  let closePlanet = planets[1];
  let distance = distFromLocations(myShip.getLocation(), closePlanet.position);
  for (let i = 2; i < planets.length; i++) {
    if (frameCount % 50 == 0)
      console.info(
        "compare: i: " +
          i +
          " -" +
          distance +
          " ----- " +
          distFromLocations(myShip.getLocation(), planets[i].position)
      );
    if (
      distFromLocations(myShip.getLocation(), planets[i].position) < distance
    ) {
      distance = distFromLocations(myShip.getLocation(), planets[i].position);
      closePlanet = planets[i];
    }
  }
  console.info("PlanetNum: " + closePlanet.planetNumber);
  return closePlanet;
}

function isCloseForGravity(objPosition, trgtPosition, objRadius, trgtRadius) {
  let distance = dist(
    objPosition.x,
    objPosition.y,
    objPosition.z,
    trgtPosition.x,
    trgtPosition.y,
    trgtPosition.z
  );
  return distance - 800 < objRadius + trgtRadius;
}

function distFromLocations(location1, location2) {
  return dist(
    location1.x,
    location1.y,
    location1.z,
    location2.x,
    location2.y,
    location2.z
  );
}
/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop */
