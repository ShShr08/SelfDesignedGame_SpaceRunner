class Astronaught{
    constructor(x,y,radius){  
      var options={
      }
      this.x = x;
      this.y = y;
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
      rectangle(x,y,width,height);
      pop();
      imageMode(CENTER);
      image(this.image,this.body);
    }
  }