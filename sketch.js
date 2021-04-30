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
var score = 0;
var randX,randY;
var foodGroup;
var waterGroup;
var restartButton;
var emI;
var dRG;
var coins = 50,coinImage,coin;
var gems = 0,gemImage;
var Shop,ShopImage,canSeeShop;
var lSVal = 0;
var fSVal = 0;
var wSVal = 0;
var dailyQuest;
var Quest,QuestButton,questImage,canSeeQuestButton;
var questBox1,questBox2,questBox3,questBox4,dailyQuestBox1,dailyQuestBox2,dailyQuestBox3,dailyQuestBox4;
var acceptQuest,denyQuest,acceptQuest2,denyQuest2;
var goBack,goBackImage;
var halp,helpImage,canSeeHelp;
var halpval = 0;
var box1,box2,box3,box4,box5,box6,box7,box8,box9,box10,box11,box12;
var CoinBuyStuff1,CoinBuyStuff2,CoinBuyStuff3;
var buy1,buy2,buy3

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
    emI = loadImage("images/eM.png");
    coinImage = loadImage("images/coin.png");
    goBackImage = loadImage("images/goBak.png");
    helpImage = loadImage("images/HelpButtonImage.png");
    ShopImage = loadImage("images/MarketPlaceImage.png");
    questImage = loadImage("images/QuestButtonImage.png")
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
    ground.visible = true

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
    rSt = createSprite(1525,10,25,25);

    canSeeHelp = createSprite(250,25,50,50);
    canSeeHelp.shapeColor = "white";
    halp = createSprite(250,25,50,50);
    halp.addImage(helpImage);
    halp.scale = 0.1;
    canSeeShop = createSprite(25,25,50,50);
    canSeeShop.shapeColor = "white";
    Shop = createSprite(25,25,50,50);
    Shop.addImage(ShopImage);
    Shop.scale = 0.2;
    coin = createSprite(1450,35,5,5);
    coin.addImage(coinImage);
    coin.scale = 0.1;

    box1 = createSprite(100,150,10,126);
    box1.shapeColor = "white";
    box2 = createSprite(250,92,300,10);
    box2.shapeColor = "white";
    box3 = createSprite(250,208,300,10);
    box3.shapeColor = "white";
    box4 = createSprite(400,150,10,126);
    box4.shapeColor = "white";
    buy1 = createSprite(367,150,50,100);
    buy1.shapeColor = "green";
    CoinBuyStuff1 = createSprite(250,115,10,10);
    CoinBuyStuff1.addImage(coinImage);
    CoinBuyStuff1.scale = 0.1;

    box5 = createSprite(600,150,10,126);
    box5.shapeColor = "white";
    box6 = createSprite(750,92,300,10);
    box6.shapeColor = "white";
    box7 = createSprite(750,208,300,10);
    box7.shapeColor = "white";
    box8 = createSprite(900,150,10,126);
    box8.shapeColor = "white";
    buy2 = createSprite(867,150,50,100);
    buy2.shapeColor = "green";
    CoinBuyStuff2 = createSprite(750,115,10,10);
    CoinBuyStuff2.addImage(coinImage);
    CoinBuyStuff2.scale = 0.1;

    box9 = createSprite(1100,150,10,126);
    box9.shapeColor = "white";
    box10 = createSprite(1250,92,300,10);
    box10.shapeColor = "white";
    box11 = createSprite(1250,208,300,10);
    box11.shapeColor = "white";
    box12 = createSprite(1400,150,10,126);
    box12.shapeColor = "white";
    buy3 = createSprite(1367,150,50,100);
    buy3.shapeColor = "green";
    CoinBuyStuff3 = createSprite(1250,115,10,10);
    CoinBuyStuff3.addImage(coinImage);
    CoinBuyStuff3.scale = 0.1;

    goBack = createSprite(30,692,20,20);
    goBack.addImage(goBackImage);
    goBack.scale = 0.15

    canSeeQuestButton = createSprite(25,100,50,50);
    canSeeQuestButton.shapeColor = "white";
    QuestButton = createSprite(25,100,50,50);
    QuestButton.shapeColor = "white";
    QuestButton.addImage(questImage);
    QuestButton.scale = 0.1
    
    questBox1 = createSprite(150,250,10,300);
    questBox1.shapeColor = "white";
    questBox2 = createSprite(445,100,600,10);
    questBox2.shapeColor = "white";
    questBox3 = createSprite(740,245,10,300);
    questBox3.shapeColor = "white";
    questBox4 = createSprite(445,400,600,10);
    questBox4.shapeColor = "white";

    dailyQuestBox1 = createSprite(800,520,10,300);
    dailyQuestBox1.shapeColor = "white";
    dailyQuestBox2 = createSprite(1095,375,600,10);
    dailyQuestBox2.shapeColor = "white";
    dailyQuestBox3 = createSprite(1390,520,10,300);
    dailyQuestBox3.shapeColor = "white";
    dailyQuestBox4 = createSprite(1095,675,600,10);
    dailyQuestBox4.shapeColor = "white";
    
    acceptQuest = createSprite(150,200000,10,200);
    acceptQuest.shapeColor = "green";
    acceptQuest2 = createSprite(150,200000,10,200);
    acceptQuest2.shapeColor = "green";

    denyQuest = createSprite(150,200000,10,200);
    denyQuest.shapeColor = "red";
    denyQuest2 = createSprite(150,20000,10,200);
    denyQuest2.shapeColor = "red";




    Shop.visible = false
    lG = new Group();
    foodGroup = new Group();
    waterGroup = new Group();
    dRG = new Group();
}

