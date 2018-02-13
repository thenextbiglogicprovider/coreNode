"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const authConfig = require("../../src/config/auth.config");
const sessionManager_1 = require("../../src/config/sessionManager");
const utils_1 = require("../../src/config/utils");
const enums_1 = require("../../src/models/enums");
const LoggerModel_1 = require("../../src/models/LoggerModel");
const config_1 = require("./config");
const AppSettings = require("./settings");
const cors = require("cors");
const bodyParser = require("body-parser");
const engine = require("mustache-express");
const open = require("open");
const appLogger = new utils_1.Logger(new LoggerModel_1.LoggerModel());
const liveServer = require("live-server");
const appSettings = AppSettings.default.AppSettings;
const Strategy = require("passport-openidconnect").Strategy;
const authConfiguration = authConfig.authConfig;
const cookieParser = require("cookie-parser");
class Server {
    /**
     *
     */
    constructor(port, authPassport, startLiveServer = false) {
        this.sessionManager = sessionManager_1.sessionManager;
        this.appLogger = new utils_1.Logger(new LoggerModel_1.LoggerModel());
        this.APP = express();
        this.PORT = port || 3000;
        this.authPassport = require("passport");
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
        this.APP.use(cookieParser());
        this.APP.use((req, res, next) => {
            this.LogMessage(req.method + ":" + req.url);
            res.header("Access-Control-Allow-Origin", "*");
            res.set("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
            next();
        });
        this.APP.use(bodyParser.urlencoded({
            extended: true,
        }));
        this.APP.use(cors());
        this.APP.use(bodyParser.json());
        this.APP.use(this.authPassport.initialize());
        this.APP.use(this.authPassport.session());
        // tslint:disable-next-line:max-line-length
        this.authPassport.use(new Strategy(authConfiguration.authconfig, (iss, sub, profile, jwtClaims, accessToken, refreshToken, params, verified) => {
            //this.app.session.user = {};
            verified(null, Object.assign({}, profile, { token: accessToken }));
        }));
        this.authPassport.serializeUser((user, done) => {
            // tslint:disable-next-line:no-console
            console.log("User Info:" + user);
            done(null, { id: user.id, name: user.displayName, token: user.token });
        });
        appLogger.Log("Startegy:" + require("passport-openidconnect").Strategy, enums_1.AppEnums.LogType.Message);
        this.authPassport.deserializeUser((user, done) => {
            done(null, user);
        });
        this.APP.set("view engine", utils_1.Utils.Constants.VIEW_ENGINE);
        this.APP.use(express.static(path.join(__dirname, utils_1.Utils.Constants.VIEW_PATH)));
        this.APP.use(express.static(path.join(__dirname, utils_1.Utils.Constants.TEST_REPORT_PATH)));
        this.APP.set("views", express.static(path.join(__dirname, utils_1.Utils.Constants.VIEW_PATH)));
        this.APP.set("TestResults", express.static(path.join(__dirname, utils_1.Utils.Constants.TEST_REPORT_PATH)));
        this.APP.use(config_1.default());
        this.sessionManager.ConfigureSession(this.APP);
        this.APP.get((err, req, res, next) => {
            this.appLogger.Log("Error:" + err.stack, enums_1.AppEnums.LogType.Error);
            next();
        }, (req, res) => {
            res.redirect("/error");
        });
        this.AuthConfigure();
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
    LogMessage(message) {
        this.appLogger.Log(message, enums_1.AppEnums.LogType.Message);
    }
    AuthConfigure() {
        authConfiguration.config(this.APP, this.authPassport);
    }
}
exports.Server = Server;
