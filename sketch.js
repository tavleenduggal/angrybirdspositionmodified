const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var sling1,sling2;

var gameState = "onSling";
var bg = "sprites/bg.png";
var score = 0;

function preload() {
    //getBackgroundImg();
    backgroundImg = loadImage("sprites/bg.png");
    sling1=loadImage("sprites/sling1.png");
    sling2=loadImage("sprites/sling2.png");
   
}

function setup(){
    var canvas = createCanvas(displayWidth-100,displayHeight-120);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(displayWidth/2,displayHeight-130,displayWidth,40);
    platform = new Ground(140, displayHeight-235, 290, 440);

    box1 = new Box(displayWidth-450,displayHeight-200,80,80);
    box2 = new Box(displayWidth-270,displayHeight-200,80,80);
    box3 = new Box(displayWidth-450,displayHeight-280,80,80);
    box4 = new Box(displayWidth-270,displayHeight-280,80,80);
    box5 = new Box(displayWidth-360,displayHeight-350,80,80);
    

    pig1 = new Pig(displayWidth-360, displayHeight-200);
    pig3 = new Pig(displayWidth-360, displayHeight-280);

    log1 = new Log(displayWidth-360,displayHeight-250,260, PI/2);
    log3 =  new Log(displayWidth-360,displayHeight-310,260, PI/2);
    log4 = new Log(displayWidth-420,displayHeight-385,150, PI/7);
    log5 = new Log(displayWidth-315,displayHeight-385,150, -PI/7);

    bird = new Bird(platform.body.position.x+120,platform.body.position.y-350);

    slingshot = new SlingShot(bird.body,{x:platform.body.position.x+120, y:platform.body.position.y-350});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35);
        fill("white");
        textSize(20);
        text( score, displayWidth-200, 30);
    
    Engine.update(engine);
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    

    log1.display();
    log3.display();
    log4.display();
    log5.display();



    
    pig1.display();
    pig1.score();
    pig3.display();
    pig3.score();
    
    slingshot.display();
   
    image(sling1,platform.body.position.x+120,platform.body.position.y-350,30,130);
    bird.display();

    image(sling2,platform.body.position.x+100,platform.body.position.y-350,30,80);
        
    
    ground.display();

    platform.display();

    }

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 1){
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200, y:50});
       slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=6 && hour<=19){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}