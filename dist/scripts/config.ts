//import webpack from "webpack";
//import {middleware} from "webpack-dev-middleware";
import {config} from "../../webpack.dev.config";

// tslint:disable-next-line:no-var-requires
const compiler = require("webpack")(config);

function WebpackConfig() {
    return  require("webpack-dev-middleware")(compiler, {
       noInfo: true,
     publicPath: config.output.publicPath,
    });
}

export default WebpackConfig;