function draw(){
    if(gameState === 0){
        background(bgG0);
        ground.visible = true
        canSeeShop.visible = true
        coin.visible = true
        box1.visible = false
        box2.visible = false
        box3.visible = false
        box4.visible = false
        box5.visible = false
        box6.visible = false
        box7.visible = false
        box8.visible = false
        box9.visible = false
        box10.visible = false
        box11.visible = false
        box12.visible = false
        canSeeHelp.visible = true
        QuestButton.visible = true
        canSeeQuestButton.visible = true

        questBox1.visible = false
        questBox2.visible = false
        questBox3.visible = false
        questBox4.visible = false
        dailyQuestBox1.visible = false
        dailyQuestBox2.visible = false
        dailyQuestBox3.visible = false
        dailyQuestBox4.visible = false
        acceptQuest.visible = false
        acceptQuest2.visible = false
        denyQuest.visible = false
        denyQuest2.visible = false

        rc.visible = true

        buy1.visible = false
        buy2.visible = false
        buy3.visible = false

        CoinBuyStuff1.visible = false
        CoinBuyStuff2.visible = false
        CoinBuyStuff3.visible = false

        goBack.visible = false

        astpos.x = 300
        astpos.y = 575
        ahB.x = 365;
        ahB.y = 483;
        ahB2.x = 395;
        ahB2.x = 545;
        ahB3.x = 368;
        ahB3.y = 631;
        ahB4.x = 290;
        ahB4.y = 446;
        ahB5.x = 290;
        ahB5.y = 700;
        ahB6.x = 215;
        ahB6.y = 573;
        fill("white");
        if(foodStock<=2 && waterStock === 0){
            text("Sorry but your food and water stock is very low, too bad you're gonna have to restart the page",520,320)
        }
        if(foodStock>2 && waterStock!= 0){
            text("Click here to start playing",700,320);
        }
        ahB.collide(ground);
        rSt.visible = true
        restartButton.visible = false
        text(" "+coins,1460,40);
        if(foodStock >8 || foodStock ===8){
            fill("darkgreen");
            text("Food supply = "+foodStock,1125,500);
        }
        if(foodStock >6 && foodStock<8 || foodStock === 6){
            fill("green");
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
        if(waterStock === 5){
            fill("darkgreen");
            text("Water supply = "+waterStock,1325,500);
        }
        if(waterStock === 4){
            fill("green");
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
        
        textSize = 15;
        fill("white")
        text("<- MarketPlace",75,30);
        Shop.visible = true
        if(mousePressedOver(Shop)){
            gameState = 3;
        }
        halp.visible = true
        text("<- Help",300,30);
        if(mousePressedOver(halp) && halpval === 0){
            window.open("https://shansharma08.github.io/-SelfDesignedGame-SpaceRunner_Help/");
            halpval = halpval+1
        }
        if(mousePressedOver(QuestButton)){
            gameState = 4;
        }
        sB();
    }



    if(gameState === 1){
        background(bgG1);
        canSeeShop.visible = false
        halp.visible = false
        ground.visible = true
        coin.visible = false
        canSeeHelp.visible = false
        QuestButton.visible = false
        canSeeQuestButton.visible = false

        questBox1.visible = false
        questBox2.visible = false
        questBox3.visible = false
        questBox4.visible = false
        dailyQuestBox1.visible = false
        dailyQuestBox2.visible = false
        dailyQuestBox3.visible = false
        dailyQuestBox4.visible = false
        acceptQuest.visible = false
        acceptQuest2.visible = false
        denyQuest.visible = false
        denyQuest2.visible = false

        fill("white");
        textSize = 13;
        text("Score : "+score,1387,30);
        text("Food Remaining =",1387,60);        
        if(foodStock >8 || foodStock ===8){
            stroke("lightgreen");
            fill("darkgreen");
            text(" "+foodStock,1500,60);
        }
        if(foodStock >6 && foodStock<8 || foodStock === 6){
            stroke("lightgreen");
            fill("green");
            text(" "+foodStock,1500,60);
        }
        if(foodStock >4 && foodStock<6 || foodStock === 4){
            stroke("lightyellow");
            fill("yellow");
            text(" "+foodStock,1500,60);
        }
        if(foodStock >2 && foodStock<4 || foodStock === 2){
            stroke("lightorange")
            fill("orange");
            text(" "+foodStock,1500,60);
        }
        if(foodStock <2 || foodStock === 0){
            stroke("lightred")
            fill("red");
            text(" "+foodStock,1500,60);
        }

        noStroke(); 
        fill("white");
        text("Water Remaining =",1388,90);  

        if(waterStock === 5){
            stroke("lightgreen");
            fill("darkgreen");
            text(" "+waterStock,1500,90);
        }
        if(waterStock === 4){
            stroke("lightgreen");
            fill("green");
            text(" "+waterStock,1500,90);
        }
        if(waterStock === 3){
            stroke("lightyellow");
            fill("yellow");
            text(" "+waterStock,1500,90);
        }
        if(waterStock === 2){
            stroke("lightorange");
            fill("orange");
            text(" "+waterStock,1500,90);
        }
        if(waterStock === 1 || waterStock === 0){
            stroke("lightred");
            fill("red");
            text(" "+waterStock,1500,90);
        }

        Shop.visible = false
        restartButton.visible = false
        score = score+1;
        if(keyDown('w')){
            astpos.y = astpos.y -10;
            ahB.y = ahB.y-10;
            ahB2.y = ahB2.y-10;
            ahB3.y = ahB3.y-10;
            ahB4.y = ahB4.y-10;
            ahB5.y = ahB5.y-10;
            ahB6.y = ahB6.y-10;
        }
        if(keyDown('a')){
            astpos.x = astpos.x -10;
            ahB.x = ahB.x-10;
            ahB2.x = ahB2.x-10;
            ahB3.x = ahB3.x-10;
            ahB4.x = ahB4.x-10;
            ahB5.x = ahB5.x-10;
            ahB6.x = ahB6.x-10;
        } 
        if(keyDown('s')){
            astpos.y = astpos.y +2.5;
            ahB.y = ahB.y+2.5;
            ahB2.y = ahB2.y+2.5;
            ahB3.y = ahB3.y+2.5;
            ahB4.y = ahB4.y+2.5;
            ahB5.y = ahB5.y+2.5;
            ahB6.y = ahB6.y+2.5;
        }
        if(keyDown('d')){
            astpos.x = astpos.x+10;
            ahB.x = ahB.x+10;
            ahB2.x = ahB2.x+10;
            ahB3.x = ahB3.x+10;
            ahB4.x = ahB4.x+10;
            ahB5.x = ahB5.x+10;
            ahB6.x = ahB6.x+10;
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

        if(ahbG.isTouching(dRG)){
            gameState = 2;
        }
        
        w5.visible = false
        w4.visible = false
        w3.visible = false
        w2.visible = false
        w1.visible = false
        fm.visible = false
        fl.visible = false
        rc.visible = false
        
        for(i=0;i<waterGroup.length;i++){
            if(mousePressedOver(waterGroup[i])){
                waterStock = waterStock+1;
                waterGroup[i].destroy();
            }
        }
        for(i=0;i<foodGroup.length;i++){
            if(mousePressedOver(waterGroup[i])){
                foodStock = foodStock+1;
                foodGroup[i].destroy();
            }
        }
        
        preventOverMovement();
        getSupplies();
        youreDead();
        spawnEnemy();
    }



    if(gameState === 2){
        rc.visible = false
        canSeeShop.visible = false
        Shop.visible = false
        restartButton.visible = true;
        halp.visible = false
        canSeeHelp.visible = false
        QuestButton.visible = false
        canSeeQuestButton.visible = false
        lG.setVelocityXEach(0);
        foodGroup.destroyEach();
        waterGroup.destroyEach();
        if(mousePressedOver(restartButton)){
            gameState = 0;
            score = 0;
        }
        /*
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
        */
    }

    if(gameState === 3){
        background("black");
        restartButton.visible = false
        canSeeShop.visible = false
        startButton.visible = false
        canSeeHelp.visible = false
        QuestButton.visible = false
        canSeeQuestButton.visible = false
        rc.visible = false
        fm.visible = false
        fl.visible = false
        w5.visible = false
        w4.visible = false
        w3.visible = false
        w2.visible = false
        w1.visible = false
        Shop.visible = false
        ground.visible = false
        halp.visible = false

        questBox1.visible = false
        questBox2.visible = false
        questBox3.visible = false
        questBox4.visible = false
        dailyQuestBox1.visible = false
        dailyQuestBox2.visible = false
        dailyQuestBox3.visible = false
        dailyQuestBox4.visible = false
        acceptQuest.visible = false
        acceptQuest2.visible = false
        denyQuest.visible = false
        denyQuest2.visible = false
        
        text(" "+coins,1460,40);
        fill("yellow");
        text("Upgrades = ",450,450);
        fill("white");
        text("Lazer "+lSVal,450,500);
        text("Food "+fSVal,450,550);
        text("Water "+wSVal,450,600);

        coin.visible = true
        buyStuff();
    }

    if(gameState === 4){
        background("black");
        restartButton.visible = false
        canSeeShop.visible = false
        startButton.visible = false
        canSeeHelp.visible = false
        QuestButton.visible = false
        canSeeQuestButton.visible = false
        coin.visible = false
        rc.visible = false
        fm.visible = false
        fl.visible = false
        w5.visible = false
        w4.visible = false
        w3.visible = false
        w2.visible = false
        w1.visible = false
        Shop.visible = false
        ground.visible = false
        halp.visible = false
        goBack.visible = true

        questBox1.visible = true
        questBox2.visible = true
        questBox3.visible = true
        questBox4.visible = true
        dailyQuestBox1.visible = true
        dailyQuestBox2.visible = true
        dailyQuestBox3.visible = true
        dailyQuestBox4.visible = true
        acceptQuest.visible = true
        acceptQuest2.visible = true
        denyQuest.visible = true
        denyQuest2.visible = true

        astpos.x = 2000;
        astpos.y = 2000;

        if(mousePressedOver(goBack)){
            gameState = 0
        }

        fill("white")
        text("Daily quest every 6:30am GMT",670,50);
        text("More quests in development",678,70);
        text("<- QUEST",800,250);
        text("DAILY QUEST ->",650,500)

        text("IN DEVELOPMENT",1000,500);
        text("IN DEVELOPMENT",400,300);
    }
    
    
    if(frameCount%500 === 0 && foodStock>0){
        foodStock = foodStock-1;
    }
    if(frameCount%900 === 0 && waterStock>0){
        waterStock = waterStock-1;
    }
    if(mousePressedOver(rSt)){
        foodStock + 5;
        waterStock + 2;
        //console.log(hour());
    }
    rDT = Math.random(round(1,4));
    randX = Math.round(random(1,3));
    randY = Math.round(random(1,3))
    rand = Math.round(random(1,3));
    drawSprites();
    ast.display();
    //console.log(rand);
}

function spawnEnemy(){
    if(frameCount%100 === 0){
        Lazer = createSprite(1550,Math.round(random(10,650)),Math.round(random(50,150)),Math.round(random(50,150    )));
        stroke("red");
        Lazer.shapeColor = "darkorange";
        lG.add(Lazer);
        if(lSVal === 0){
            Lazer.velocityX = -13;
        }
        if(lSVal === 1){
            Lazer.velocityX = -12;
        }
        if(lSVal === 2){
            Lazer.velocityX = -11;
        }
        if(lSVal === 3){
            Lazer.velocityX = -10;
        }
        if(lSVal === 4){
            Lazer.velocityX = -9;
        }
        if(lSVal === 5){
            Lazer.velocityX = -8;
        }
        if(lSVal === 6){
            Lazer.velocityX = -7;
        }
        if(lSVal === 7){
            Lazer.velocityX = -6;
        }
    }
}

function sB(){
    if(foodStock >=2 && waterStock>=1){ 
        if(mousePressedOver(startButton) && gameState === 0){
            gameState = 1
        }
        if(gameState === 1 || gameState === 2){
             startButton.visible = false
        }
        if(gameState === 0){
            startButton.visible = true
        }
    }
}

function getSupplies(){
    if(score%400 === 0){
        fotw = createSprite(Math.round(random(100,1400)),Math.round(random(50,677)),50,50);
        fotw.shapeColor = "orange";
        fotw.lifetime = 75;
        foodGroup.add(fotw)
        if(randX === 1){
            if(fSVal === 0){
                fotw.velocityX = -13;
            }
            if(fSVal === 1){
                fotw.velocityX = -12;
            }
            if(fSVal === 2){
                fotw.velocityX = -11;
            }
            if(fSVal === 3){
                fotw.velocityX = -10;
            }
            if(fSVal === 4){
                fotw.velocityX = -9;
            }
            if(fSVal === 5){
                fotw.velocityX = -8;
            }
            if(fSVal === 6){
                fotw.velocityX = -7;
            }
            if(fSVal === 7){
                fotw.velocityX = -6;
            }
        }
        else if(randX === 2){
            if(fSVal === 0){
                fotw.veloctyX = 13;
            }
            if(fSVal === 1){
                fotw.veloctyX = 12;
            }
            if(fSVal === 2){
                fotw.veloctyX = 11;
            }
            if(fSVal === 3){
                fotw.veloctyX = 10;
            }
            if(fSVal === 4){
                fotw.veloctyX = 9;
            }
            if(fSVal === 5){
                fotw.veloctyX = 8;
            }
            if(fSVal === 6){
                fotw.veloctyX = 7;
            }
            if(fSVal === 7){
                fotw.veloctyX = 6;
            }
        }
        else if(randX === 3){
            fotw.velocityX = 0;
        }
        if(randY === 1){
            if(fSVal === 0){
                fotw.velocityY = -13;
            }
            if(fSVal === 1){
                fotw.velocityY = -12;
            }
            if(fSVal === 2){
                fotw.velocityY = -11;
            }
            if(fSVal === 3){
                fotw.velocityY = -10;
            }
            if(fSVal === 4){
                fotw.velocityY = -9;
            }
            if(fSVal === 5){
                fotw.velocityY = -8;
            }
            if(fSVal === 6){
                fotw.velocityY = -7;
            }
            if(fSVal === 7){
                fotw.velocityY = -6;
            }
        }
        else if(randY === 2){
            if(fotw === 0){
                fotw.velocityY = 13;
            }
            if(fotw === 1){
                fotw.velocityY = 12;
            }
            if(fotw === 2){
                fotw.velocityY = 11;
            }
            if(fotw === 3){
                fotw.velocityY = 10;
            }
            if(fotw === 4){
                fotw.velocityY = 9;
            }
            if(fotw === 5){
                fotw.velocityY = 8;
            }
            if(fotw === 6){
                fotw.velocityY = 7;
            }
            if(fotw === 7){
                fotw.velocityY = 6;
            }
        }
        else if(randY === 3){
            fotw.velocityY = 0;
        }
    }
    if(score%900 === 0){
        wotw = createSprite(Math.round(random(100,1400)),Math.round(random(50,677)),50,50);
        wotw.shapeColor = "blue";
        wotw.lifetime = 100;
        if(randX === 1){
            wotw.velocityX = -13;
        }
        else if(randX === 2){
            wotw.veloctyX = 13;
        }
        else if(randX === 3){
            wotw.velocityX = 0;
        }
        if(randY === 1){
            wotw.velocityY = -13;
        }
        else if(randY === 2){
            wotw.velocityY = 13;
        }
        else if(randY === 3){
            wotw.velocityY = 0;
        }
        waterGroup.add(wotw)
    }
}

function buyStuff(){
    box1.visible = true
    box2.visible = true
    box3.visible = true
    box4.visible = true
    box5.visible = true
    box6.visible = true
    box7.visible = true
    box8.visible = true
    box9.visible = true
    box10.visible = true
    box11.visible = true
    box12.visible = true

    buy1.visible = true
    buy2.visible = true
    buy3.visible = true

    CoinBuyStuff1.visible = true
    CoinBuyStuff2.visible = true
    CoinBuyStuff3.visible = true

    goBack.visible = true
    //Pt1
    if(mousePressedOver(buy1) && coins === 50 && lSVal<7){
        coins = coins-50; 
        lSVal = lSVal+1
    }
    if(mousePressedOver(buy1) && coins<50){
        text("Try purchasing this once you have more money",125,250);
    }
    
    coins.visible = true

    fill("red");
    text("Lazer Speed",115,120);
    fill("pink")
    text("Reduces the lazer's speed, making",115,150);
    text("the game much more easier!",115,180);
    fill("white")
    text("Price =       50 coins",200,120);

    //Pt2
    if(mousePressedOver(buy2) && coins === 100 && fSVal<7){
        coins = coins-100; 
        fSVal = fSVal+1
    }
    if(mousePressedOver(buy2) && coins<100){
        text("Try purchasing this once you have more money",625,250);
    }

    fill("orange");
    text("Food Speed",615,120);
    fill("yellow")
    text("Reduces the food's speed, collecting",615,150);
    text("food has never been easier!",615,180);
    fill("white")
    text("Price =       100 coins",700,120);

    //Pt3
    if(mousePressedOver(buy3) && coins === 100 && wSVal<7){
        coins = coins-100; 
        wSVal = wSVal+1
    }
    if(mousePressedOver(buy3) && coins<100){
        text("Try purchasing this once you have more money",1125,250);
    }

    fill("blue");
    text("Water Speed",1115,120);
    fill("lightblue")
    text("Reduces the water's speed, collecting",1115,150);
    text("water has never been easier!",1115,180);
    fill("white")
    text("Price =       100 coins",1200,120);

    //hide once back is pressed
    if(mousePressedOver(goBack) && gameState === 3){
        gameState = 0
    }
}

function youreDead(){
    if(rand === 1){
        if(score%1000 === 0){
            eM = createSprite(20,150,10,10);
            eM.addImage(emI);
            eM.scale = 0.2;
            eM.lifetime = 60;
            eM2 = createSprite(1516,150,10,10);
            eM2.addImage(emI);
            eM2.scale = 0.2;
            eM2.lifetime = 60;
            eM3 = createSprite(20,450,10,10);
            eM3.addImage(emI);
            eM3.scale = 0.2;
            eM3.lifetime = 60;
            eM4 = createSprite(1516,450,10,10);
            eM4.addImage(emI);
            eM4.scale = 0.2;
            eM4.lifetime = 60;
        }
        if(score%1050 === 0){
            dR = createSprite(768,150,1536,5);
            dR.shapeColor = "red";
            dR.lifetime = 100;
            dR2 = createSprite(768,450,1536,5);
            dR2.shapeColor = "red";
            dR2.lifetime = 100;
            dRG.add(dR);
            dRG.add(dR2);
        }
    }
    if(rand === 2){
        if(score%500 === 0){
            eM = createSprite(384,20,10,10);
            eM.addImage(emI);
            eM.scale = 0.2;
            eM.lifetime = 60;
            eM2 = createSprite(384,702,10,10);
            eM2.addImage(emI);
            eM2.scale = 0.2;
            eM2.lifetime = 60;
            eM3 = createSprite(768,20,10,10);
            eM3.addImage(emI);
            eM3.scale = 0.2;
            eM3.lifetime = 60;
            eM4 = createSprite(768,702,10,10);
            eM4.addImage(emI);
            eM4.scale = 0.2;
            eM4.lifetime = 60;
            eM5 = createSprite(1152,20,10,10);
            eM5.addImage(emI);
            eM5.scale = 0.2;
            eM5.lifetime = 60;
            eM6 = createSprite(1152,702,10,10);
            eM6.addImage(emI);
            eM6.scale = 0.2;
            eM6.lifetime = 60;
        }
        if(score%550 === 0){
            dR = createSprite(384,361,5,722);
            dR.shapeColor = "red";
            dR.lifetime = 100;
            dR2 = createSprite(768,361,5,722);
            dR2.shapeColor = "red";
            dR2.lifetime = 100;
            dR3 = createSprite(1152,361,5,722);
            dR3.shapeColor = "red";
            dR3.lifetime = 100;
            dRG.add(dR);
            dRG.add(dR2);
            dRG.add(dR3);
        }
    }
    if(rand === 3){
        if(score%1500 === 0){
            eM = createSprite(768,20,10,10);
            eM.addImage(emI);
            eM.scale = 0.2;
            eM.lifetime = 60;
            eM2 = createSprite(768,702,10,10);
            eM2.addImage(emI);
            eM2.scale = 0.2;
            eM2.lifetime = 60;
            eM3 = createSprite(20,361,10,10);
            eM3.addImage(emI);
            eM3.scale = 0.2;
            eM3.lifetime = 60;
            eM4 = createSprite(1516,361,10,10);
            eM4.addImage(emI);
            eM4.scale = 0.2;
            eM4.lifetime = 60;
        }
        if(score%1550 === 0){
            dR = createSprite(768,361,1536,5);
            dR.shapeColor = "red";
            dR.lifetime = 100;
            dR2 = createSprite(361,768,1536,5);
            dR2.shapeColor = "red";
            dR2.lifetime = 100;
            dRG.add(dR);
            dRG.add(dR2);
        }
    }
}

function preventOverMovement(){
    //prevent from going up
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
    
    //prevent from going left
    if(astpos.x<90){
        astpos.x = 90;
    }
    if(ahB.x<=150){
        ahB.x = 150;
    }
    if(ahB2.x<=180){
        ahB2.x = 180;
    }
    if(ahB3.x<=153){
        ahB3.x = 153;
    }
    if(ahB4.x<=75){
        ahB4.x = 75;
    }
    if(ahB5.x<=75){
        ahB5.x = 75;
    }
    if(ahB6.x<=0){
        ahB6.x = 0;
    }

    //prevent from going right
    if(astpos.x>1446){
        astpos.x = 1446;
    }
    if(ahB.x>=1386){
        ahB.x = 1386;
    }
    if(ahB2.x>=1356){
        ahB2.x = 1356;
    }
    if(ahB3.x>=1383){
        ahB3.x = 1383;
    }
    if(ahB4.x>=1461){
        ahB4.x = 1461;
    }
    if(ahB5.x>=1461){
        ahB5.x = 1461;
    }
    if(ahB6.x>=1536){
        ahB6.x = 1536;
    }   
}
