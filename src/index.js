// require('./drawLineChart.js');
// require('./drag.js');

import BarChart from './draw-barChart'
import DragCircles from './drag-circles';
require('./index.css');

const visualBar = new BarChart('#chartArea');
const visualCircles = new DragCircles('#cr');