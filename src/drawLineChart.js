/**
 * Created by 212331901 on 2016/9/9.
 */

var d3 = require('d3');

var _ = require('lodash');

// var dataset = [ 10,18,16,12,18,16,12 ];

var dataset = _.map(_.range(25), function (i) {
    return Math.random() * 30;
})

var margin = {bottom: 20, right: 0, top: 50, left: 10};

var w = 400 - margin.left - margin.right,
    h = 300 - margin.top - margin.bottom;

var svg = d3.select('#chartArea').append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xScale = d3.scaleBand()
    .domain(dataset)
    .range([0,w])
    .paddingInner(0.2)
    .paddingOuter(0.5);

var yScale = d3.scaleLinear()
    .domain([0,d3.max(dataset)*1.1])
    .range([0,h]);

// var colorScale = d3.scaleQuantize()
//     .domain([0, dataset.length])
//     .range(['yellow', 'green', 'blue']);

var colorScale = d3.scaleQuantile()
    .domain([0, dataset.length / 3, dataset.length / 3 * 2 ,  dataset.length])
    .range(['yellow', 'green', 'blue']);

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
    // .attr('fill', colorScale) //short form to pass function of colorscale
    .attr('fill', function (d, i) {
        return colorScale(i);
    })
;

