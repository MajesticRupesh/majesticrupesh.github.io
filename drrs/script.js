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

// Defining the scale
var linear = d3.scale.linear().range(["beige", "red"]);

queue()
    .defer(d3.json, 'Mumbai_Topojson.topojson')               
    .defer(d3.csv, 'Facilities_in_Mumbai_COVID_19_Cases.csv') // REPLACE REF WITH DATA
    .defer(d3.csv,'input_file_v1_dashboard.csv')
    .await(ready);

// The default property to be mapped
var property = 'Number of Cases- Very Congested Area';

function calculate_domain(data, property){

    var d_prop = data.map(function(d){ return parseInt(d[property]);});
    var ret_value = {};

    ret_value['min'] = d3.min(d_prop);
    ret_value['max'] = d3.max(d_prop);
    return ret_value;
};


function ready(error, MAP, DATA, LOC) {    // REPLACE REF WITH DATA
    if (error) throw error; 

    // Set domain for the scales
    var dom = calculate_domain(DATA, property);
    linear.domain([dom['min'], dom['max']]);

    // Mumbai data
    var mumbai = topojson.feature(MAP, MAP.objects.Mumbai);  

    var ward_id = {};
    DATA.forEach(function(d) { ward_id[d.Ward] = d.Ward})

    var ward_names = {};
    LOC.forEach(function(d) { ward_names[d.Ward] = d["Ward location"]; console.log(d["Ward location"]);});
    //console.log(d.Ward);

    var prop_value = {};
    DATA.forEach(function(d) { prop_value[d.Ward] = +parseInt(d[property]); });
    //console.log(prop_value);

    svg.append("g")
    .attr("class", "mumbai")
    .selectAll("path")
    .data(mumbai.features)
    .enter()
        .append("path")
        .attr("class", "ward")
        .attr("d", path)
    //    Try out the different scales.
        .style("fill", function(d) { 
        return linear(prop_value[d.properties.name]); 
        }) // population
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

    // Legend 
    svg.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(50, 100)");

    var legendLinear = d3.legend.color()
                                .scale(linear)
                                .title("Population Density / Sq. KM (2011)")
                                .labelFormat(d3.format(",.0f"));
    svg.select(".legendLinear")
        .call(legendLinear);
};