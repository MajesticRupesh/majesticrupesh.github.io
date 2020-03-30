// Get the modal
var modal = document.getElementById("myModal");
    

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
async function modalopen() {
    modal.style.display = "block";
    var risk = document.getElementById("risk");
    if(count<20) {
        risk.innerHTML = "LOW";
        risk.style.color = "GREEN";
        risk.style.fontSize = "40px";
    }
    else if(count<40) {
        risk.innerHTML = "AVERAGE";
        risk.style.color = "rgb(254,218,9)";
        risk.style.fontSize = "40px";
    }
    else {
        risk.innerHTML = "HIGH";
        risk.style.color = "RED";
        risk.style.fontSize = "40px";
    }
    var upval=0;
    while(upval<=count) {
        range_change_event(upval++);
        await sleep(30);
    }
    
}



span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}