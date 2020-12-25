var PLAY = 1;
var END = 0;
var gameState = PLAY;
var food, foodImage, foodGroup;
var obstacle, obstacleImage, obstacleGroup;
var monkey, monkeyAnimation;
var ground, invisibleGround;
var survivaltime = 0;

function preload() {
  foodImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyAnimation = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
}

function setup() {
  ground = createSprite(400, 370, 900, 60);
  monkey = createSprite(50, 335, 0, 0);
  monkey.addAnimation("running", monkeyAnimation);
  monkey.scale = 0.15;
  invisibleGround = createSprite(200, 385, 400, 10);
  invisibleGround.visible = false;
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
}

function draw() {
  background("skyblue");
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime = survivaltime + Math.round(getFrameRate() / 60);
  text("Survival Time: " + survivaltime, 130, 40);
  if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -8;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
    }
    if (monkey.isTouching(obstaclesGroup)) {
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  }
  

  if (monkey.isTouching(obstaclesGroup)) {
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  }
  spawnBananas();
  spawnObstacles();
  monkey.collide(invisibleGround);

  drawSprites();
}

function spawnBananas() {
  if (World.frameCount % 80 === 0) {
    food = createSprite(460, 40, 0, 0);
    food.addImage("banana", foodImage);
    food.scale = 0.15;
    food.velocityX = -7;
    food.lifetime = 70;
    food.y = (Math.round(random(10, 150)));
    foodGroup.add(food);

  }
}

function spawnObstacles() {
  if (World.frameCount % 200 === 0) {
    obstacle = createSprite(460, 350, 0, 0);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7;
    obstacle.lifetime = 70;
    obstaclesGroup.add(obstacle);

  }
}