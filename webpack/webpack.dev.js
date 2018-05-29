const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode:"development",
	devServer: {
		contentBase: path.join(__dirname, '../src'),
		publicPath: '/',
		progress: true,
		port: 8080,
	},
};