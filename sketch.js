var spImg
var ast
var myEngine
var ground
var astpos
var gImg
var lG
var asthitbox

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
    spImg = loadImage("images/Space.png");
    gImg = loadImage("images/e.png")
}

function setup(){
    createCanvas(1536,753);
    myEngine = Engine.create();
    world = myEngine.world

    ground = createSprite(768,740,1536,50);
    ground.addImage(gImg);

    ast = new Astronaught(300,612,300,300);
    astpos = ast.body.position;
    asthitbox = createSprite(300,612,300,300);
    ast.visible = false;

    lG = new Group;


}

function draw(){
    background(spImg);

    if(keyDown(UP_ARROW)){
        astpos.y = astpos.y -10
    } 
    if(keyDown(DOWN_ARROW)){
        astpos.y = astpos.y +2.5
    }
    astpos.y = astpos.y+3
    
    if(astpos.y>612){
        astpos.y = 612
    }

    if(lG.isTouching(asthitbox)){
        lG.destroyEach();
        text("GAME OVER",500,500)
    }

    drawSprites();
    spawnEnemy();
    ast.display();
}

function spawnEnemy(){
    if(frameCount%120===0){
        Lazer = createSprite(1550,Math.round(random(10,700)));
        Lazer.velocityX = -10;
        lG.add(Lazer);
        
    }
}
