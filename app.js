let gameseq =[];
let userseq = [];
let heigest = 0;

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

// for start the game
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started")
        started=true;
        levelUp();
    }
});

// add class for game
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

// add class for user
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}


// flash random number and update the number
function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `level ${level}`;

    // random btn choose
    let randomIdx = Math.floor(Math.random()*3);
    let randColor = btns[randomIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    // console.log(gameseq);
    gameFlash(randbtn);
}

// check user input
function checkAns(idx) { 
    
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        // reset and display result
        if(heigest < level ){
            heigest = level;
        }
        h2.innerHTML = `Game Over! your score was <b>${level} </b> <br> your heigest score is ${heigest}  <br>Press any key to start `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150 );
        reset();
    }
}    

// button press
function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

// for reset 
function reset(){
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}