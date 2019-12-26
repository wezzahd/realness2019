let ps;


let x = 0;
let y = 0;
let skip = 10; //48 iphone
let factor = 1.0;
let aspect = 9 / 16;

var img;
var first_frame = true;
var go = true;
var counter = 0;

var reset = false;

var cnv;

var LFO = false;

var isMobile = false; //initiate as false

var isAndroid = false;

var intersect_toggle = false;

var eraser_size = 20;

var main_animation = false;

var loading_cap;

var pg;

var alpha_load = 0;

var loading_alpha = 100;

var trigger = false;

var counter = 0;

var ellipse_mouseX, ellipse_mouseY;

var fullscreen_button;

document.addEventListener('touchmove', function(event) {
  if (event.scale !== 1) {
    event.preventDefault();
  }
}, false);





function centerCanvas() {
  var cnv_x = (windowWidth - width) / 2;
  var cnv_y = (windowHeight - height) / 2;
  cnv.position(cnv_x, cnv_y);
}


p5.disableFriendlyErrors = true; // disables FES

function preload() {
  capture = loadImage("blackhole_v2.jpg");





  // device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

if (/android/i.test(navigator.userAgent)) {
        isAndroid = true;
}


}





function setup() {

  if (isMobile == false) {
    skip = 15;
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
  } else {
    skip = 15;
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
  }

  pixelDensity(1);

  //capture = createCapture(VIDEO, ready);


  //capture.elt.setAttribute('playsinline', '');
  ///capture.size(width, height);
  //capture.hide();
  img = createImage(width, height);

  let mouse = createVector();

  pg = createGraphics(width, height);

  loading_capture();

}


function loading_capture() {
  loading_cap = capture.get((capture.width / 2) - (width / 2), (capture.height / 2) - (height / 2), width, height);
  loading_cap.resize(loading_cap.width, loading_cap.height);
}

function ready() {
  go = true;
}


function loadingScreen() {

 // pg.background(loading_cap);
  //  pg.width = width;
 // pg.height = height;
  pg.background(loading_cap);

  pg.noFill();
  pg.stroke(255, alpha_load);
  pg.ellipseMode(CENTER);

  if (frameCount < 90){

  var ellsize = map(frameCount,0,90,eraser_size * 8, eraser_size * 2);
  }else{
    var ellsize = (eraser_size * 2);
  }
  pg.ellipse(width / 2, height / 2 - 20, ellsize);

  pg.noStroke();
  pg.fill(255, (alpha_load));
  pg.textAlign(CENTER, CENTER);

  if (isMobile == false){
  pg.textSize(20);
  }else{
    pg.textSize(20);
  }


  pg.textFont("Oswald");

   pg.noStroke();
  pg.fill(255, (alpha_load));

  pg.textAlign(CENTER, CENTER);

  if (isMobile == false) {
  pg.text('click here for fullscreen', width/2,  (height- 35));
}

  if (isAndroid == true && width < height) {
  pg.text('click here for fullscreen', width/2,  (height- 35));
}

  if (isAndroid == true && height < width) {
  pg.text('click here for fullscreen', width/2,  (20));
}


  pg.textAlign(CENTER, CENTER);

  pg.text('r e a l n e s s', width / 2,  (height/3)-30);




  if (isMobile == false) {

  pg.text('click circle to start', width / 2, height - (height/3));
pg.text('use mouse to disperse pixels', width / 2, height - (height/3) + 40);

}else{
  pg.text('tap circle to start', width / 2, height - (height/3));
pg.text('drag circle to disperse pixels', width / 2, height - (height/3) + 30);

}

if (isMobile == false) {

  pg.text('click and hold mouse button', width / 2, (height - (height/3))+80);
  pg.text('to reconstruct image', width / 2, (height - (height/3))+100);

}else{
   pg.text('two finger touch and hold', width / 2, (height - (height/3))+60);
  pg.text('to reconstruct image', width / 2, (height - (height/3))+80);

}


  image(pg, 0, 0);



  if (loading_alpha <= 0) {
    captureEvent();
    main_animation = true;
    trigger = false;
  }


  if (mouseIsPressed == true && mouseX > (width / 2 - 30) && mouseX < (width / 2 + 30) && mouseY > (height / 2 - 30) && mouseY < (height / 2 + 30) && ellsize == (eraser_size * 2)) {
    trigger = true;
  }
}


