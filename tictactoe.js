const container1=document.getElementsByClassName('container')[0];
const content1=document.getElementsByClassName('content')[0];
const player=document.getElementsByClassName('start')[0];
const restart=document.getElementsByClassName('reset')[0];

let audioturn =new Audio('ting.mp3');
let winner =new Audio('winner.mp3');
let draw =new Audio('draw.mp3');
let turn ='X';
let gamecomplete=false;
let gameover=false;


let c=9;

container1.classList.remove("outer");
player.classList.remove("play");

const togglebtn=()=>{
    content1.classList.remove("inner");
    content1.style.opacity = '0';
    
    restart.classList.remove("restart");
    restart.style.opacity = '0';
    
}


const play=()=>{
    
    container1.style.opacity = '0';
    container1.style.transform = 'translateY(-50px)';

    player.style.opacity = '0';
    player.style.transform = 'translateY(-50px)';


    
    setTimeout(function() {
        container1.classList.add("outer");     
        player.classList.add("play");
        togglebtn()
        
        // Fade in the content
        setTimeout(function() {
            content1.style.opacity = '1';
            
            restart.style.opacity='1'
        }, 50); // Slight delay to ensure display block is applied before opacity change
    }, 1000); // Duration matches the CSS transition time
}
    

const changeTurn=()=>{

        return turn==='X'?'O':'X';
    
}

const checkWin=()=>{
    let boxtxt=document.getElementsByClassName("boxtxt");
    let wins=[
        [0,1,2,-1.4,3.5,0],
        [3,4,5,-1.4,11.5,0],
        [6,7,8,-1.4,19,0],
        [0,3,6,-9.5,11,90],
        [1,4,7,-1.5,11,90],
        [2,5,8,6.5,11,90],
        [0,4,8,-1,11.5,45],
        [2,4,6,-2,11.5,135],
    ];
    
    wins.forEach(e=>{
        if((boxtxt[e[0]].innerText===boxtxt[e[1]].innerText) && (boxtxt[e[2]].innerText===boxtxt[e[1]].innerText) && (boxtxt[e[0]].innerText!=='')){
            document.querySelector('.info').innerText=boxtxt[e[0]].innerText + ": Winner" ; 
            winner.play()
            gameover=true;
            gamecomplete=true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width='150px';
            document.querySelector('#line').style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector("#line").style.width="25vw"
                }   
            
        })
    
        if(!gameover){
            c=c-1;
            console.log(c);
        }
        
}


//Game Logic

let boxes=document.getElementsByClassName("boxes");


Array.from(boxes).forEach(element =>{
let boxtxt=element.querySelector('.boxtxt');
element.addEventListener('click',()=>{
    
    if(boxtxt.innerText===''){
        if(!gamecomplete){
        boxtxt.innerText=turn;
        turn=changeTurn();
        audioturn.play();
        checkWin();
        }
        if(!gameover){
            if(c!=0){

                document.getElementsByClassName('info')[0].innerText="Next Turn : " +turn;
            }
            else if(c==0){
                draw.play()
                document.querySelector('.info').innerText=" .. DRAW .." ; 
            }
                
        }
    }
})
})


//restart function
const restarter=()=>{
    let boxtxt=document.querySelectorAll('.boxtxt');
    Array.from(boxtxt).forEach(element =>{
        element.innerText=''
    });
    turn="X"
    gamecomplete=false;
    gameover=false;
    document.getElementsByClassName('info')[0].innerText="Next Turn : " +turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width='0px'
    document.querySelector("#line").style.width="0vw"
    c=9
}
player.addEventListener('click',play);
restart.addEventListener('click',restarter);



