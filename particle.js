class Particle {
  constructor(x, y, rand, img_) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.velocity_v2 = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector();
    this.home = this.position.copy();
    this.lifespan = 255.0;
    this.fill_alpha = 255.0;
    this.rand = rand;
    this.img = img_;
    this.size_v2 = skip;
    this.maxsize = 100/(random(1,skip));//random(1, 3) * (height/12) ;//40 //50;
    this.radius = 25;
    this.highlight = false;
    this.maxspeed = 2;
    this.maxforce = 1;
    this.resize = random(0.1, 0.5);
    this.strokeweight = 1.0;
    this.selected = false;
    this.period = (this.rand + 1) * 600;
    this.fillperiod = (this.rand + 1) * 200;
    this.amplitude = this.lifespan;
    this.local_force = false;
  }

  colour(rand) {

    this.c = this.img.get(this.home.x / skip, this.home.y / skip);

    this.r = red(this.c);
    this.g = green(this.c);
    this.b = blue(this.c);





    this.random_color_gen = [];
    this.random_color_gen[0] = color(this.r, 0, 0);
    this.random_color_gen[1] = color(0, this.g, 0);
    this.random_color_gen[2] = color(0, 0, this.b);
    this.random_color_gen[3] = color(this.r, 0, 0);
    this.random_color_gen[4] = color(0, this.g, 0);
    this.random_color_gen[5] = color(0, 0, this.b);

    this.fill_col = this.random_color_gen[rand];
    this.stroke_col = this.random_color_gen[(rand + 3)];
  }

  run() {
    this.update();
    this.display();
  }

  behaviors(px, py) {
    this.mouse = createVector(px, py);
    var flee = this.flee(this.mouse);
    flee.mult(1.0);


    this.applyForce(flee);
  }


  flee() {
    var desired = p5.Vector.sub(this.mouse, this.position);
    var d = dist(this.mouse.x, this.mouse.y, this.position.x, this.position.y);
    this.mouseradius = eraser_size;
    this.positionradius = (this.size_v2/2);


    //var d = desired.mag();

    if (d < this.mouseradius + this.positionradius) {
      desired.setMag(this.maxspeed);
      desired.mult(10.0);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.local_force = true;
      return steer;
   } else {
     return createVector(0, 0);
    }

    // if (d < 100) {
    //   desired.setMag(this.maxspeed);
    //   desired.mult(10.0);
    //   var steer = p5.Vector.sub(desired, this.velocity);
    //   steer.limit(this.maxforce);
    //   //this.local_force = true;
    //   return steer;
    // } else {
    //   return createVector(0, 0);
    // }


  }


  intersects(other) {
    this.dir = p5.Vector.sub(this.position, other.position);
    return (this.dir.magSq() < ((this.size_v2) * (this.size_v2)) && this.local_force == true &&
      this.position.x !== 0 && this.position.x !== width && this.position.y !== 0 && this.position.y !== height);
  }

  intersectForce() {
    this.dir.setMag(.5);
    this.applyForce(this.dir);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 0.0;
    this.velocity.limit(5);

    this.c = 0.01;
    this.speed = this.velocity.mag();
    this.dragMagnitude = this.c * this.speed * this.speed;
    this.drag = this.velocity.copy();
    this.drag.mult(-1);
    this.drag.normalize();
    this.drag.mult(this.dragMagnitude);
    this.velocity.add(this.drag);

    this.colour(this.rand);
    this.d = dist(this.position.x, this.position.y, this.home.x, this.home.y);

    this.stroke_alpha_osc = this.amplitude * sin(TWO_PI * frameCount / this.period);
    this.fill_alpha_osc = (this.amplitude / 3.75) * cos(TWO_PI * frameCount / this.fillperiod);

    if (this.local_force == true) {
        this.velocity = this.velocity_v2;
    }



//if (mouseIsPressed) {
//      this.local_force = false;
//    }



    if (this.position.x > 0 && this.position.x < width/3 && this.rand == 0) {
       this.fill_col = this.random_color_gen[1];
       this.stroke_col = this.random_color_gen[4];
    }


    if (this.position.x > 0 && this.position.x < width/3 && this.rand == 1) {
       this.fill_col = this.random_color_gen[2];
      this.stroke_col = this.random_color_gen[5];
    }

    if (this.position.x > 0 && this.position.x < width/3 && this.rand == 2) {
       this.fill_col = this.random_color_gen[0];
      this.stroke_col = this.random_color_gen[3];
    }

    if (this.position.x > width/3*2 && this.position.x < width && this.rand == 0) {
       this.fill_col = this.random_color_gen[2];
       this.stroke_col = this.random_color_gen[5];
    }


    if (this.position.x > width/3*2 && this.position.x < width && this.rand == 1) {
       this.fill_col = this.random_color_gen[0];
      this.stroke_col = this.random_color_gen[3];
    }

    if (this.position.x > width/3*2 && this.position.x < width && this.rand == 2) {
       this.fill_col = this.random_color_gen[1];
      this.stroke_col = this.random_color_gen[4];
    }



    if (this.amplitude < this.lifespan) {
      this.amplitude += 5.0;
    }

    if (this.size_v2 < this.maxsize) {
      this.size_v2 += this.resize;

    }


   if (this.local_force == false) {
      this.maxsize = skip;
    }else{


      this.maxsizepercent = [];
      this.maxsizepercent[0] = skip;
      this.maxsizepercent[1] = skip;

       //if (displayHeight < 900){

       this.maxsizepercent[2] = 100;

    // }else{
     //  this.maxsizepercent[2] = 200;
     //}

      this.maxsize = this.maxsizepercent[int(random(0,3))];
    }

    if (this.lifespan > 150.0 && this.local_force == true) {
      this.lifespan -= 0.5;
    }
    if (this.fill_alpha > 40.0 && this.local_force == true) {
      this.fill_alpha -= 1.0;
    }

    if (this.strokeweight > 1.0) {
      this.strokeweight -= 0.0;
    }

    if (this.position.y < 0) {
      this.position.y = height;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    }
    if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.x > width) {
      this.position.x = 0;
    }

  }

  // Method to display
  display() {

    if (mouseIsPressed || LFO == true) {

      this.fill_alpha = map(this.d, 0, 500, 255, 40);
      this.size_v2 = map(this.d, 0, 500, skip, this.maxsize);
      //this.amplitude = map(this.d, 0, 500, 0, this.amplitude);
      this.size_osc = 0;
    }

    if (this.d > 0.05 && mouseIsPressed) {
      this.local_force = false;
    }

    this.fill_col.setAlpha(this.fill_alpha + this.fill_alpha_osc);
    this.stroke_col.setAlpha(this.lifespan + this.stroke_alpha_osc);

    //push();
    //translate(this.position.x * 1.4,this.position.y * 1.4)
    //scale(1.4);
    stroke(this.stroke_col);
    fill(this.fill_col);
    strokeWeight(this.strokeweight);
    ellipseMode(CENTER);
    ellipse(this.position.x, this.position.y,
      (this.size_v2));
    //pop();
  }

  isDead() {
    if (reset == true) {
      return true;
    } else {
      return false;
    }
  }
}
