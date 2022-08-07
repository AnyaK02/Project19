var planeImg, plane;
var birdImg, bird, birdsGroup;
var skyImg, sky;
var invisibleBlockGroup, invisibleblock;
var gameState = "play";
var flyImg, fly, fliesGroup;

function preload(){
  planeImg = loadImage("airplane.png");
  birdImg = loadImage("bird.png");
  skyImg = loadImage("sky.png");
  flyImg = loadImage("fly.png");
  birdsGroup=new Group();
  invisibleBlockGroup = new Group();
  fliesGroup = new Group();
  
}

function setup() {
  createCanvas(600, 600);
  sky = createSprite(300,300);
  sky.addImage("sky",skyImg);
  sky.velocityY = 1;

  plane = createSprite(200,200,50,50)
  plane.addImage("plane", planeImg)
  plane.scale = 0.2
  
}

function draw() {
  background (200);
  if(sky.y > 200){
    sky.y = 300
  }
  
    if(gameState === "play"){

    
    spawnBirds()
  
    if(keyDown(LEFT_ARROW)){
      plane.x = plane.x -2
    }

    if(keyDown(RIGHT_ARROW)){
      plane.x = plane.x +2
    }

    if(keyDown("space")){
      plane.velocityY = -5
    }

    plane.velocityY = plane.velocityY+0.5

    if(birdsGroup.isTouching(plane)){
      plane.velocityY = 0
    }

   
  }

    if(invisibleBlockGroup.isTouching(plane) || plane.y>600  ){
      plane.destroy()
      birdsGroup.destroyEach()
      fliesGroup.destroyEach()
     
      gameState = "end"
    }
    drawSprites()

   if (gameState === "end"){
    stroke("pink")
    fill ("pink")
    textSize(30)
    text ("GameOver!", 230,250)
  }
}





function spawnBirds(){
if(frameCount%240 === 0 ){
  bird=createSprite(200,-50)
  bird.scale = 0.1
  bird.addImage("bird", birdImg)
  bird.x= Math.round(random(120,400))
  bird.velocityY = 1
  bird.lifetime = 800
  birdsGroup.add(bird)

  fly = createSprite(200,-50)
  fly.scale = 0.1
  fly.addImage("fly", flyImg)
  fly.x= Math.round(random(120,400))
  fly.velocityY = 1
  fly.lifetime = 800
  fliesGroup.add(fly)


  

  plane.depth = bird.depth
  plane.depth = plane.depth+1

  invisibleblock = createSprite(200,15)
  invisibleblock.width = bird.width
  invisibleblock.height = 2
  invisibleblock.x = bird.x
  invisibleblock.velocityY = 1
  invisibleBlockGroup.add(invisibleblock)
}

}