function captureEvent() {

  if (first_frame == true & go == true) {

    //img = capture.get();
    //first_frame = false;
    reset = false;

    ps = new ParticleSystem(createVector(width / 2, height / 2), img);
    repeller = new Repeller(width / 2, height / 2);

      capture_crop = capture.get((capture.width / 2) - (width / 2), (capture.height / 2) - (height / 2), width, height);
    capture_crop.resize(capture_crop.width / skip, capture_crop.height / skip);


    if (isMobile == false) {

      var start_width = width/2 - ((skip*16)/2);
       var end_width = width/2 + ((skip*16)/2);
        var start_height = height/2 - ((skip*16)/2);
          var end_height = height/2 + ((skip*16)/2);


      for (var i = (start_width); i < (end_width); i += skip) {
      for (var j = start_height; j < (end_height); j += skip) {
        ps.addParticle((x + i) / factor, (y + j) / factor, 0, capture_crop);
        ps.addParticle((x + i) / factor, (y + j) / factor, 1, capture_crop);
        ps.addParticle((x + i) / factor, (y + j) / factor, 2, capture_crop);
      }
    }
    }else{



    // var inner_length = width/3;//(width/3) - 40;
    // var inner_height = width-(width/3);//int(inner_length * aspect);


      var start_width = width/2 - ((skip*12)/2);
       var end_width = width/2 + ((skip*12)/2);
        var start_height = height/2 - ((skip*12)/2);
          var end_height = height/2 + ((skip*12)/2);


      for (var i = (start_width); i < (end_width); i += skip) {
      for (var j = start_height; j < (end_height); j += skip) {
        ps.addParticle((x + i) / factor, (y + j) / factor, 0, capture_crop);
        ps.addParticle((x + i) / factor, (y + j) / factor, 1, capture_crop);
        ps.addParticle((x + i) / factor, (y + j) / factor, 2, capture_crop);
      }
    }
  }
  }
}

function draw() {


  if (alpha_load < 200) {
    alpha_load = alpha_load + 1;

  }

  if (trigger == true) {
    loading_alpha = loading_alpha - 10.0;
   // trigger = false;
  }




  if (main_animation == false) {
    loadingScreen();
  } else {
    blackhole_draw();
  }
}

function blackhole_draw() {



  if (counter < 5) {
   mouseX = width - 40;
  mouseY = height/2;
  }else{
    mouseX = mouseX;
    mouseY = mouseY;
  }

  if (counter < 25) {

    counter = counter + 1;
  }


  blendMode(BLEND);
  background(0);


  blendMode(ADD);

  noCursor();

 if (displayHeight > 800){

  var zoom = map(counter,0, 25, 1.0, 1.5);
  translate(width/2 - ((width/2)*zoom) ,height/2 - ((height/2)*zoom));
  scale(zoom);
  }




  // The touches array holds an object for each and every touch
  // The array length is dynamic and tied to the number of fingers
  // currently touching

  for (var i = 0; i < touches.length; i++) {

    if (isMobile == true && touches.length == 1) {
      mouseIsPressed = false;
    }
    if (isMobile == true && touches.length >= 2) {
      mouseIsPressed = true;
    }

  }


  ps.run();

 // if (intersect_toggle == true) {
 //   // ps.intersection();
 // }

  ps.behaviors();
  ps.applyRepeller(repeller);



  if (mouseIsPressed) {
    ps.return_home();


  }

  if (LFO == true) {
    ps.return_home();
  }



  var sine = abs(1 * sin(TWO_PI * frameCount / 1600));

  if (sine <= 0.01) {
    LFO = true;
  } else {
    LFO = false;
  }

  stroke(255);
  noFill();
  ellipse(mouseX, mouseY, eraser_size * 2, eraser_size * 2);

  if (counter < 25) {

    var trans = map(counter, 0,25, 255,0);

    blendMode(BLEND);
noStroke();
  fill(0,trans);
  rect(0,0,width,height);

  }


}


function touchMoved(event) {
  return false;
}


function windowResized() {

if (main_animation == true) {

  resizeCanvas(windowWidth, windowHeight);
  centerCanvas();
  captureEvent();
}else{

  resizeCanvas(windowWidth, windowHeight);
  //centerCanvas();
  loading_capture();
    pg = createGraphics(width, height);

  loadingScreen();



}
}

function mousePressed() {

  if (mouseX > 0 && mouseX < width && mouseY > height-40 && mouseY < height && isMobile == false) {
    let fs = fullscreen();
    fullscreen(!fs);
  }


  if (mouseX > 0 && mouseX < width && mouseY > height-40 && mouseY < height && isAndroid == true && width < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 30 && isAndroid == true && height < width) {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  //if (intersect_toggle == false) {
  //  intersect_toggle = true;

  //} else {
  //  intersect_toggle = false;




}
