var player
var ground
var coinGroup
var logGroup
var score =0
var playerImage,logImage,coinAnimation
var backgroundImage
var lives = 3
var startPoint
var gameOver,gameOverImg
var gameState="play"
var startPointImg 
function preload(){
  playerImage=loadImage("player.png")
  logImage=loadImage("log.png")
  coinAnimation=loadAnimation("coin.png")
  backgroundImage=loadImage("forest.jpg")
  gameOverImg=loadImage("game_over_.png")
  startPointImg=loadImage("grounded.png")
}
function setup() {
  createCanvas(displayWidth-100,displayHeight-200);
   player = new Player(displayWidth/4-300,displayHeight/4-50)
ground= createSprite(displayWidth/2,displayHeight-210,displayWidth,10)
coinGroup=createGroup()
logGroup=createGroup()
startPoint=createSprite(displayWidth/4-300,displayHeight/4,100,10)
startPoint.addImage("img",startPointImg)
startPoint.scale=0.04
player.body.debug=true
}

function draw() {
  background(backgroundImage)  
  textSize(30)
  stroke("red")
  fill("blue")
  strokeWeight(4)
  text(" Score : "+score,displayWidth/2+480,100)
  text(" Lives : "+lives,displayWidth/2+480,150)
  if (gameState==="play"){
  
  player.body.collide(startPoint)
  if (keyDown("space")){
    player.body.velocityY=-5
    
  }
  if(keyDown(RIGHT_ARROW)){
    player.body.x=player.body.x+5
  }
  if(keyDown(LEFT_ARROW)){
    player.body.x=player.body.x-5
  }

  player.body.velocityY=player.body.velocityY+0.2
  spawnLogs()
  spawnCoins()
  player.body.collide(logGroup)
  for (var i=0;i<coinGroup.length;i++){
    console.log("message")
    if (coinGroup.get(i).isTouching(player.body)){
      coinGroup.get(i).destroy()
      score= score+1
    }
  }
  if (lives===0){gameState="end"}
  
  var edges= createEdgeSprites()
  if (player.body.isTouching(edges)){
   lives=lives-1
  player.body.x=100;
  player.body.y=100;
  }
}else if( gameState==="end"){
  coinGroup.setVelocityEach(0)
  logGroup.setVelocityEach(0)
  coinGroup.setLifetimeEach(-1)
  logGroup.setLifetimeEach(-1)

gameOver=createSprite (displayWidth/2,displayHeight/2,100,100)
gameOver.addImage(gameOverImg)
gameOver.scale=0.2
}
  drawSprites();
}
function spawnLogs(){
  if (World.frameCount % 70 === 0) {
    var logs = new Log (0,displayHeight/2,40,10);
    logs.body.x = random(0,displayWidth);
   // cloud.setAnimation("");
    //cloud.scale = 0.8;
   // logs.velocityY = -1;
    
     //assign lifetime to the variable
     logs.body.lifetime = 134;
    logs.body.setCollider("rectangle",0,0,250,50)
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    
    //add each cloud to the group
    logGroup.add(logs.body);
  }
}
function spawnCoins(){
  if (World.frameCount % 50 === 0) {
    var coin = new Coin (0,displayHeight/2,10,10);
    coin.body.x = random(0,displayWidth);
   // cloud.setAnimation("");
    //cloud.scale = 0.8;
   // logs.velocityY = -1;
    
     //assign lifetime to the variable
     coin.body.lifetime = 120;
     coin.body.setCollider("circle",0,0,50)
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    
    //add each cloud to the group
    coinGroup.add(coin.body);
  }
}

