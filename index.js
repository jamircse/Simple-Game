//'use strict'
var container = document.querySelector('.container');
var canvas = document.querySelector('canvas');
var btn_start = document.querySelector('.btn_start');
var RedGamepiece, Obstacle=[],mySound,myscore,mybg;

btn_start.addEventListener('click',()=>{
    if ( btn_start.textContent.trim() ==='Start') {
        startGame();
        mybg.play();
        btn_start.textContent="Restart";
    }else{
        Obstacle=[];
        GameArea.start();
        mybg.play();
    }

    
   

})

function startGame() {
    
    RedGamepiece = new component(30, 30, "red", 100, 101);
    mySound = new sound("failure.mp3");
    mybg = new sound("background.mp3");
    myscore = new component("30px", "Consolas", "black", 200, 40, "text");
    // Obstacle = new component(10, 100, "green", 300, 0);
    GameArea.start();
}

var GameArea = {
    canvas:canvas,
    start: function () {
//        this.canvas.width = 480;
        this.canvas.width = canvas.width;
//        this.canvas.height = 270;
        this.canvas.height = canvas.height;
        this.canvas.setAttribute("class","gamearea");
        this.context = this.canvas.getContext("2d");
        this.frameNo=0;
        container.insertBefore(this.canvas, container.childNodes[0]);
        this.interval = setInterval(UpdateGameArea, 20);
        
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval)
    }

}


function component(width, height, color, x, y,type) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.type = type;
    this.update = function () {
            this.ctx = GameArea.context;
            if (this.type == "text") {
               this. ctx.font = this.width + " " + this.height;
                this.ctx.fillStyle = color;
                this.ctx.fillText(this.text, this.x, this.y);
            } else {
                this.ctx.fillStyle = color;
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        },
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        },

        this.crashWith = function (otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) ||
                (mytop > otherbottom) ||
                (myright < otherleft) ||
                (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }
}

function everyInterval(n){
  if((GameArea.frameNo/n)%1==0){return true}
  return false;
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  } 

function UpdateGameArea() {
    var x,y;
    var height, gap, minHeight, maxHeight, minGap, maxGap;
        
//       Obstacle.newPos();
//        Obstacle.update();
    for (let i = 0; i < Obstacle.length; i++) {
        if (RedGamepiece.crashWith(Obstacle[i])) {
            mybg.stop();
            mySound.play();
            GameArea.stop();
        }
        
    }
       

        GameArea.clear();
        GameArea.frameNo +=1;
        if(GameArea.frameNo==1 || everyInterval(150)){
            x=GameArea.canvas.width;
            minHeight = 20;
            maxHeight = 200;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

            Obstacle.push(new component(10, height, "green", x, 0));
            Obstacle.push(new component(10, x - height - gap, "green", x, height + gap));
        }

        for (i = 0; i < Obstacle.length; i++) {
            Obstacle[i].x -=1;
            Obstacle[i].update();
        }
        myscore.text="SCORE: " + GameArea.frameNo;
        myscore.update();
       

        RedGamepiece.newPos();
        RedGamepiece.update();
        
    

}

window.addEventListener('keyup',arrowMove);

function arrowMove(e){
    e.preventDefault();
    switch (e.key) {
        case 'ArrowLeft':
            RedGamepiece.x -=10;
            if(RedGamepiece.x<0){
                RedGamepiece.x=0;
            }
            break;
        case 'ArrowRight':
          RedGamepiece.x +=10;
         if(RedGamepiece.x>480){
                RedGamepiece.x=480;
            }          
            break;
        case 'ArrowUp':
           RedGamepiece.y -=10;
            if(RedGamepiece.y<0){
                RedGamepiece.y=0;
            }
            break;
        case 'ArrowDown':
           RedGamepiece.y +=10;
            if(RedGamepiece.y>270){
                RedGamepiece.y=270;
            }
            break;
    }
}



