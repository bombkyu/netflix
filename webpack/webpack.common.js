const path = require('path');
const merge = require('webpack-merge');
const webpack = require("webpack");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

const MODE = process.env.npm_lifecycle_event;

console.log(MODE);

const commonConfig = {
    entry: path.join(__dirname, "../src/index.js"),
    output: {
        path:path.join(__dirname, "../out"),
        filename:"bundle.js"
    }
};

if(MODE === "build") {
    module.exports = merge(commonConfig, prodConfig);
} else if(MODE==="start") {
    module.exports = merge(commonConfig, devConfig);
}