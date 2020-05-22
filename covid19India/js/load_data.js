// load this function when body loads
var data_json;  // keeping this var public
var state_name = [];
var state_code = [];    // holds statecode in format "IN-AS"
var state_confirm = [];
var state_active = [];
var state_recover = [];
var state_decease = [];
function load_data() {

    // load json file for odisha state
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.covid19india.org/data.json", false );
    xmlHttp.send( null );
    var bodytext = xmlHttp.responseText;

    data_json=JSON.parse(bodytext);

    var indiaTotalConfirmed=0;
    var indiaTotalActive=0;
    var indiaTotalRecovered=0;
    var indiaTotalDeceased=0;
    indiaTotalConfirmed += parseInt(data_json.statewise[0].confirmed);
    indiaTotalActive += parseInt(data_json.statewise[0].active);
    indiaTotalRecovered += parseInt(data_json.statewise[0].recovered);
    indiaTotalDeceased += parseInt(data_json.statewise[0].deaths);

    // register statecode and stats from each state
    for(var i=1; i<data_json.statewise.length; i++) {
        state_name[i] = data_json.statewise[i].state;
        state_code[i] = "IN-"+data_json.statewise[i].statecode;
        state_confirm[i] = parseInt(data_json.statewise[i].confirmed);
        state_active[i] = parseInt(data_json.statewise[i].active);
        state_recover[i] = parseInt(data_json.statewise[i].recovered);
        state_decease[i] = parseInt(data_json.statewise[i].deaths);

        var row = statetable.insertRow(-1);
        row.id = "state"+i; // set row id for each row
        // Insert new cells (<td> elements) at the last position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.style.backgroundColor = "rgb(244, 240, 249)";
        cell1.style.color = "#6c757d";
        cell1.style.border = "2px solid white";
        cell1.style.borderRadius = "10px";
        cell1.style.fontWeight = "600";

        cell2.style.backgroundColor = "rgb(244, 240, 249)";
        cell2.style.color = "#6c757d";
        cell2.style.border = "2px solid white";
        cell2.style.borderRadius = "10px";
        cell2.style.fontWeight = "400";

        cell3.style.backgroundColor = "rgb(244, 240, 249)";
        cell3.style.color = "#6c757d";
        cell3.style.border = "2px solid white";
        cell3.style.borderRadius = "10px";
        cell3.style.fontWeight = "400";

        cell4.style.backgroundColor = "rgb(244, 240, 249)";
        cell4.style.color = "#6c757d";
        cell4.style.border = "2px solid white";
        cell4.style.borderRadius = "10px";
        cell4.style.fontWeight = "400";

        cell5.style.backgroundColor = "rgb(244, 240, 249)";
        cell5.style.color = "#6c757d";
        cell5.style.border = "2px solid white";
        cell5.style.borderRadius = "10px";
        cell5.style.fontWeight = "400";
        

        // Add district info to the new cells:
        cell1.innerHTML = state_name[i];
        cell2.innerHTML = state_confirm[i];
        cell3.innerHTML = state_active[i];
        cell4.innerHTML = state_recover[i];
        cell5.innerHTML = state_decease[i];
    }

    document.getElementById("indiaconfirmed").innerHTML = indiaTotalConfirmed;
    document.getElementById("indiaactive").innerHTML = indiaTotalActive;
    document.getElementById("indiarecovered").innerHTML = indiaTotalRecovered;
    document.getElementById("indiadeceased").innerHTML = indiaTotalDeceased;

    loadchart1();
    loadchart2();
    loadchart3();
    loadchart4();
    
    // load heatmap of confirmed cases
    confirm_chart();
}

function confirm_chart() {
    document.getElementById("chartdiv1").style.display = "block";
    document.getElementById("chartdiv2").style.display = "none";
    document.getElementById("chartdiv3").style.display = "none";
    document.getElementById("chartdiv4").style.display = "none";
}
function active_chart() {
    document.getElementById("chartdiv1").style.display = "none";
    document.getElementById("chartdiv2").style.display = "block";
    document.getElementById("chartdiv3").style.display = "none";
    document.getElementById("chartdiv4").style.display = "none";
}
function recover_chart() {
    document.getElementById("chartdiv1").style.display = "none";
    document.getElementById("chartdiv2").style.display = "none";
    document.getElementById("chartdiv3").style.display = "block";
    document.getElementById("chartdiv4").style.display = "none";
}
function decease_chart() {
    document.getElementById("chartdiv1").style.display = "none";
    document.getElementById("chartdiv2").style.display = "none";
    document.getElementById("chartdiv3").style.display = "none";
    document.getElementById("chartdiv4").style.display = "block";
}