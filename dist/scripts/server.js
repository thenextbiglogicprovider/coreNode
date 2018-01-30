"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const sessionManager_1 = require("../../src/config/sessionManager");
const utils_1 = require("../../src/config/utils");
const enums_1 = require("../../src/models/enums");
const LoggerModel_1 = require("../../src/models/LoggerModel");
const config_1 = require("./config");
const AppSettings = require("./settings");
const bodyParser = require("body-parser");
const engine = require("mustache-express");
const open = require("open");
const appLogger = new utils_1.Logger(new LoggerModel_1.LoggerModel());
const liveServer = require("live-server");
const appSettings = AppSettings.default.AppSettings;
class Server {
    /**
     *
     */
    constructor(port, startLiveServer = false) {
        this.sessionManager = sessionManager_1.sessionManager;
        this.APP = express();
        this.PORT = port || 3000;
        this.Start();
        if (startLiveServer) {
            // liveServer.start(appSettings.params);
            // this.LiveServer = liveServer;
            this.liveServerUrl = "http://" + appSettings.params.host + ": " + appSettings.params.port;
        }
    }
    get LiveServerUrl() {
        return this.liveServerUrl;
    }
    set LiveServerUrl(v) {
        this.liveServerUrl = "http://" + appSettings.params.host + ": " + appSettings.params.port;
    }
    get LiveServer() {
        return this.LiveServer;
    }
    set LiveServer(v) {
        this.LiveServer = liveServer;
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
        this.APP.use(bodyParser.urlencoded({
            extended: true,
        }));
        this.APP.use(bodyParser.json());
        //});
        this.APP.set("view engine", utils_1.Utils.Constants.VIEW_ENGINE);
        this.APP.use(express.static(path.join(__dirname, utils_1.Utils.Constants.VIEW_PATH)));
        this.APP.use(express.static(path.join(__dirname, utils_1.Utils.Constants.TEST_REPORT_PATH)));
        this.APP.set("views", express.static(path.join(__dirname, utils_1.Utils.Constants.VIEW_PATH)));
        this.APP.set("TestResults", express.static(path.join(__dirname, utils_1.Utils.Constants.TEST_REPORT_PATH)));
        this.APP.use(config_1.default());
        this.sessionManager.ConfigureSession(this.APP);
    }
    Start() {
        this.Configure();
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
exports.AppServer = new Server(3000, true);
