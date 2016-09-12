var path = require('path');

var dir_src = path.resolve(__dirname, './src');
var dir_dist = path.resolve(__dirname, './dist');

module.exports = {
    entry: path.resolve(dir_src,'index.js'),
    output: {
        path: dir_dist,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader",
            exclude: /node_modules/
        },{
            test: /\.js?$/,
            loader: "babel?presets[]=es2015,presets[]=stage-0",
            exclude: /node_modules/
        }]
    }
};