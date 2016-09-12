/**
 * Created by 212331901 on 2016/9/9.
 */

import * as d3 from 'd3';
import * as _ from 'lodash';
import * as Constants from './constants';

const margin = {bottom: 20, right: 0, top: 50, left: 10};

let w = Constants._w - margin.left - margin.right,
    h = Constants._h - margin.top - margin.bottom;

const dataset = _.map(_.range(25), function (i) {
    return Math.random() * 30;
});

let xScale = d3.scaleBand()
    .domain(dataset)
    .range([0, w])
    .paddingInner(0.2)
    .paddingOuter(0.5);
;

let yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset) * 1.1])
    .range([0, h]);

let colorScale = d3.scaleQuantile()
    .domain([0, dataset.length / 3, dataset.length / 3 * 2, dataset.length])
    .range(['yellow', 'green', 'blue']);

export default class BarChart {
    // var _ = require('lodash');

// var dataset = [ 10,18,16,12,18,16,12 ];

    constructor(parentElem){
        let svg = d3.select(parentElem).append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        this.drawBarChart(svg);
    }

    drawBarChart = (svg) => {
        svg
            .selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('class','bar')
            .attr('x', (d) => xScale(d) )
            .attr('y',(d) => h - yScale(d) )
            .style('width', xScale.bandwidth() )
            .style('height',(d) => yScale(d) )
            // .attr('fill', colorScale) //short form to pass function of colorscale
            .attr('fill', (d, i) => colorScale(i) )
    }

}