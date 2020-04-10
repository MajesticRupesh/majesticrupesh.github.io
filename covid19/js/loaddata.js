function loaddata() {
    getLocation();

    // load twitter
    if(window.innerWidth < 1000) {
        document.getElementsByClassName("twitter-amour")[0].style.display = "none";
        document.getElementsByClassName("twitter-amour")[1].style.display = "block";
    }
    else {
        document.getElementsByClassName("twitter-amour")[1].style.display = "none";
        document.getElementsByClassName("twitter-amour")[0].style.display = "block";
    }

    // load json file for odisha state
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.covid19india.org/data.json", false );
    xmlHttp.send( null );
    var bodytext = xmlHttp.responseText;
        
    var text=JSON.parse(bodytext);

    for(var i=0;i<text.statewise.length;i++) {
        if(text.statewise[i].state=="Odisha") {
            document.getElementById("confirmed").innerHTML = text.statewise[i].confirmed;
            document.getElementById("active").innerHTML = text.statewise[i].active;
            document.getElementById("recovered").innerHTML = text.statewise[i].recovered;
            document.getElementById("deceased").innerHTML = text.statewise[i].deaths;
        }
    }


    // load odisha districts json
    var xmlHttp1 = new XMLHttpRequest();
    xmlHttp1.open( "GET", "https://api.covid19india.org/state_district_wise.json", false );
    xmlHttp1.send( null );
    var bodytext1 = xmlHttp1.responseText;
    document.getElementById("Khordha").title = "kk";
    var odisha =JSON.parse(bodytext1).Odisha.districtData;
    var district = Object.keys(odisha);
    for(var i=0; i<district.length; i++) {
        document.getElementById(district[i]+"1").innerHTML = district[i]+": "+odisha[district[i]].confirmed;
        if(odisha[district[i]].confirmed > 20) {
            document.getElementById(district[i]).style.fill = "rgb(255,0,0)";
        }
        else if(odisha[district[i]].confirmed > 10) {
            document.getElementById(district[i]).style.fill = "rgb(255,100,100)";
        }
        else if(odisha[district[i]].confirmed > 2) {
            document.getElementById(district[i]).style.fill = "rgb(255,150,150)";
        }
        else {
            document.getElementById(district[i]).style.fill = "rgb(255,200,200)";
        }
    }
}

function path_clicked(id) {
    document.getElementById("district-info").innerHTML = document.getElementById(id+"1").innerHTML;
}