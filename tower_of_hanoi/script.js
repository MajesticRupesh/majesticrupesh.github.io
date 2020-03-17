var logincontainer;
var canvas;
var tower1discs, tower2discs, tower3discs; // array of discs in each tower
var finaltower;
var selected;
var moves;
var totaldisc;
var diskpopped;
var modal,span;
var playername;

function moveLeft(i) {
    logincontainer.style.left = -i*0.2 + 'vw';
}

function moveRight(i) {
    logincontainer.style.left = i*0.2-10 + 'vw';
    logincontainer.style.opacity=1-i/400;
}

function startgame() {
    if(parseInt(document.getElementById("totaldisc").value)>0 && parseInt(document.getElementById("totaldisc").value)<=10){
        playername=document.getElementById("playername").value;
        modal = document.getElementById("myModal");
        span = document.getElementsByClassName("close")[0];
        var i=0;
        totaldisc=parseInt(document.getElementById("totaldisc").value);
        tower1discs= [];
        finaltower= [];
        for(var loop=1;loop<=totaldisc;loop++)  {
            tower1discs.push(loop);
            finaltower.push(loop);
            document.getElementById("disc"+loop).style.display="block";
        }
        
        tower2discs=[];
        tower3discs=[];
        selected=0;
        moves=0;
        logincontainer = document.getElementById("logincontainer");
        canvas = document.getElementById("game");
        for(i=0;i<50;i++) 
            setTimeout(moveLeft,i*5,i);
        for(i=0;i<600;i++) 
            setTimeout(moveRight,i*1+250,i);
        setTimeout(function hide() { logincontainer.style.display="none"; } , 850);
        setTimeout(function hide() { canvas.style.display="block"; } , 850);
    }
}

function hanoigame(event) {
    var left=document.getElementById("towerarea").getBoundingClientRect().left;
    var width=document.getElementById("towerarea").getBoundingClientRect().width;

    // picking up
    if(selected==0) {
        if((event.pageX-left)/width*100<33.33)  {
            selected=1;
            if(tower1discs.length>0) {
                document.getElementById("disc"+tower1discs[tower1discs.length-1]).style.top=10+"vh";
                diskpopped=tower1discs.pop();
            }
            else {
                selected=0;
            }
        }
        else if((event.pageX-left)/width*100<66.66) {
            selected=2;
            if(tower2discs.length>0) {
                document.getElementById("disc"+tower2discs[tower2discs.length-1]).style.top=10+"vh";
                diskpopped=tower2discs.pop();
            }
            else {
                selected=0;
            }
        }
        else {
            selected=3;
            if(tower3discs.length>0) {
                document.getElementById("disc"+tower3discs[tower3discs.length-1]).style.top=10+"vh";
                diskpopped=tower3discs.pop();
            }
            else {
                selected=0;
            }
        }
    }
    
    // moving
    else {
        if((event.pageX-left)/width*100<33.33){
            if(tower1discs[tower1discs.length-1]<diskpopped || tower1discs.length==0) {
                tower1discs.push(diskpopped);
                document.getElementById("disc"+tower1discs[tower1discs.length-1]).style.top=(50.2-tower1discs.length*3.2)+"vh";
                document.getElementById("disc"+tower1discs[tower1discs.length-1]).style.left=(-0.15+0.75*diskpopped)+"vw";
                if(selected!=1) {
                    moves++;
                    document.getElementById("movescount").innerHTML=moves;
                }
                selected=0;
            }
            else {
                alert("Not allowed");
            }
        }
        else if((event.pageX-left)/width*100<66.66){
            if(tower2discs[tower2discs.length-1]<diskpopped || tower2discs.length==0) {
                tower2discs.push(diskpopped);
                document.getElementById("disc"+tower2discs[tower2discs.length-1]).style.top=(50.2-tower2discs.length*3.2)+"vh";
                document.getElementById("disc"+tower2discs[tower2discs.length-1]).style.left=((24-0.15)+0.75*diskpopped)+"vw";
                if(selected!=2) {
                    moves++;
                    document.getElementById("movescount").innerHTML=moves;
                }
                selected=0;
                if(JSON.stringify(finaltower)==JSON.stringify(tower2discs)){
                    document.getElementById("congrats").innerHTML=playername+" you won the match in "+moves+" moves";
                    modal.style.display = "block";
                }
            }
            else {
                alert("Not allowed");
            }
        }  
        else {
            if(tower3discs[tower3discs.length-1]<diskpopped || tower3discs.length==0) {
                tower3discs.push(diskpopped);
                document.getElementById("disc"+tower3discs[tower3discs.length-1]).style.top=(50.2-tower3discs.length*3.2)+"vh";
                document.getElementById("disc"+tower3discs[tower3discs.length-1]).style.left=((48.5-0.15)+0.75*diskpopped)+"vw";
                if(selected!=3) {
                    moves++;
                    document.getElementById("movescount").innerHTML=moves;
                }
                selected=0;
                if(JSON.stringify(finaltower)==JSON.stringify(tower3discs)) {
                    document.getElementById("congrats").innerHTML=playername+" you won the match in "+moves+" moves";
                    modal.style.display = "block";
                }
            }
            else {
                alert("Not allowed");
            }
        }
    }
}

function closemodalfunction() {
    modal.style.display = "none";
    canvas.style.display= "none";
    logincontainer.style.display = "block";
    logincontainer.style.left=0+"vw";
    logincontainer.style.opacity=1;
    reset();
}

function reset() {
    tower1discs= [];
    finaltower= [];
    for(var loop=1;loop<=10;loop++)  {
        document.getElementById("disc"+loop).style.display="none";
        document.getElementById("disc"+loop).style.top=(50.2-loop*3.2)+"vh";
        document.getElementById("disc"+loop).style.left=(6.2+0.25*loop)+"vw";
    }
    tower2discs=[];
    tower3discs=[];
    selected=0;
    moves=0;
    document.getElementById("movescount").innerHTML="0";
}