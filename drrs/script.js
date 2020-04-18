var width = 1000, height = 700;

// MERCATOR
var projection = d3.geo.mercator()
    .center([72.8777, 19.089]) // Approximately the coordinates of Mumbai (slightly North)
    .scale(90000)
    .translate([width / 2, 310]);

var path = d3.geo.path()
    .projection(projection);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Title inside the Map
svg.append("text")
    .attr("x", "50")             
    .attr("y", "29")
    .attr("text-anchor", "start")  
    .style("font-size", "16px") 
    .style("text-decoration", "none")  
    .text("Mumbai Ward Level Map"); 

// Div for the tooltip 
var tooltip = d3.select('body').append('div')
    .attr('class', 'hidden tooltip');

queue()
    .defer(d3.json, 'Mumbai_Topojson.topojson')               
    .defer(d3.csv, 'Facilities_in_Mumbai_COVID_19_Cases.csv') // REPLACE REF WITH DATA
    .defer(d3.csv,'input_file_v1_dashboard.csv')
    .await(ready);

// The default property to be mapped
var property1 = 'Number of Cases- Very Congested Area';
var property2 = 'Number of Cases- Medium Congested';
var property3 = 'Number of Cases- Standalone Structure';

function ready(error, MAP, DATA, LOC) {    // REPLACE REF WITH DATA
    if (error) throw error; 
    
    // Mumbai data
    var mumbai = topojson.feature(MAP, MAP.objects.Mumbai);  

    var ward_id = {};
    DATA.forEach(function(d) { ward_id[d.Ward] = d.Ward})

    var population = {};
    LOC.forEach(function(d) { population[d.Ward] = parseInt(d.Population)})

    var ward_names = {};
    LOC.forEach(function(d) { ward_names[d.Ward] = d["Ward location"]});

    var prop_value = {};
    var percent_value = {};
    DATA.forEach(function(d) {
        prop_value[d.Ward] = 0;
        if(d[property1]) prop_value[d.Ward] += parseInt(d[property1]*3.6);
        if(d[property2]) prop_value[d.Ward] += parseInt(d[property2]*2.6);
        if(d[property3]) prop_value[d.Ward] += parseInt(d[property3]*1.5);
        
        percent_value[d.Ward] = prop_value[d.Ward]/population[d.Ward];
        console.log(ward_names[d.Ward] + " " + ward_id[d.Ward] + " " + prop_value[d.Ward] + " " + population[d.Ward] + " " + percent_value[d.Ward]);
    });

    svg.append("g")
    .attr("class", "mumbai")
    .selectAll("path")
    .data(mumbai.features)
    .enter()
        .append("path")
        .attr("class", "ward")
        .attr("d", path)

        // WARD FILLING STYLE
        .style("fill", function(d) { 
            if(percent_value[d.properties.name] == 0)
                return "green";
            else if(percent_value[d.properties.name] > 0 && percent_value[d.properties.name] < 0.0001)
                return "blue";
            else if(percent_value[d.properties.name] >=0.0001 && percent_value[d.properties.name] < 0.0002)
                return "orange";
            else if(percent_value[d.properties.name] >= 0.0002)
                return "red";
        
        })
        .on('mousemove', function(d) {
            // Gets coordinates for the Mouse pointer
            var mouse = d3.mouse(svg.node()).map(function(d) {
                return parseInt(d);
        });
        // Un hides the div for the tooltip and the positions it Also adds the html content
        // @TODO: Format the population values to put commas
        tooltip.classed('hidden', false)
            .attr('style', 'left:' + (mouse[0] + 15) +
                    'px; top:' + (mouse[1] - 35) + 'px')
            .html(ward_names[d.properties.name] + ": "+ prop_value[d.properties.name].toLocaleString());
        })
        .on('mouseout', function() {
            tooltip.classed('hidden', true);
        });

    //Borders 
    svg.append("path")
        .datum(topojson.mesh(MAP, MAP.objects.Mumbai, function(a, b) { return a !== b; }))
        .attr("class", "mumbai-boundary")
        .attr("d", path);  

    // LEGEND OF MAP
    svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "red")
    svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "orange")
    svg.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "blue")
    svg.append("circle").attr("cx",200).attr("cy",220).attr("r", 6).style("fill", "green")
    svg.append("text").attr("x", 220).attr("y", 130).text(">0.02%").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 160).text("0.01% - 0.02%").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 190).text("0% - 0.01%").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 220).attr("y", 220).text("0%").style("font-size", "15px").attr("alignment-baseline","middle")
};