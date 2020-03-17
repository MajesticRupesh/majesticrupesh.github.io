var c=document.getElementById("bars");
var ctx=c.getContext("2d");
var width = c.width = 5000;
var height = c.height = 3000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function paint(randomArray, a=-1, b=-1) {
    console.log("i="+a+" j="+b);
    var num = randomArray.length;
    var gap=50;
    var wOfRect = (width - 50)/num - gap;
    ctx.clearRect(0,0,width,height);       // clear the canvas
    for(var i = 0 ; i < num ; i++) {
        if(i==a) {
            ctx.fillStyle = "royalblue";
        }
        else if(i==b) {
            ctx.fillStyle = "red";
        }
        else {
            ctx.fillStyle = "lightgray";
        }
        ctx.fillRect(i*wOfRect + i*gap + gap , (height-1) - randomArray[i] , wOfRect , randomArray[i]);
    }
}


function activate() {
    // get the algo used
    var e = document.getElementById("algo");
    var algoVal = e.options[e.selectedIndex].value;

    // get the size of array
    var number = document.getElementById("sizeOfArray").value;
    number = parseInt(number);
    var randoms = [...Array(number)].map(() => Math.floor(Math.random() * (height-2)));

    //var gap = 50;
    //var wOfRect = (width - 50)/number - gap;

    if(algoVal=="selection") {
        selsort(randoms);
    }

    if(algoVal=="bubble") {
        bubble(randoms);
    }
}