var monkey,monkey_image

var ground, ground_image

var banana_image, obstacle_image

var bananaGroup 

var obstacleGroup 

var invisibleGround

var score

function preload(){
  monkey_image = loadAnimation("Monkey1.png", "Monkey2.png", "Monkey3.png", "Monkey4.png", "Monkey5.png");
  
  banana_image = loadImage("banana.png")
  
  obstacle_image = loadImage("obstcale.png")
}


function setup(){
  createCanvas(400,400)
  
  score = 0
  monkey = createSprite(50, 330, 20, 20);
  monkey.addAnimation("monkey", monkey_image);
  monkey.scale = 0.5;

  ground = createSprite(200, 385, 400, 20);
  ground.velocityX = -3;

  bananaGroup = createGroup();

  obstacleGroup = createGroup();

  invisibleGround = createSprite(200,385,400,5);
  invisibleGround.visible = false;

}





function draw() {
  background(255);
  if (keyDown("space") && monkey.y >= 330) {
      monkey.velocityY = -12 ;
      //playSound("jump.mp3");
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  ground.x = ground.width/2;
  
  monkey.collide(invisibleGround);
  
  if(bananaGroup.isTouching(monkey)){
    score = score + 1
  } 

  spawnfruits();
  spawnObstacles();
  var survivalTime = 2;
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount);
  text("Survival Time: " + survivalTime, 100, 50);
  text("Score: " + score, 100, 100);
  drawSprites();
}

function spawnfruits() {
  if(frameCount % 80 === 0) {
    var fruits = createSprite(400,365,10,40);
    fruits.velocityX = -7;
    
    //generate random obstacles
    fruits.addAnimation("Banana", banana_image);

    fruits.y = Math.round(random(300,330));
    
    //assign scale and lifetime to the obstacle           
    fruits.scale = 0.5;
    fruits.lifetime = 70;
    //add each obstacle to the group
    bananaGroup.add(fruits);
  if(fruits.isTouching(monkey)){
    score = score + 1;
  } 
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacles = createSprite(400,360,10,40);
    obstacles.velocityX = -7;
    
    //generate random obstacles
    obstacles.addAnimation("Stone", obstacle_image);

    //assign scale and lifetime to the obstacle           
    obstacles.scale = 0.5;
    obstacles.lifetime = 70;
    //add each obstacle to the group
    obstacleGroup.add(obstacles);
  }
}