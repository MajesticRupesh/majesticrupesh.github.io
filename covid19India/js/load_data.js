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

    }

    
    document.getElementById("deltaconfirmed").innerHTML = "[+"+data_json.statewise[0].deltaconfirmed+"]";
    document.getElementById("deltaactive").innerHTML = "&nbsp";
    document.getElementById("deltarecovered").innerHTML = "[+"+data_json.statewise[0].deltarecovered+"]";
    document.getElementById("deltadeceased").innerHTML = "[+"+data_json.statewise[0].deltadeaths+"]";

    document.getElementById("indiaconfirmed").innerHTML = indiaTotalConfirmed;
    document.getElementById("indiaactive").innerHTML = indiaTotalActive;
    document.getElementById("indiarecovered").innerHTML = indiaTotalRecovered;
    document.getElementById("indiadeceased").innerHTML = indiaTotalDeceased;

    document.getElementById("confirmedpercent").innerHTML = "&nbsp";
    document.getElementById("activepercent").innerHTML = "<b>("+(Math.round(indiaTotalActive/indiaTotalConfirmed*100 * 100) / 100).toFixed(1)+"%)</b>";
    document.getElementById("recoveredpercent").innerHTML = "<b>("+(Math.round(indiaTotalRecovered/indiaTotalConfirmed*100 * 100) / 100).toFixed(1)+"%)</b>";
    document.getElementById("deceasedpercent").innerHTML = "<b>("+(Math.round(indiaTotalDeceased/indiaTotalConfirmed*100 * 100) / 100).toFixed(1)+"%)</b>";

    document.getElementById("lastupdate").innerHTML = "Updated "+data_json.statewise[0].lastupdatedtime;

    loadchart1(1);
    document.getElementById("chartdiv1").style.display = "block";
}