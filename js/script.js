// get access 
const gameBox = document.querySelector("#game-box");
const hiscoreBox=document.getElementById("hiscoreBox");


// game constant and variables
let inputDir = { x: 0, y: 0 };
const gameEndSound = new Audio("music tone/game-over-fall.wav");
const snakeMove = new Audio("music tone/snake move.mp3")
const playGame = new Audio("music tone/free-music-for-video-games.mp3");
const snakeEat=new Audio("music tone/snake eat.mp3");

let fSpeed = 8;
let lastFrameTime = 0;
let snakeArr = [
    { x: 12, y: 14 }
]
let food = { x: 8, y: 8 };

let score=0;

//game function
function main(cureentTime) {
    window.requestAnimationFrame(main);
    if ((cureentTime - lastFrameTime) / 1000 < 1 / fSpeed) {
        return;
    }
    lastFrameTime = cureentTime;
    playGame.play();
    gameLogic();
}
function IsCollision(snake) {
      for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snakeArr[0].x && snake[i].y===snakeArr[0].y){
             return true;
        }
      }
      if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 ||snake[0].y<=0 || snakeArr[0].y<-1){
          return true;
      } 
}


function gameLogic() {
    gameBox.innerHTML = "";
    // update the snake and food
    if (IsCollision(snakeArr)) {
        snakeMove.pause();
        playGame.pause();
        gameEndSound.play();
        inputDir = { x: 0, y: 0 };
        alert("game is over press any key for play again");
        score=0;
        document.getElementById("score").innerHTML="Score ="+score
        snakeArr = [
            { x: 12, y: 14 }
        ]
    }

    //if snake eat food , increament the score and regenrate the food
     if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        snakeEat.play();
        playbackRate=1;
        score++;
        if(score>hiscoresVal){
            hiscoresVal=score;
            localStorage.setItem("hiscores",JSON.stringify(hiscoresVal));
            hiscoreBox.innerHTML="high-score="+hiscoresVal;
        }
        document.getElementById("score").innerHTML=`Score =${score}`;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y+inputDir.y})
        let a=2,b=16;
        food={x:Math.round(a+Math.random()*(b-a)),y:Math.round(a+Math.random()*(b-a))}
     }

     // moving the snake
     for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}
     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;

    //display the snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snake")
        }
        gameBox.appendChild(snakeElement)
    })

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBox.appendChild(foodElement);

}


//game logics
let hiscores=localStorage.getItem("hiscores");
if(hiscores===null){
    hiscoresVal=0;
    localStorage.setItem("hiscores",JSON.stringify(hiscoresVal))
}
else{
    hiscoresVal=JSON.parse(hiscores);
    hiscoreBox.innerHTML="high-score="+hiscores;
}

window.requestAnimationFrame(main);
const buttons=document.querySelectorAll("button");

// console.log(buttons);
buttons.forEach(eButton=>
    eButton.addEventListener("click",()=>
{   const dataSet=eButton.dataset.action;
    switch (dataSet) {

        case "cup":
            inputDir = { x: 0, y: -1 };
            break;
        case "cdown":
            inputDir = { x: 0, y: 1 };
            break;
        case "cleft":
            inputDir = { x: -1, y: 0 };
            break;
        case "cright":
            inputDir = { x: 1, y: 0 };
            break;
        default:
            break;
    }
}))

window.addEventListener("keydown", e => {
    snakeMove.play();
    snakeMove.playbackRate = 5;
    switch (e.key) {

        case "ArrowUp":
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            inputDir = { x: 1, y: 0 };
            break;
        default:
            break;
    }
})