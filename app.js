const moles=document.querySelectorAll(".mole");
const startButton= document.getElementById("start");
const scoreText= document.querySelector("#score");
const timeText=document.querySelector("#time");

let previousmole;
let timeup= false;
let score=0;
let time=15;

startButton.addEventListener("click",startGame);
moles.forEach((mole)=> mole.addEventListener("click", catchit));

function randommole(){
    const turnofmole=Math.floor(Math.random()*moles.length);
    const chosen=moles[turnofmole];
    if(previousmole===chosen){
        return randommole();
    } else {
        previousmole=chosen;
    }
    return chosen;
}

function randomtime(min,max){
    const duration= Math.round(Math.random()*(max-min))+min;
    return duration;
}

function toUp(){
    const mole=randommole();
    const moletime= randomtime(750,1250);
    mole.classList.add("chosen");
    setTimeout(() => {
        mole.classList.remove("chosen");
        if(!timeup) toUp();
    }, moletime); 
}
function timestart(){
    if(!timeup){
        time--;
        timeText.textContent=time;
    } else {
        timeText.textContent="Time is up!"
    }
}
function startGame() {
    time=15;
    score=0;
    timeup=false;
    const interval=setInterval(()=>{
        timestart();
        if (timeup) clearInterval(interval);
    }, 1000);
    toUp();
    setTimeout(()=>{
        timeup=true;
    }, time*1000);    
}

function catchit(e) {
    if(e.target.classList.contains("chosen")){
        score++;
        e.target.classList.remove("chosen");
    }
    scoreText.textContent=score;
    
}























