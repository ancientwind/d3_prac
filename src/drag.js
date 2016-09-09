/**
 * Created by 212331901 on 2016/9/9.
 */

var d3 = require('d3');

/**
 * When a drag event listener is invoked, d3.event is set to the current drag event. The event object exposes several fields:

 target - the associated drag behavior.
 type - the string “start”, “drag” or “end”; see drag.on.
 subject - the drag subject, defined by drag.subject.
 x - the new x-coordinate of the subject; see drag.container.
 y - the new y-coordinate of the subject; see drag.container.
 dx - the change in x-coordinate since the previous drag event.
 dy - the change in y-coordinate since the previous drag event.
 identifier - the string “mouse”, or a numeric touch identifier.
 active - the number of currently active drag gestures (on start and end, not including this one).
 sourceEvent - the underlying input event, such as mousemove or touchmove.

 *
 */
var drag = d3.drag()
    .on('start', function (d) {
        console.log('start drag; this is the dragged circle object');
        console.log(this);
        console.log('input d is the data object ');
        console.log(d);
        d3.select(this) // this == drag event
            .attr('fill', 'black');
    })
    .on('drag', function (d) {
        d3.select(this)
            .attr('cx', d.x_axis = d3.event.x) //update data.x_axis and circle.cx with the event.x
            .attr('cy', d.y_axis = d3.event.y);
    })
    .on('end', function (d) {
        // console.log(d3.event);
        d3.select(this)
            .attr('fill', d.color);
    });

var w = 400, h = 300;
var jsonCircles = [
    { "x_axis": 40, "y_axis": 40, "radius": 30, "color" : "green" },
    { "x_axis": 100, "y_axis": 100, "radius": 25, "color" : "purple"},
    { "x_axis": 210, "y_axis": 200, "radius": 40, "color" : "yellow"}];

var svg = d3.select('#cr').append('svg')
    .attr('width', w)
    .attr('height', h);

var circles = svg.selectAll('circle')
    .data(jsonCircles)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
        return d.x_axis;
    })
    .attr('cy', function(d) {
        return d.y_axis;
    })
    .attr('r', function (d) {
        return d.radius;
    })
    .attr('fill', function (d) {
        return d.color;
    })
    .call(drag);


