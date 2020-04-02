function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var server = document.getElementsByClassName("server");
var client = document.getElementsByClassName("client");
var predict = document.getElementsByClassName("predict-container");
var typing = server[8];

var count = 0;

function reset() {
    location.reload(true); 
}

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
        var msg = new SpeechSynthesisUtterance();
        
        msg.voice = speechSynthesis.getVoices().forEach(function(voice) {
            if(voice.name=='Google हिन्दी')
                console.log(voice.name, voice.default ? voice.default :'');
                return voice.name;
        });
        msg.text = 'नमस्ते';
        speechSynthesis.speak(msg);
        
        
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
        speechSynthesis.getVoices().forEach(function(voice) {
            if(voice.name=='Google हिन्दी')
                console.log(voice.name, voice.default ? voice.default :'');
                return voice.name;
        });
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

    // 4th step
    var symptom1="";
    var count_symptom1=0;
    var symptom1_clicked=[-1,-1,-1,-1,-1,-1];
    $(".predict4").click(async function() {
        var index = $(".predict4").index(this);
        if(symptom1_clicked[index] == -1) {
            symptom1 = symptom1 + document.getElementsByClassName("predict4")[index].innerHTML+", ";
            document.getElementsByClassName("predict4")[index].style.backgroundColor = "white";
            var ar = [5,4,4,3,2,0];
            count_symptom1 = count_symptom1 + ar[index];
            console.log("count_symptom1 "+count_symptom1);
            symptom1_clicked[index] *= -1;
        }
        else {
            symptom1 = symptom1.replace(document.getElementsByClassName("predict4")[index].innerHTML+',','');
            document.getElementsByClassName("predict4")[index].style.backgroundColor = "rgb(254,218,9)";
            var ar = [5,4,4,3,2,0];
            count_symptom1 = count_symptom1 - ar[index];
            console.log("count_symptom1 "+count_symptom1);
            symptom1_clicked[index] *= -1;
        }
    });

    $(".p4.confirm").click(async function() {
        symptom1 = symptom1.substring(0, symptom1.length - 2);
        document.getElementById("client4").innerHTML = symptom1;
        count = count + count_symptom1;
        console.log(count);
        client[3].style.display = "block";
        await sleep(200);
        predict[3].style.display = "none";
        loads(5);
    });


    // 5th step
    var symptom2="";
    var count_symptom2=0;
    var symptom2_clicked=[-1,-1,-1,-1,-1,-1,-1];
    $(".predict5").click(async function() {
        var index = $(".predict5").index(this);
        if(symptom2_clicked[index] == -1) {
            symptom2 = symptom2 + document.getElementsByClassName("predict5")[index].innerHTML+", ";
            document.getElementsByClassName("predict5")[index].style.backgroundColor = "white";
            var ar = [5,4,4,2,3,3,0];
            count_symptom2 = count_symptom2 + ar[index];
            console.log("count_symptom2 "+count_symptom2);
            symptom2_clicked[index] *= -1;
        }
        else {
            symptom2 = symptom2.replace(document.getElementsByClassName("predict5")[index].innerHTML+',','');
            document.getElementsByClassName("predict5")[index].style.backgroundColor = "rgb(254,218,9)";
            var ar = [5,4,4,2,3,3,0];
            count_symptom2 = count_symptom2 - ar[index];
            console.log("count_symptom2 "+count_symptom2);
            symptom2_clicked[index] *= -1;
        }
    });

    $(".p5.confirm").click(async function() {
        symptom2 = symptom2.substring(0, symptom2.length - 2);
        document.getElementById("client5").innerHTML = symptom2;
        count = count + count_symptom2;
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



    // 7th step
    var history="";
    var count_history=0;
    var history_clicked=[-1,-1,-1,-1,-1,-1,-1,-1];
    $(".predict7").click(async function() {
        var index = $(".predict7").index(this);
        if(history_clicked[index] == -1) {
            history = history + document.getElementsByClassName("predict7")[index].innerHTML+", ";
            document.getElementsByClassName("predict7")[index].style.backgroundColor = "white";
            var ar = [2,2,3,2,3,4,4,0];
            count_history = count_history + ar[index];
            console.log("count_history "+count_history);
            history_clicked[index] *= -1;
        }
        else {
            history = history.replace(document.getElementsByClassName("predict7")[index].innerHTML+',','');
            document.getElementsByClassName("predict7")[index].style.backgroundColor = "rgb(254,218,9)";
            var ar = [2,2,3,2,3,4,4,0];
            count_history = count_history - ar[index];
            console.log("count_history "+count_history);
            history_clicked[index] *= -1;
        }
    });

    $(".p7.confirm").click(async function() {
        history = history.substring(0, history.length - 2);
        document.getElementById("client7").innerHTML = history;
        count = count + count_history;
        console.log(count);
        client[6].style.display = "block";
        await sleep(200);
        predict[6].style.display = "none";
        $(function () {
            modalopen();
        });
    });
});