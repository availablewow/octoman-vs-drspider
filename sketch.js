const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3,box2,box5,box6;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
   

    box1 = new Box(600,320,70,70);
    box2 = new Box(820,320,70,70);
    box5 = new Box(700,320,70,70);
    box6 = new Box(700,320,70,70);
    pig1 = new Pig(1000,310);
  

    box3 = new Box(600,240,70,70);
    box4 = new Box(820,240,70,70);
   



    box5 = new Box(810,160,70,70);
   

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
   
    pig1.display();
    pig1.score();
   

    box3.display();
    box4.display();
 
    
    box6.display();

    box5.display();
    box5.display();
   

    bird.display();
   
    //log6.display();
    slingshot.display();
    console.log(bird.body.speed);    
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
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}