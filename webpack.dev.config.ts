import * as path from "path";
//import {HTMLPlugin} from "html-webpack-plugin";
import {
    Utils,
} from "./src/config/utils";

const HtmlWebpackPlugin = require("html-webpack-plugin");

export const config = {
    devtool: "inline-source-map",
    entry: [
        path.join(__dirname, "src/views/home/index.ejs"),
    ],
    target: "web",
    output: {
        path: path.join(__dirname, "src/views/home/index.ejs"),
        publicPath: Utils.Constants.APP_PATH,
        filename: "[name].bundle.js",
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     template: path.join(__dirname, Utils.Constants.LAYOUT_PATH.HEADER),
        // }),
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
