var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var survival = 0;
var gamestate = "play";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  

  console.log(ground.x)
}


function draw() {
  background(255);
  monkey.collide(ground)

  
  if (gamestate == "play"){
    if (ground.x < 200) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -8;
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  if (frameCount % 60 == 0) {
    spawnFruits();
  }
  
  spawnObstacles();

  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
  }

  stroke("white");
  textSize(20);
  fill("black");
  text("Score : " + score, 500, 50);
    
    if (obstacleGroup.isTouching(monkey)) {
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
      monkey.velocityX = 0;
      textSize(100);
      fill("black");
      text("Game Over" , 300 , 200);
      
   }
  }
  
   
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("survival Time: " + survivalTime, 100, 50);

  
  drawSprites();
}

function spawnFruits() {
  banana = createSprite(500, 120, 20, 20);
  banana.addImage(bananaImage);
  banana.velocityX = -7;
  banana.scale = 0.1;
  banana.lifetime = 150;
  bananaGroup.add(banana);
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 330, 10, 40);
    obstacle.velocityX = -(6 + score / 100);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}