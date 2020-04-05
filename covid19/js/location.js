var area_name = ["suryanagar"];
var area_lat = [23];
var area_long = [86];

var user_pos;
var mymap;

var circle = [];
function getLocation() {
    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    user_pos = position;
    mymap = L.map('mapid').setView([user_pos.coords.latitude, user_pos.coords.longitude], 6);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);
    var min = 100000;
    for(var i = 0; i < area_name.length; i++) {
        if(distance(position.coords.latitude,position.coords.longitude,area_lat[i],area_long[i]) < min) {
            min = distance(position.coords.latitude,position.coords.longitude,area_lat[i],area_long[i]);
        }
    }
    if(min<20) {
        document.getElementById("distance").style.backgroundColor = "rgb(252, 51, 16)";
    }
    else if(min<50) {
        document.getElementById("distance").style.backgroundColor = "yellow";
    }
    else if(min<100) {
        document.getElementById("distance").style.backgroundColor = "royalblue";
    }
    else {
        document.getElementById("distance").style.backgroundColor = "green";
    }
    document.getElementById("distance-content").innerHTML = "Someone within "+min+" km from your distance has been detected with corona virus. Stay Safe.";
    document.getElementById("distance").style.display = "block";
}

function showmap() {
    var marker = L.marker([user_pos.coords.latitude, user_pos.coords.longitude]).addTo(mymap);

    for(var i = 0; i< area_name.length; i++) {
        circle[i] = L.circle([area_lat[i], area_long[i]], {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.5,
            radius: 9000
        }).addTo(mymap);
    }
    mymap.invalidateSize();
    openmodal();
}

function closedistance() {
    document.getElementById("distance").style.display = "none";
}

function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return d;   // returns km
}