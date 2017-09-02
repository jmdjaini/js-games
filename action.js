var scores=0;
var lives=6;

var canvas=document.getElementById("mycanvas");
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var ctx=canvas.getContext("2d");
var dx=2;
var dy=2;
var x=canvas.width/2;
var y=canvas.height-30;
var ballRadius=10;
var pheight=10;
var pwidth=120;
var px=(canvas.width-pwidth)/2;
var rightPressed=false;
var leftPressed=false;
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1 };
    }
}
function drawscoress () {
 ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("scores: "+scores, 8, 20);
}

function drawLives () {
  // body...
  ctx.font = "16px Arial";
     ctx.fillStyle = "#0095DD";
     ctx.fillText("Lives: "+lives, canvas.width-100, 20);
}

document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("keydown",keyDownHandler,false);

function keyUpHandler(e)
 {
  if(e.keyCode==39)
  {
  rightPressed=false;
  }
  else if(e.keyCode==37)
  {
    leftPressed=false;
  }

  // body...
};

function keyDownHandler(e)
 {
  if(e.keyCode==39)
  {
  rightPressed=true;
  }
  else if(e.keyCode==37)
  {
    leftPressed=true;
  }

  // body...
};

function drawball () {


  ctx.beginPath();
  ctx.arc(x,y,10,0,Math.PI*2);
  ctx.fillStyle="green";

  ctx.fill();
  ctx.closePath();
}
function drawPaddle () {
  ctx.beginPath();
  ctx.rect(px,canvas.height-pheight,pwidth,pheight);
  ctx.fillStyle="#0095DD";
  ctx.fill();
  ctx.closePath();
  // body...
}


function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
          if (bricks[c][r].status==1) {


            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
}


function collisionDetection () {
  for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
          var b=bricks[c][r];


if(b.status==1){
  if(x>b.x && x<b.x+brickWidth &&y>b.y && y<b.y+brickHeight)
  {
    dy=-dy;
    b.status=0;
    scores++;
    if(scores==(brickColumnCount*brickRowCount))
    {
      alert("you win !!");
      document.location.reload();
    }
  }
}
}
}}
function draw()
{
ctx.clearRect(0,0,canvas.width,canvas.height);
drawball();
drawPaddle();
collisionDetection();
drawBricks();
drawscoress();
drawLives();
if ( x+dx< ballRadius|| x+dx >canvas.width-ballRadius) {
  dx=-dx;
}
if ( y+dy< ballRadius) {
  dy=-dy;
}
else if(y+dy>canvas.height-ballRadius){
if(x>px  && x< px+pwidth)
{
    dy=-dy;
}

  else {
    lives--;
    if(!lives) {
        alert("GAME OVER");
        document.location.reload();
    }
    else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width-paddleWidth)/2;
    }
  }

}

if (rightPressed && px<canvas.width-pwidth) {
  px+=7;

}
else if(leftPressed && px>0)
{
  px-=7;
}

x+=dx;
y+=dy;

}
setInterval(draw,10);
