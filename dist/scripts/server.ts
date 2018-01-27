import * as express from "express";
import * as path from "path";
import { Logger, Utils } from "../../src/config/utils";
import { AppEnums } from "../../src/models/enums";
import { LoggerModel } from "../../src/models/LoggerModel";
import webpackConfig from "./config";

const engine = require("mustache-express");
const open = require("open");
const appLogger = new Logger(new LoggerModel());
class Server {
    private PORT: number;
    // tslint:disable-next-line:no-any
    private APP: any;
    /**
     *
     */
    constructor(port: number) {
        this.APP = express();
        this.PORT = port || 3000;
        this.Start();
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
        //this.APP.engine('html',engine());
        this.APP.set("view engine", Utils.Constants.VIEW_ENGINE);
        this.APP.use(express.static(path.join(__dirname, Utils.Constants.VIEW_PATH)));
        this.APP.use(express.static(path.join(__dirname, Utils.Constants.TEST_REPORT_PATH)));
        this.APP.set("views" , express.static(path.join(__dirname, Utils.Constants.VIEW_PATH)));
        this.APP.set("TestResults" , express.static(path.join(__dirname, Utils.Constants.TEST_REPORT_PATH)));
        this.APP.use(webpackConfig());
    }

    private Start(): void {
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
}

export const AppServer = new Server(3000);
