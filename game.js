var canvas = document.getElementById("game");
var cv = canvas.getContext("2d");

const ground = new Image();
ground.src = "https://sun9-44.userapi.com/s/v1/ig2/lxDf732UCGGl1jOM_K3yO-G2tZ1h__Re8lGv3sbjAPC9aVPJYwgkkWHKowzcCXebSq8HDi7Z3Ew53y6wc1q4dd_o.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1024x1024&from=bu&cs=1024x1024";
const food = new Image();
food.src = "https://itproger.com/img/news/x1562688805.png.pagespeed.ic.J5t3wvrJ8E.png";
food.id = "food";
ground.id = "ground";

var up = document.getElementById("up");
var down = document.getElementById("down");
var right = document.getElementById("right");
var left = document.getElementById("left");

var dir = "right";

up.addEventListener('click', (event) => {
    if(dir != "down"){
        dir = "up";
    }
});

down.addEventListener('click', (event) => {
    if(dir != "up"){
        dir = "down";
    }
});

right.addEventListener('click', (event) => {
    if(dir != "left"){
        dir = "right";
    }
});

left.addEventListener('click', (event) => {
    if(dir != "right"){
        dir = "left";
    }
});

var box = 17;
var score = 0;

var foods = {
    x: Math.floor((Math.random()*16+3))*box,
    y: Math.floor((Math.random()*16+3))*box
};

var snake = [];
snake[0] = {
    x: 8*box,
    y: 8*box
};

function drawIm(){
    cv.drawImage(ground, 0, 0, 350, 350);
    cv.drawImage(food, foods.x, foods.y, box, box);
    
    for(let i = 0; i<snake.length; i++){
        cv.fillStyle = i == 0 ? "green": "blue";
        cv.fillRect(snake[i].x, snake[i].y, box, box);
    }
    
    cv.fillStyle = "blue";
    cv.font = "17px Arial";
    cv.fillText(score, box*3.2, box*0.9);
    
    var SnakeX = snake[0].x;
    var SnakeY = snake[0].y;
    
    if(SnakeX < foods.x + box && SnakeX + box > foods.x && SnakeY < foods.y + box && SnakeY + box > foods.y){
        score++;
        foods = {
            x: Math.floor((Math.random()*16+1))*box,
            y: Math.floor((Math.random()*16+1))*box
        };
    }else{
        snake.pop();
    }
    
    function eat(head, arr){
        for(let i = 1; i<arr.length; i++){
            if(head.x == arr[i].x && head.y == arr[i].y){
                alert("Game Over");
                clearInterval(game);
                return;
            }
        }
    }
    
    if(SnakeX < box*1.2 || SnakeX > box*18 || SnakeY < box || SnakeY > box*18){
        alert("Game Over");
        clearInterval(game);
        return;
    }
    
    if(dir == "up") {
        SnakeY -= 8;}
    if(dir == "down") {
        SnakeY += 8;}
    if(dir == "left") {SnakeX -= 8;}
    if(dir == "right") {SnakeX += 8;}
    
    var Head = {
        x: SnakeX,
        y: SnakeY
    };
    
    snake.unshift(Head);
    
    eat(Head, snake);
}

var res = document.getElementById("res");
res.addEventListener('click', (event) => {
    location.reload();
})

let game = setInterval(drawIm, 100);
