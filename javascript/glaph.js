var data = [{
    name:"13-11",
    value: 9
},{
    name:"14-11",
    value: 4
},{
    name:"15-11",
    value: 9
},{
    name:"16-11",
    value: 5
},{
    name:"17-11",
    value: 7
},{
    name:"18-11",
    value: 11
},{
    name:"19-11",
    value: 6
},{
    name:"20-11",
    value: 13
},{
    name:"21-11",
    value: 4
},{
    name:"22-11",
    value: 4
},{
    name:"23-11",
    value: 8
},{
    name:"24-11",
    value: 7
},{
    name:"25-11",
    value: 8
},{
    name:"26-11",
    value: 9
},{
    name:"27-11",
    value: 7
},{
    name:"28-11",
    value: 5
},{
    name:"29-11",
    value: 4
},{
    name:"30-11",
    value: 6
},{
    name:"01-12",
    value: 10
},{
    name:"02-12",
    value: 6
},{
    name:"03-12",
    value: 6
},{
    name:"04-12",
    value: 7
},{
    name:"05-12",
    value: 4
}];

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    padding = 30,
    width = 1080 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append("g");

var x = d3.scale.ordinal()
    .domain(data.map(function(d) {return d.name; }))
    .rangeRoundBands([50, width + 10], 0.5);

var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
    .range([height - padding, padding])

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

canvas.append("g")
    .attr("class","axis")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(xAxis)


canvas.append("g")
    .attr("class","axis")
    .attr("transform", "translate(" + (margin.left) + ",0)")
    .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -25)
        .style("text-anchor", "end")
        .text("Afstand in km");

canvas.selectAll("circle")
    .data(data)
    .enter()
        .append("circle")
        .attr({
        cx: function (d) { return x(d.name)},
        cy: function (d) { return y(d.value)},
        r: 5,
        class: "circle"
    });

var link = d3.svg.line()
    .x(function(d) { return x(d.name); })
    .y(function(d) { return y(d.value); });

canvas.append("path")
        .datum(data)
        .attr("class", "link")
        .attr("d", link);

TweenLite.from("path", 5, {drawSVG:"0% 0%", ease:Linear.easeNone, delay:1} );

TweenMax.staggerFrom("circle", 1, {opacity: 0, ease:Power1.easeInOut},0.1);