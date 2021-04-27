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
var randX,randY;
var foodGroup;
var waterGroup;
var restartButton;


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

    ahbG = new Group();
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
    restartButton = createSprite(768,361,50,50);
    rSt = createSprite(30,480,25,25);

    lG = new Group();
    foodGroup = new Group();
    waterGroup = new Group();
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
        restartButton.visible = false
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
        fill("white");
        text("Score : "+score,1300,100);
        restartButton.visible = false
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

        if(mousePressedOver(waterGroup)){
            waterStock = waterStock+1;
            waterGroup.destroyEach();
        }
        if(mousePressedOver(foodGroup)){
            foodStock = foodStock+1;
            foodGroup.destroyEach();
        }

        getSupplies();
        spawnEnemy();
    }



    else if(gameState === 2){
        rc.visible = false
        restartButton.visible = true;
        lG.setVelocityXEach(0);
        foodGroup.destroyEach();
        waterGroup.destroyEach();
        if(mousePressedOver(restartButton)){
            gameState = 0;
            score = 0;
        }
        dT();
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
    randX = Math.round(random(1,3));
    randY = Math.round(random(1,3))
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
    else if(mousePressedOver(startButton) && foodStock<=1 && waterStock === 0){
        text("Sorry but your food and water stock is very low, too bad you're gonna have to restart the page",300,500)
    }
}

function getSupplies(){
    if(score%400 === 0){
        fotw = createSprite(Math.round(random(100,1400)),Math.round(random(50,677)),20,20);
        fotw.shapeColor = "orange";
        fotw.lifetime = 75;
        if(randX === 1){
            fotw.velocityX = -20;
        }
        else if(randX === 2){
            fotw.veloctyX = 20;
        }
        else if(randX === 3){
            fotw.velocityX = 0;
        }
        if(randY === 1){
            fotw.velocityY = -20;
        }
        else if(randY === 2){
            fotw.velocityY = 20;
        }
        else if(randY === 3){
            fotw.velocityY = 0;
        }
        foodGroup.add(fotw)
    }
    if(score%900 === 0){
        wotw = createSprite(Math.round(random(100,1400)),Math.round(random(50,677)),10,10);
        wotw.shapeColor = "blue";
        wotw.lifetime = 100;
        if(randX === 1){
            wotw.velocityX = -20;
        }
        else if(randX === 2){
            wotw.veloctyX = 20;
        }
        else if(randX === 3){
            wotw.velocityX = 0;
        }
        if(randY === 1){
            wotw.velocityY = -20;
        }
        else if(randY === 2){
            wotw.velocityY = 20;
        }
        else if(randY === 3){
            wotw.velocityY = 0;
        }
        waterGroup.add(wotw)
    }
}

function dT(){
    rDT = Math.random(round(1,4));
    textSize(15);
    if(rDT === 1){
        text("well you could have done much better",740,350);
    }
    if(rDT === 2){
        text("Nice start, you're doing better",745,350);
    }
    if(rDT === 3){
        text("Try to not make that misate again",739,350);
    }
    if(rDT === 4){
        text("Predict your and the lazer's movements",740,350)
    }
}
