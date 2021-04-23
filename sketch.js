var spImg
var ast

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
    spImg = loadImage("images/Space.png");
}

function setup(){
    createCanvas(1536,753);
    world = Engine.world

    ast = new Astronaught(300,500,100,200);

}

function draw(){
    background(spImg);

    if(keyCode ===32){
        Matter.Body.applyForce(ast,ast.body,{x:0,y:-4})
    }
     
    drawSprites();
}