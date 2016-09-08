var d3 = require('d3');

var _ = require('lodash');

// var dataset = [ 10,18,16,12,18,16,12 ];

var dataset = _.map(_.range(25), function (i) {
    return Math.random() * 30;
})

var w = 400, h = 300;

var svg = d3.select('#chartArea').append('svg')
    .attr('width', w)
    .attr('height', h);

var xScale = d3.scaleBand()
    .domain(dataset)
    .range([0,w])
    .paddingInner(0.2)
    .paddingOuter(0.5);

var yScale = d3.scaleLinear()
    .domain([0,d3.max(dataset)*1.1])
    .range([0,h]);

var colorScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range(['yellow', 'green']);

svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) {
        return xScale(d) ;
    })
    .attr('y', function (d) {
        return h - yScale(d);
    })
    .style('width', xScale.bandwidth())
    .style('height', function (d) {
        return yScale(d);
    })
    .attr('fill', colorScale) //short form to pass function of colorscale
;

