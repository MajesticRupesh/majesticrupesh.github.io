function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var server = document.getElementsByClassName("server");
var client = document.getElementsByClassName("client");
var predict = document.getElementsByClassName("predict-container");
var typing = server[8];

var count = 0;

async function loads(n) {
    typing.style.display="block";
    await sleep(500);
    typing.style.display = "none";
    document.getElementsByClassName("server")[n].style.display = "block";
    
    if(n==0) {
        loads(1);
    }
    else {
        document.getElementsByClassName("predict-container")[n-1].style.display = "block";
        window.scrollTo(0,document.body.scrollHeight);
    }
}

$(document).ready(function () {
    $(".predict1").click(async function() {
        var index = $(".predict1").index(this);
        document.getElementById("client1").innerHTML = document.getElementsByClassName("predict1")[index].innerHTML;
        var ar = [1,2,3,5];
        count = count + ar[index];
        console.log(count);
        client[0].style.display = "block";
        await sleep(200);
        predict[0].style.display = "none";
        loads(2);
    });

    $(".predict2").click(async function() {
        var index = $(".predict2").index(this);
        document.getElementById("client2").innerHTML = document.getElementsByClassName("predict2")[index].innerHTML;
        var ar = [1,1,1];
        count = count + ar[index];
        console.log(count);
        client[1].style.display = "block";
        await sleep(200);
        predict[1].style.display = "none";
        loads(3);
        
    });

    $(".predict3").click(async function() {
        var index = $(".predict3").index(this);
        document.getElementById("client3").innerHTML = document.getElementsByClassName("predict3")[index].innerHTML;
        var ar = [1,3,5];
        count = count + ar[index];
        console.log(count);
        client[2].style.display = "block";
        await sleep(200);
        predict[2].style.display = "none";
        loads(4);
        
    });

    $(".predict4").click(async function() {
        var index = $(".predict4").index(this);
        document.getElementById("client4").innerHTML = document.getElementsByClassName("predict4")[index].innerHTML;
        var ar = [5,4,4,3,2,0];
        count = count + ar[index];
        console.log(count);
        client[3].style.display = "block";
        await sleep(200);
        predict[3].style.display = "none";
        loads(5);
        
    });

    $(".predict5").click(async function() {
        var index = $(".predict5").index(this);
        document.getElementById("client5").innerHTML = document.getElementsByClassName("predict5")[index].innerHTML;
        var ar = [5,4,4,2,3,3,0];
        count = count + ar[index];
        console.log(count);
        client[4].style.display = "block";
        await sleep(200);
        predict[4].style.display = "none";
        loads(6);
        
    });

    $(".predict6").click(async function() {
        var index = $(".predict6").index(this);
        document.getElementById("client6").innerHTML = document.getElementsByClassName("predict6")[index].innerHTML;
        var ar = [1,2,3,10];
        count = count + ar[index];
        console.log(count);
        client[5].style.display = "block";
        await sleep(200);
        predict[5].style.display = "none";
        loads(7);
      
    });

    $(".predict7").click(async function() {
        var index = $(".predict7").index(this);
        document.getElementById("client7").innerHTML = document.getElementsByClassName("predict7")[index].innerHTML;
        var ar = [2,2,3,2,3,4,4,0];
        count = count + ar[index];
        console.log(count);
        client[6].style.display = "block";
        await sleep(200);
        predict[6].style.display = "none";
        $(function () {
          modalopen();
        });
    });
});