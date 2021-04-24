class Astronaught{
    constructor(x,y,width,height){  
      var options={
        restitution:0.5,
        friction:0.5,
        density:1.2
      }
      this.width = width;
      this.height = height;
      this.image = loadImage("images/Astronaught.png");
      this.body = Bodies.rectangle(x,y,width,height,options);
      World.add(world,this.body);
    }
    display(){
      var astpos= this.body.position;
      push();
      translate(astpos.x,astpos.y);
      rectMode(CENTER);
      fill("WHITE");
      imageMode(CENTER);
      image(this.image,0,0,this.width,this.height);
      pop()
    }
  }
