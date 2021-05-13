let cols;
let rows;
let w = 1400;
let h = 800;
let scale_name = 25;
let detial = 1; //cannot change
let flying = 0.1;
let peak = 0.12;
let high = 0;

let concrete;
let terrain_2 = [];






let nb_ruin;
let nb_garbage;
let nb_high_building;

let flying_speed = 0.1;
let tree_speed = 10;

let ruin_list= [];
let xoff = 0.0;

let ruin_background;



function preload() {
  nb_ruin = loadModel("assets/ruin.obj");
  ruin_background = loadImage(
    "https://cdn.glitch.com/0d62f7df-1918-459f-b472-1f38130432c1%2F%E6%9C%AB%E6%97%A5.png?v=1620850487789"
  );
  concrete = loadImage(
    "https://cdn.glitch.com/0d62f7df-1918-459f-b472-1f38130432c1%2F%E6%B0%B4%E6%B3%A5.png?v=1620852115755"
  );
  nb_garbage = loadModel(
    "assets/garbage.obj"
  );
  nb_high_building = loadModel(
    "assets/high_building.obj"
  );
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  console.info(concrete.width, concrete.height)
  concrete.resize(500,0)
}
class ruin {
  constructor(x,z) {
    this.x = x;
    this.z = z;
  }
  
  draw() {
    push();
    
    texture(concrete);
    rotateX(PI/2.5);
    translate(this.x, this.z, 30);
    rotateX(PI/2);
    rotateY(PI/2);
    scale(7);
    model(nb_ruin);

    pop();

  }
}


class garbage {
  constructor(x,z) {
    this.x = x;
    this.z = z;
  }
  
  draw() {
    push();
    
    texture(concrete);
    rotateX(PI/2.5);
    translate(this.x, this.z, 30);
    rotateX(PI/2);
    rotateY(PI/2);
    scale(0.4);
    model(nb_garbage);

    pop();

  }
}


class high_building {
  constructor(x,z) {
    this.x = x;
    this.z = z;
  }
  
  draw() {
    push();
    
    texture(concrete);
    rotateX(PI/2.5);
    translate(this.x, this.z, 100);
    rotateZ(PI/2);
    scale(0.010);
    model(nb_high_building);

    pop();

  }
}






class T {
  constructor(flying_speed) {
    // this.backgournd(0);
    this.flying_speed= flying_speed;
    this.graphics = createGraphics(20,20);
    this.graphics.background(0,0);
    this.graphics.image(concrete, 0, 0);
  }
  draw() {
    cols = w / scale_name;
    rows = h / scale_name;

    for (let x = 0; x < cols; x++) {
      terrain_2[x] = [];
      for (let y = 0; y < rows; y++) {
        terrain_2[x][y] = 0; // default value
      }
    }

    push();
   
    
    flying -= this.flying_speed; // decrease noise space every cycle

    let yoff = flying; // y offset
    for (let y = 0; y < rows; y++) {
      let xoff = 0; // x offset
      for (let x = 0; x < cols; x++) {
        terrain_2[x][y] = map(noise(xoff, yoff), 0, 1, -20, 50);
        xoff += peak;
      }
      yoff += peak;
    }

    background(0, 0, 0); // black background

    stroke(255);
    
    noFill();
    rotateX(PI / 2.5);
    translate(0,-180,0);
    translate(-w / 2, 0); 

    for (let y = 0; y < rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
   
        vertex(x * scale_name, y * scale_name, terrain_2[x][y]);
        vertex(x * scale_name, (y + 1) * scale_name, terrain_2[x][y + 1]);
      }

      
      endShape();
    }
    pop();
  }
}
function draw() {
  let terrain = new T(flying_speed);
  
  terrain.draw();
  xoff = xoff + 1;
  let n = noise(xoff) * width;
  console.log(n)
  
  
  
  if (n<400){
      let tree_z = -400;

      let n = random(0,1)
      
      if(n<0.3){
        let ruin = new ruin(int(random(-700,700)), tree_z)
        ruin_list.push(ruin);
      }
      else if(n>0.3 && n<0.86){
        let garbage = new garbage(int(random(-700,700)), tree_z)
        ruin_list.push(garbage);
      }
      else{
        let high_building = new high_building(int(random(-700,700)), tree_z)
        ruin_list.push(high_building);
      }
      
    }

  for (let i = 0; i < ruin_list.length; i++) {
    ruin_list[i].z += 10;
    ruin_list[i].draw();
  }
  

  
  

  push()
  rotateX(-PI/20);
  translate(0,-200,450);
  
  noStroke()
  texture(ruin_background)
  sphere(750)
  pop()
}




/* global p5 sphere int detail random objPositon alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseIsPressed mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType freq setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR setADSR noteAttack noteRelease dispose isLoaded playMode set isLooping isPlaying isPaused setVolume pan getPan rate duration currentTime jump channels sampleRate frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues save getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setADSR setRange setExp triggerAttack triggerRelease r width setType input output stream mediaStream currentSource enabled amplitude getSources setSource bands process panner process positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay process delayTime feedback filter setType process convolverNode process impulses addImpulse resetImpulse toggleImpulse sequence setBPM getBPM addPhrase removePhrase getPhrase replaceSequence onStep setBPM musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor process attack knee ratio threshold release reduction record isDetected update onPeak WaveShaperNode process getAmount getOversample amp setInput connect disconnect play pause stop set smooth start add mult loop TRIANGLE_STRIP*/
