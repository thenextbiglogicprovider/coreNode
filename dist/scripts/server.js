"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const utils_1 = require("../../src/config/utils");
const enums_1 = require("../../src/models/enums");
const LoggerModel_1 = require("../../src/models/LoggerModel");
const config_1 = require("./config");
const engine = require("mustache-express");
const open = require("open");
const appLogger = new utils_1.Logger(new LoggerModel_1.LoggerModel());
class Server {
    /**
     *
     */
    constructor(port) {
        this.APP = express();
        this.PORT = port || 3000;
        this.Start();
    }
    get port() {
        return this.PORT = this.PORT || 3001;
    }
    set port(v) {
        this.PORT = v;
    }
    // tslint:disable-next-line:no-any
    get app() {
        return this.APP;
    }
    Configure() {
        //this.APP.engine('html',engine());
        this.APP.set("view engine", utils_1.Utils.Constants.VIEW_ENGINE);
        this.APP.use(express.static(path.join(__dirname, utils_1.Utils.Constants.VIEW_PATH)));
        this.APP.use(express.static(path.join(__dirname, utils_1.Utils.Constants.TEST_REPORT_PATH)));
        this.APP.set("views", express.static(path.join(__dirname, utils_1.Utils.Constants.VIEW_PATH)));
        this.APP.set("TestResults", express.static(path.join(__dirname, utils_1.Utils.Constants.TEST_REPORT_PATH)));
        this.APP.use(config_1.default());
    }
    Start() {
        this.APP.listen(this.port, (err) => {
            if (err) {
                appLogger.Log(err, enums_1.AppEnums.LogType.Error);
            }
            else {
                // tslint:disable-next-line:max-line-length
                appLogger.Log("App Server listening on port:" + this.port, enums_1.AppEnums.LogType.Message);
                open("http://localhost:" + this.port);
            }
        });
    }
}
exports.AppServer = new Server(3000);
