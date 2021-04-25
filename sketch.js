var bgG0;
var bgG1;
var bgG2;
var ast;
var myEngine;
var ground;
var astpos;
var gImg;
var lG;
var ahB1,ahB2,ahB3,ahB4,ahB5,ahB6,ahbG;
var gameState = 0;
var lP;
var foodStock = 10;
var waterStock = 5;
var startButton;
var rI;
var w1,w2,w3,w4,w5,wI1,wI2,wI3,wI4,wI5;
var fm,fl,fmI,flI


const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
    bgG0 = loadImage("images/Blue wall 2.png");
    bgG1 = loadImage("images/Space.png");
    gImg = loadImage("images/e.png");
    rI = loadImage("images/Rocket.png");
    wI5 = loadImage("images/Water5.png");
    wI4 = loadImage("images/Water4.png");
    wI3 = loadImage("images/Water3.png");
    wI2 = loadImage("images/Water2.png");
    wI1 = loadImage("images/Water1.png");
    fmI = loadImage("images/CannedFood2.png");
    flI = loadImage("images/CannedFood1.png");
}

function setup(){
    createCanvas(1536,722);
    myEngine = Engine.create();
    world = myEngine.world
    /*
    fS=database.ref('FasS');
    fS.on("value",fS);
    foodStock = data.val()
    */
    ground = createSprite(768,720,1536,50);
    ground.addImage(gImg);

    ast = new Astronaught(300,575,300,300);
    astpos = ast.body.position;
    rc = createSprite(35,480,5,500);
    rc.addImage(rI);
    ahbG = new Group;
    ahB = createSprite(365,483,1,75);
    ahB2 = createSprite(395,545,1,65);
    ahB3 = createSprite(368,631,1,140);
    ahB4 = createSprite(290,446,150,1);
    ahB5 = createSprite(290,700,150,1);
    ahB6 = createSprite(215,573,1,255);
    ahbG.add(ahB)
    ahbG.add(ahB2);
    ahbG.add(ahB3);
    ahbG.add(ahB4);
    ahbG.add(ahB5);
    ahbG.add(ahB6);
    ahB.visible = false
    ahB2.visible = false
    ahB3.visible = false
    ahB4.visible = false
    ahB5.visible = false
    ahB6.visible = false
    
    w5 = createSprite(1400,650,100,100);
    w5.addImage(wI5);
    w5.scale = 0.5;
    w4 = createSprite(1400,650,100,100);
    w4.addImage(wI4);
    w4.scale = 0.5;
    w3 = createSprite(1400,650,100,100);
    w3.addImage(wI3);
    w3.scale = 0.5;
    w2 = createSprite(1400,650,100,100);
    w2.addImage(wI2);
    w2.scale = 0.5;
    w1 = createSprite(1400,650,100,100);
    w1.addImage(wI1);
    w1.scale = 0.2;
    
    lG = new Group;
}

function draw(){
    if(gameState === 0){
        background(bgG0);
        ahB.collide(ground);
        /*
        text("Food Supply = "+foodStock,1000,100);
        */
        sB();
        if(waterStock === 5){
            w5.visible = true
            w4.visible = false
            w3.visible = false
            w2.visible = false
            w1.visible = false
        }
        if(waterStock === 4){
            w5.visible = false
            w4.visible = true
            w3.visible = false
            w2.visible = false
            w1.visible = false
        }
        if(waterStock === 3){
            w5.visible = false
            w4.visible = false
            w3.visible = true
            w2.visible = false
            w1.visible = false
        }
        if(waterStock === 2){
            w5.visible = false
            w4.visible = false
            w3.visible = false
            w2.visible = true
            w1.visible = false
        }
        if(waterStock === 1){
            w5.visible = false
            w4.visible = false
            w3.visible = false
            w2.visible = false
            w1.visible = true
        }
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
            astpos.y = 612;
        }
        if(lG.isTouching(ahbG)){
        lG.destroyEach();
        gameState = 2
        }
        w5.visible = false
        w4.visible = false
        w3.visible = false
        w2.visible = false
        w1.visible = false
        rc.visible = false
        startButton.visible = false
        spawnEnemy();
    }



    else if(gameState === 2){
        text("GAME OVER",500,500);
        rc.visible = false
        startButton.visible = false
    }

    if(frameCount%3000 === 0){
        foodStock = foodStock-1;
    }
    if(frameCount%5000 === 0){
        waterStock = waterStock-1
    }
    drawSprites();
    ast.display();
    //console.log(water.x);
}

function spawnEnemy(){
    if(frameCount%120 === 0){
        Lazer = createSprite(1550,Math.round(random(10,700)));
        Lazer.velocityX = -10;
        lG.add(Lazer);
        
    }
}

function sB(){
    startButton = createSprite(768,361,45,45);
    if(mousePressedOver(startButton)){
        gameState = 1
    }
}
