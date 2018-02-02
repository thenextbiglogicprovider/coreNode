import * as express from "express";
import * as path from "path";
import * as util from "util";
import {sessionManager} from "../../src/config/sessionManager";
import {
    Logger,
    Utils,
} from "../../src/config/utils";
import {
    AppEnums,
} from "../../src/models/enums";
import {
    LoggerModel,
} from "../../src/models/LoggerModel";
import webpackConfig from "./config";
import * as AppSettings from "./settings";

const bodyParser = require("body-parser");
const engine = require("mustache-express");
const open = require("open");
const appLogger = new Logger(new LoggerModel());
const liveServer = require("live-server");
const appSettings = AppSettings.default.AppSettings;
class Server {
    private sessionManager = sessionManager;
    private PORT: number;
    // tslint:disable-next-line:no-any
    private APP: any;

    private liveServerUrl: string;
    private appLogger = new Logger(new LoggerModel());
    /**
     *
     */
    constructor(port: number, startLiveServer: boolean = false) {
        this.APP = express();
        this.PORT = port || 3000;
        this.Start();
        if (startLiveServer) {
            // liveServer.start(appSettings.params);
            // this.LiveServer = liveServer;
            this.liveServerUrl = "http://" + appSettings.params.host + ": " + appSettings.params.port;
        }
    }
    public get LiveServerUrl(): string {
        return this.liveServerUrl;
    }
    public set LiveServerUrl(v: string) {
        this.liveServerUrl = "http://" + appSettings.params.host + ": " + appSettings.params.port;
    }
    public get LiveServer(): object {
        return this.LiveServer;
    }
    public set LiveServer(v: object) {
        this.LiveServer = liveServer;
    }
    public get port(): number {
        return this.PORT = this.PORT || 3001;
    }

    public set port(v: number) {
        this.PORT = v;
    }
    // tslint:disable-next-line:no-any
    public get app(): any {
        return this.APP;
    }

    private Configure(): void {
        this.APP.use((req, res, next) => {
        this.LogMessage(req.method + ":" + req.url);
        //this.LogMessage("User Agent:" + util.inspect(req));
        next();
        });
        this.APP.use(bodyParser.urlencoded({
            extended: true,
        }));
        this.APP.use(bodyParser.json());
        this.APP.set("view engine", Utils.Constants.VIEW_ENGINE);
        this.APP.use(express.static(path.join(__dirname, Utils.Constants.VIEW_PATH)));
        this.APP.use(express.static(path.join(__dirname, Utils.Constants.TEST_REPORT_PATH)));
        this.APP.set("views", express.static(path.join(__dirname, Utils.Constants.VIEW_PATH)));
        this.APP.set("TestResults", express.static(path.join(__dirname, Utils.Constants.TEST_REPORT_PATH)));
        this.APP.use(webpackConfig());
        this.sessionManager.ConfigureSession(this.APP);
        this.APP.get((err, req, res, next) => {
            this.appLogger.Log("Error:" + err.stack, AppEnums.LogType.Error);
            next();
        }, (req, res) => {
            res.redirect("/error");
        });
    }

    private Start(): void {
        this.Configure();
        this.APP.listen(this.port, (err) => {
            if (err) {
                appLogger.Log(err, AppEnums.LogType.Error);
            } else {
                // tslint:disable-next-line:max-line-length
                appLogger.Log("App Server listening on port:" + this.port, AppEnums.LogType.Message);
                open("http://localhost:" + this.port);
            }
        });
    }

    private LogMessage(message: string): void {
        this.appLogger.Log(message, AppEnums.LogType.Message);
    }
}

export const AppServer = new Server(3000, true);
