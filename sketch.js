var bgG0;
var bgG1;
var bgG2;
var ast;
var myEngine;
var ground;
var astpos;
var gImg;
var lG;
var ahB,ahB2,ahB3,ahB4,ahB5,ahB6,ahbG;
var gameState = 0;
var lP;
var foodStock = 10;
var waterStock = 5;
var startButton;
var rI;
var w1,w2,w3,w4,w5,wI1,wI2,wI3,wI4,wI5;
var fm,fl,fmI,flI;
var rSt;
var rStVal=1;
var score = 0;


const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
    if(hour()<12){
        bgG0 = loadImage("images/SpaceDay.png");
    }
    else if(hour()>12){
        bgG0 = loadImage("images/SpaceNight.png");
    }
    bgG1 = loadImage("images/Space.png");
    gImg = loadImage("images/e.png");
    rI = loadImage("images/Rocket.png");
    wI5 = loadImage("images/Water5.png");
    wI4 = loadImage("images/Water4.png");
    wI3 = loadImage("images/Water3.png");
    wI2 = loadImage("images/Water2.png");
    wI1 = loadImage("images/Water1.png");
    fmI = loadImage("images/CannedFood1.png");
    flI = loadImage("images/CannedFood2.png");
}

function setup(){
    database=firebase.database();
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
    
    fm = createSprite(1200,650,100,100);
    fm.addImage(fmI);
    fm.scale = 0.7;
    fl = createSprite(1200,650,100,100);
    fl.addImage(flI);
    fl.scale = 1
    
    startButton = createSprite(768,361,45,45);
    rSt = createSprite(30,480,25,25);

    lG = new Group;
}

