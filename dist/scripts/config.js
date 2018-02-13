"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import webpack from "webpack";
//import {middleware} from "webpack-dev-middleware";
const webpack_dev_config_1 = require("../../webpack.dev.config");
// tslint:disable-next-line:no-var-requires
const compiler = require("webpack")(webpack_dev_config_1.config);
function WebpackConfig() {
    return require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpack_dev_config_1.config.output.publicPath,
    });
}
exports.default = WebpackConfig;
