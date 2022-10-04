var bomb;
var cash;
var score;
var red;
var redA;
var state;
var bombs;
var bombA;
var cashA;
var cashGroup;
var cloud;
var cloudG;
var cloudA;

function preload(){
    redA=loadAnimation('Red1.png','Red2.png');
    bombA=loadImage('bomb.png');
    cashA=loadImage('Cash.png');
    cloudA=loadImage('Cloud.png');
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    background('cyan');
    red=createSprite(windowWidth/2,windowHeight/2,20,20);
    red.addAnimation("It's Red!",redA);
    red.scale=0.4;
    red.debug=0;
    red.setCollider('rectangle',0,0,330,290);
    bombs=new Group()
    cashGroup=new Group()
    cloudG=new Group()
    state=1;
    score=0;
    score2=0;
}

function draw() {
    background('cyan');
    drawSprites();

    stroke('green')
    strokeWeight(5)
    text('score: '+Math.round(score),50,50,50,50)
    text('cash: '+score2,width-50,50,50,50)

    if(state==1){
        controls()
        score=frameCount/2

        if(frameCount%50==0){
            boom();
        }

        if(frameCount%100==0){
            money();
        }

        if(frameCount%200==0){
            clouds()
        }

        if(bombs.isTouching(red)){
            state=0;
        }

        if(cashGroup.isTouching(red)){
            score2=score2+1;
            cashGroup.destroyEach();
        }

    }else{
        cashGroup.destroyEach();
        bombs.destroyEach();
        red.destroy();

        stroke('red')
        text('GAME OVER!',width/2,height/2,30,30);    
    }
}

function boom(){
    bomb=createSprite(random(0.01*width,width,),0,100,100);
    bomb.addImage(bombA);
    bomb.velocityY=10;
    bomb.scale=0.2
    bombs.add(bomb);
    bomb.debug=0
    bomb.lifetime=height
    red.depth=bomb.depth+1
}

function money(){
    cash=createSprite(random(0.01*width,width,),0,100,100);
    cash.addImage(cashA);
    cash.velocityY=8;
    cash.scale=0.2
    cashGroup.add(cash);
    cash.debug=0
    cash.lifetime=height
    red.depth=cash.depth+1
}

function clouds(){
    cloud=createSprite(random(0.01*width,width,),0,100,100);
    cloud.addImage(cloudA);
    cloud.velocityY=2;
    cloud.scale=0.2
    cloudG.add(cloud);
    cloud.debug=0
    cloud.lifetime=height
    red.depth=cloud.depth+1
}

function controls(){
    if(keyDown('up')){
        red.y=red.y-7;
    }

    if(keyDown('down')){
        red.y=red.y+7;
    }

    if(keyDown('right')){
        red.x=red.x+7;
    }

    if(keyDown('left')){
        red.x=red.x-7;
    }
}