function draw(){
    if(gameState === 0){
        background(bgG0);
        ahB.collide(ground);
        fill("white");
        /*
        text("Click here to start playing",700,320);
        textSize(20);
        text("Text is currently down due to immense lag, please wait while im fixing it",900,500);
        */
        if(mousePressedOver(rSt) && rStVal === 1){
            foodStock+5;
            waterStock+5;
            rStVal-1
        }
        rSt.visible = false
        /*
        if(foodStock >8 || foodStock ===8){
            fill("darkgreen");
            text("Food supply = "+foodStock,1125,500);
        }
        if(foodStock >6 && foodStock<8 || foodStock === 6){
            fill("lightgreen");
            text("Food supply = "+foodStock,1125,500);
        }
        if(foodStock >4 && foodStock<6 || foodStock === 4){
            fill("yellow");
            text("Food supply = "+foodStock,1125,500);
        }
        if(foodStock >2 && foodStock<4 || foodStock === 2){
            fill("orange");
            text("Food supply = "+foodStock,1125,500);
        }
        if(foodStock <2 || foodStock === 0){
            fill("red");
            text("Food supply = "+foodStock,1125,500);
        }
        */
        if(foodStock >5){
            fm.visible = true
            fl.visible = false
        }
        if(foodStock <5){
            fm.visible = false
            fl.visible = true
        }
        if(foodStock === 0){
            fm.visible = false
            fl.visible = false
        }
        /*
        if(waterStock === 5){
            fill("darkgreen");
            text("Water supply = "+waterStock,1325,500);
        }
        if(waterStock === 4){
            fill("lightgreen");
            text("Water supply = "+waterStock,1325,500);
        }
        if(waterStock === 3){
            fill("yellow");
            text("Water supply = "+waterStock,1325,500);
        }
        if(waterStock === 2){
            fill("orange");
            text("Water supply = "+waterStock,1325,500);
        }
        if(waterStock === 1){
            fill("red");
            text("Water supply = "+waterStock,1325,500);
        }
        if(waterStock === 0){
            fill("red");
            text("Water supply = "+waterStock,1325,500);
        }
        */
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
        if(waterStock === 0){
            w5.visible = false
            w4.visible = false
            w3.visible = false
            w2.visible = false
            w1.visible = false
        }
        sB();
    }



    if(gameState === 1){
        background(bgG1);
        text("Score : "+score,1300,100);
        score = score+1;
        if(keyDown(UP_ARROW)){
            astpos.y = astpos.y -10;
            ahB.y = ahB.y -10;
            ahB2.y = ahB2.y -10;
            ahB3.y = ahB3.y -10;
            ahB4.y = ahB4.y -10;
            ahB5.y = ahB5.y -10;
            ahB6.y = ahB6.y -10;
        } 
        if(keyDown(DOWN_ARROW)){
            astpos.y = astpos.y +2.5;
            ahB.y = ahB.y+2.5;
            ahB2.y = ahB2.y+2.5;
            ahB3.y = ahB3.y+2.5;
            ahB4.y = ahB4.y+2.5;
            ahB5.y = ahB5.y+2.5;
            ahB6.y = ahB6.y+2.5;
        }
        astpos.y = astpos.y+3;
        ahB.y = ahB.y+3;
        ahB2.y = ahB2.y+3;
        ahB3.y = ahB3.y+3;
        ahB4.y = ahB4.y+3;
        ahB5.y = ahB5.y+3;
        ahB6.y = ahB6.y+3;
           
        if(lG.isTouching(ahbG)){
            lG.destroyEach();
            gameState = 2
        }
        w5.visible = false
        w4.visible = false
        w3.visible = false
        w2.visible = false
        w1.visible = false
        fm.visible = false
        fl.visible = false
        rc.visible = false
        spawnEnemy();
    }



    else if(gameState === 2){
        text("GAME OVER",500,500);
        rc.visible = false
    }

    if(astpos.y>575){
        astpos.y = 575;
    }
    if(astpos.y<=125){
        astpos.y = 125;
    }
    if(ahB.y<=36){
        ahB.y = 36;
    }
    if(ahB2.y<=98){
        ahB2.y = 98;
    }
    if(ahB3.y<=184){
        ahB3.y = 184;
    }
    if(ahB4.y<=0){
        ahB4.y = 0;
    }
    if(ahB5.y<=254){
        ahB5.y = 254;
    }
    if(ahB6.y<=125){
        ahB6.y = 125;
    }
    if(ahB.y>483){
        ahB.y = 483;
    }
    if(ahB2.y>545){
        ahB2.y = 545;
    }
    if(ahB3.y>631){
        ahB3.y = 631;
    }
    if(ahB4.y>446){
        ahB4.y = 446;
    }
    if(ahB5.y>700){
        ahB5.y = 700;
    }
    if(ahB6.y>573){
        ahB6.y = 573;
    }
    if(frameCount%500 === 0){
        foodStock = foodStock-1;
    }
    if(frameCount%1000 === 0){
        waterStock = waterStock-1;
    }
    drawSprites();
    ast.display();
    //console.log(hour());
}

function spawnEnemy(){
    if(frameCount%100 === 0){
        Lazer = createSprite(1550,Math.round(random(10,650)),Math.round(random(50,200)),Math.round(random(50,200)));
        Lazer.shapeColor = "red";
        Lazer.velocityX = -13;
        lG.add(Lazer);
        
    }
}

function sB(){
    if(foodStock >=2 && waterStock>=1){
        if(mousePressedOver(startButton)){
            gameState = 1
        }
        if(gameState === 1 || gameState === 2){
             startButton.visible = false
        }
    }
    else if(mousePressedOver(startButton && foodStock<=1 && waterStock === 0)){
        text("Sorry but your food and water stock is very low, too bad you're gonna have to restart the page",300,500)
    }
}

function getSupplies(){
    if(frameCount%400 === 0){
        fotw = createSprite(25,25,Math.round(random(100,1400)),Math.round(random(50,677)));
        fotw.shapeColor = "orange";
        fotw.lifeTime(7);
        if(mousePressedOver(fotw)){
            foodStock = foodStock+1;
        }
    }
    if(frameCount%900 === 0){
        wotw = createSp(10,10,Math.round(random(100,1400)),Math.round(random(50,677)));
        wotw.shapeColor = "blue";
        wotw.lifeTime(5);
        if(mousePressedOver(wotw)){
            waterStock = waterStock+1;
        }
    }
}
