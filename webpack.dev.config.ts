import * as path from "path";
//import {HTMLPlugin} from "html-webpack-plugin";
import {
    Utils
} from "./src/config/utils";

const HtmlWebpackPlugin = require("html-webpack-plugin");

export const config= {
    devtool: 'inline-source-map',
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: Utils.Constants.APPPATH,
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: Utils.Constants.LAYOUTPATH.HEADER,
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: ['/node_modules/'],
            loaders: ['babel-loader']
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }]
    }
}
