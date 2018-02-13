import * as express from "express";
import { passport } from "passport";
import * as path from "path";
import * as util from "util";
import * as authConfig from "../../src/config/auth.config";
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

const cors  = require("cors");
const bodyParser = require("body-parser");
const engine = require("mustache-express");
const open = require("open");
const appLogger = new Logger(new LoggerModel());
const liveServer = require("live-server");
const appSettings = AppSettings.default.AppSettings;

const Strategy = require("passport-openidconnect").Strategy;
const authConfiguration = authConfig.authConfig;
const cookieParser = require("cookie-parser");
export class Server {
    private authPassport;
    private sessionManager = sessionManager;
    private PORT: number;
    // tslint:disable-next-line:no-any
    private APP: any;

    private liveServerUrl: string;
    private appLogger = new Logger(new LoggerModel());
    /**
     *
     */
    constructor(port: number, authPassport, startLiveServer: boolean = false) {
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
        this.APP.use(cookieParser());
        this.APP.use((req, res, next) => {
        this.LogMessage(req.method + ":" + req.url);
        res.header("Access-Control-Allow-Origin", "*");
        res.set("Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
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
            verified(null, Object.assign({}, profile, {token: accessToken}));
        }));
        this.authPassport.serializeUser((user, done) => {
            // tslint:disable-next-line:no-console
            console.log("User Info:" + user);
            done(null, {id: user.id, name: user.displayName, token: user.token});
        });
        appLogger.Log("Startegy:" + require("passport-openidconnect").Strategy, AppEnums.LogType.Message);
        this.authPassport.deserializeUser((user, done) => {
            done(null, user);
        });
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
        this.AuthConfigure();
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
    private AuthConfigure() {
        authConfiguration.config(this.APP, this.authPassport);
    }
}
