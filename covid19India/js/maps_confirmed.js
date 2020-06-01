var chart1;
var user_lat=0, user_long=0;

function loadchart1(status) {
// Create map instance

if(chart1) {
  chart1.dispose();
  delete chart1;
}
chart1 = am4core.create("chartdiv1", am4maps.MapChart);

// Set map definition
chart1.geodata = am4geodata_worldLow;

// Set projection
chart1.projection = new am4maps.projections.Miller();

// Series for World map
var worldSeries = chart1.series.push(new am4maps.MapPolygonSeries());
worldSeries.include = ["IN"];
worldSeries.indiaGeodata = true;
var polygonTemplate = worldSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";

///////////////////////////////////////
//// SHOW INDIAN STATES
///////////////////////////////////////
    // Series for India map
    var indiaSeries = chart1.series.push(new am4maps.MapPolygonSeries());
    indiaSeries.geodata = am4geodata_indiaLow;
    var polygonTemplate = indiaSeries.mapPolygons.template;

    // Series for India states
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.stroke = am4core.color("black");
    hs.properties.strokeOpacity = 1;
    hs.properties.strokeWidth = 2;
    
///////////////////////////////////////
//// SHOW INDIAN STATES END
///////////////////////////////////////


///////////////////////////////////////
//// LAT LONG
///////////////////////////////////////
    
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} 

///////////////////////////////////////
//// LAT LONG END
///////////////////////////////////////

    polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#.0')}";
    
    if(status==1){
      indiaSeries.heatRules = [];
      indiaSeries.heatRules.push({
        property: "fill",
        target: indiaSeries.mapPolygons.template,
        min: am4core.color("rgba(247, 212, 215,0.7)"),
        max: am4core.color("rgba(217, 38, 56,0.7)")
      });
    }
    else if(status==2) {
      indiaSeries.heatRules = [];
      indiaSeries.heatRules.push({
        property: "fill",
        target: indiaSeries.mapPolygons.template,
        min: am4core.color("rgba(204, 229, 255,0.7)"),
        max: am4core.color("rgba(0, 99, 204,0.7)")
      });
    }
    else if(status==3) {
      indiaSeries.heatRules = [];
      indiaSeries.heatRules.push({
        property: "fill",
        target: indiaSeries.mapPolygons.template,
        min: am4core.color("rgba(214, 245, 221, 0.7)"),
        max: am4core.color("rgba(40, 164, 69, 0.7)")
      });
    }
    else if(status==4) {
      indiaSeries.heatRules = [];
      indiaSeries.heatRules.push({
        property: "fill",
        target: indiaSeries.mapPolygons.template,
        min: am4core.color("rgba(228, 230, 231, 0.7)"),
        max: am4core.color("rgba(95, 102, 109, 0.7)")
      });
    }
    

    
    indiaSeries.useGeodata = true;

    // add heat legend
    var heatLegend = chart1.chartContainer.createChild(am4maps.HeatLegend);
    heatLegend.valign = "bottom";
    heatLegend.align = "left";
    heatLegend.width = am4core.percent(100);
    heatLegend.series = indiaSeries;
    heatLegend.orientation = "horizontal";
    heatLegend.padding(20, 20, 20, 20);
    heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
    heatLegend.valueAxis.renderer.minGridDistance = 40;

    indiaSeries.mapPolygons.template.events.on("over", event => {
      handleHover(event.target);
    });

    indiaSeries.mapPolygons.template.events.on("hit", event => {
      handleHover(event.target);
    });

    function handleHover(mapPolygon) {
        if (!isNaN(mapPolygon.dataItem.value)) {
            heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
        } else {
            heatLegend.valueAxis.hideTooltip();
        }
    }

    indiaSeries.mapPolygons.template.strokeOpacity = 0.4;
    indiaSeries.mapPolygons.template.events.on("out", event => {
        heatLegend.valueAxis.hideTooltip();
    });

    chart1.seriesContainer.draggable = false;
    chart1.seriesContainer.resizable = false;
    chart1.maxZoomLevel = 1;

    //indiaSeries push data 
    if(status==1) {
      indiaSeries.data = [];
      for(var i=0;i<state_confirm.length;i++) {
        var fg = {
          "id":state_code[i],
          "value":state_confirm[i]
        }
        indiaSeries.data.push(fg);
      }
    }
    else if(status==2) {
      indiaSeries.data = [];
      for(var i=0;i<state_active.length;i++) {
        var fg = {
            "id":state_code[i],
            "value":state_active[i]
        }
        indiaSeries.data.push(fg);
      }
    }
    else if(status==3) {
      indiaSeries.data = [];
      for(var i=0;i<state_recover.length;i++) {
        var fg = {
          "id":state_code[i],
          "value":state_recover[i]
        }
        indiaSeries.data.push(fg);
      }
    }
    else if(status==4) {
      indiaSeries.data = [];
      for(var i=0;i<state_active.length;i++) {
        var fg = {
          "id":state_code[i],
          "value":state_decease[i]
        }
        indiaSeries.data.push(fg);
      }
    }
}

function showPosition(position) {
  user_lat=position.coords.latitude;
  user_long=position.coords.longitude;

  // Create image series
  var imageSeries = chart1.series.push(new am4maps.MapImageSeries());

  // Create a circle image in image series template so it gets replicated to all new images
  var imageSeriesTemplate = imageSeries.mapImages.template;
  var circle = imageSeriesTemplate.createChild(am4core.Circle);
  circle.radius = 5;
  circle.fill = am4core.color("#B27799");
  circle.stroke = am4core.color("#FFFFFF");
  circle.strokeWidth = 1;
  circle.nonScaling = true;
  circle.tooltipText = "{title}";

  // Set property fields
  imageSeriesTemplate.propertyFields.latitude = "latitude";
  imageSeriesTemplate.propertyFields.longitude = "longitude";
  
  // Add data for the user city
  imageSeries.data = [{
    "latitude": user_lat,
    "longitude": user_long,
    "title": "Your Location \nLat: "+user_lat+"\nLong: "+user_long
  }];
}