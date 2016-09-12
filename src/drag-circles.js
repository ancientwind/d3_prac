/**
 * Created by 212331901 on 2016/9/9.
 */

// var d3 = require('d3');

import * as d3 from 'd3';
import * as Constants from './constants';

class DragCircles {
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

    constructor(parentElem) {

        let svg = d3.select(parentElem).append('svg')
            .attr('width', Constants._w)
            .attr('height', Constants._h);

        this.drawCircles(svg);
    }

    drawCircles (svg)  {
        svg.selectAll('circle')
            .data(Constants._jsonCircles)
            .enter()
            .append('circle')
            .attr('cx', function (d) {
                return d.x_axis;
            })
            .attr('cy', function (d) {
                return d.y_axis;
            })
            .attr('r', function (d) {
                return d.radius;
            })
            .attr('fill', function (d) {
                return d.color;
            })
            .call(
               this.mydrag()
            );
    }

    mydrag = () => {
        return d3.drag()
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
    }


}

export default DragCircles;