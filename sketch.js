//Create variables here
var dog, happyDog, dogImg, happyDogImg;
var milk, milkImg;
var foodS, foodStock;
var database;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/Milk.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.4;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  fill("white");
  stroke("Black");
  text("Food Remaining: " + foodS, 170, 100);
  textSize(13);
  text("Note: Press the Up arrow key to feed Drago Milk!", 130, 20);
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


