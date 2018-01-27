"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
//import {HTMLPlugin} from "html-webpack-plugin";
const utils_1 = require("./src/config/utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
exports.config = {
    devtool: "inline-source-map",
    entry: [
        path.resolve(__dirname, "src/index"),
    ],
    target: "web",
    output: {
        path: path.resolve(__dirname, "src"),
        publicPath: utils_1.Utils.Constants.APP_PATH,
        filename: "[name].bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: utils_1.Utils.Constants.LAYOUT_PATH.HEADER,
        }),
    ],
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
