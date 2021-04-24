var bgG0
var bgG1
var bgG2
var ast
var myEngine
var ground
var astpos
var gImg
var lG
var ahB
var gameState = 0
var lP
var foodStock
var startButton

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
    bgG0 = loadImage("images/Blue wall 2.png");
    bgG1 = loadImage("images/Space.png");
    gImg = loadImage("images/e.png")
}

function setup(){
    database=firebase.database();
    createCanvas(1536,753);
    myEngine = Engine.create();
    world = myEngine.world
    /*
    fS=database.ref('FasS');
    fS.on("value",fS);
    foodStock = data.val()
    */
    ground = createSprite(768,740,1536,50);
    ground.addImage(gImg);

    ast = new Astronaught(300,612,300,300);
    astpos = ast.body.position;
    //ahB = createSpri
    

    lG = new Group;
}

function draw(){
    if(gameState === 0){
        background(bgG0);
        /*
        text("Food Supply = "+foodStock,1000,100);
        */
        sB();
    }

    if(gameState === 1){
        background(bgG1);
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
        if(lG.isTouching(ahB)){
        lG.destroyEach();
        gamestate = 2
        }
        spawnEnemy();
    }

    else if(gameState === 2){
        text("GAME OVER",500,500);
    }

    drawSprites();
    ast.display();
}

function spawnEnemy(){
    if(frameCount%120===0){
        Lazer = createSprite(1550,Math.round(random(10,700)));
        Lazer.velocityX = -10;
        lG.add(Lazer);
        
    }
}

function sB(){
    startButton = createSprite(screen.width/2,screen.height/2,25,25);
    if(mouseClicked(startButton)){
        gameState = 1
    }
}
