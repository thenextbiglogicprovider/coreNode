"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
//import {HTMLPlugin} from "html-webpack-plugin";
const utils_1 = require("./src/config/utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
exports.config = {
    devtool: "inline-source-map",
    entry: [
        path.join(__dirname, "src/views/home/index.ejs"),
    ],
    target: "web",
    output: {
        path: path.join(__dirname, "src/views/home/index.ejs"),
        publicPath: utils_1.Utils.Constants.APP_PATH,
        filename: "[name].bundle.js",
    },
    plugins: [],
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: ["/node_modules/"],
                loaders: ["babel-loader"],
            }, {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"],
            }],
    },
};
