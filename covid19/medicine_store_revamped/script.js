document.getElementById("image1").style.display = "none";
document.getElementById("image2").style.display = "none";
document.getElementById("image3").style.display = "none";
document.getElementById("image4").style.display = "none";
document.getElementById("image5").style.display = "none";
document.getElementById("image6").style.display = "none";

$('.path-region').click(function(){
    var index = $('.path-region').index(this);
    console.log(index);
    if(index == 24) {
        //ganjam
        document.getElementById("image1").style.display = "block";
        document.getElementById("image2").style.display = "none";
        document.getElementById("image3").style.display = "none";
        document.getElementById("image4").style.display = "none";
        document.getElementById("image5").style.display = "none";
        document.getElementById("image6").style.display = "none";
    }
    else if(index == 11) {
        //sambalpur
        document.getElementById("image1").style.display = "none";
        document.getElementById("image2").style.display = "block";
        document.getElementById("image3").style.display = "none";
        document.getElementById("image4").style.display = "none";
        document.getElementById("image5").style.display = "none";
        document.getElementById("image6").style.display = "none";
    }
    else if(index == 19) {
        //khorda
        document.getElementById("image1").style.display = "none";
        document.getElementById("image2").style.display = "none";
        document.getElementById("image3").style.display = "block";
        document.getElementById("image4").style.display = "block";
        document.getElementById("image5").style.display = "block";
        document.getElementById("image6").style.display = "none";
    }
    else {
        //other states
        document.getElementById("image1").style.display = "none";
        document.getElementById("image2").style.display = "none";
        document.getElementById("image3").style.display = "none";
        document.getElementById("image4").style.display = "none";
        document.getElementById("image5").style.display = "none";
        document.getElementById("image6").style.display = "block";
    }
});