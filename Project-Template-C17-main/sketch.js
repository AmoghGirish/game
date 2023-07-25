var galaxyImg, galaxy;
var alienImg, alien,aliensGroup;

var starfighter,starfighterImg;
var bullet,bulletImg,bulletsgroup;
var gameState = "play"

function preload(){
  galaxyImg = loadImage("galaxy.png");
 alienImg = loadImage("alien.png");
 starfighterImg = loadImage("starfighter.png");
   bulletImg = loadImage("bullet.png")
}

function setup(){
  createCanvas(600,600);
 
  galaxy = createSprite(300,300);
  galaxy.scale =3;
  galaxy.addImage("galaxy",galaxyImg);
  galaxy.velocityY = 1;
  
 aliensGroup = new Group();
 
  
  starfighter = createSprite(200,200,50,50);
  starfighter.scale = 0.03;
  starfighter.addImage("starfighter", starfighterImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
     starfighter.x =starfighter.x - 3;
    }
    
    if(keyDown("right_arrow")){
     starfighter.x = starfighter.x + 3;
    }
    
    if(keyDown("space")){
      starfighter.velocityY = -10;
    }
    if(keyDown("up_arrow")){
      spawnbullet()
    }
    if(keyDown("down_arrow")){
      starfighter.velocityY = 10;
    }
    
 
    
    if(galaxy.y > 400){
      galaxy.y = 300
    }
    spawnaliens();

    
    //climbersGroup.collide(ghost);
    if(aliensGroup.isTouching(starfighter)){
      starfighter.velocityY = 0;
    }
    if(aliensGroup.isTouching(starfighter) || starfighter.y > 600){
      starfighter.destroy();
      gameState = "end"
    }
    if(bulletsgroup.isTouching(alien)){
      alien.destroy();
     bullet.destroy();
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnaliens() {
  
  if (frameCount % 240 === 0) {
    var alien = createSprite(200, -50);
    
    
    
    
    alien.x = Math.round(random(120,400));
   ;
    
    alien.addImage(alienImg);
    
    alien.velocityY = 1;
    alien.scale = 0.3
    galaxy.depth = alien.depth;
    alien.depth += 1
    starfighter.depth = alien.depth;
    starfighter.depth +=1;
   
   
    alien.lifetime = 800;
    

    
 
    aliensGroup.add(alien);
    
    
  }
}

function spawnbullet(){

  var bullet = createSprite(starfighter.x, starfighter.y);

  bullet.velocityY = -5;
  bullet.scale = 0.003
  galaxy.depth = bullet.depth;
  bullet.depth += 1
  starfighter.depth = bullet.depth;
  starfighter.depth +=1;
 
 
  bullet.lifetime = 800;
  

  

  bulletsgroup.add(bullet);
  

}