import * as express from "express";
import webpackConfig from "./config";
import * as path from "path";
import { Utils } from "../../src/config/utils";
const engine = require("mustache-express");
class appServer {
    /**
     *
     */
    constructor(port: number) {
        this._app = express();
        this._port = port || 3000;
        this.Start();
    }

    private _port: number;
    public get port(): number {
        return this._port = this._port || 3000;
    }

    public set port(v: number) {
        this._port = v;
    }

    private _app: any;
    public get app(): any {
        return this._app;
    }

    private Configure(): void {
        //this._app.engine('html',engine());
        this._app.set('view engine',Utils.Constants.VIEWENGINE);
        this._app.use(express.static(path.join(__dirname, Utils.Constants.VIEWPATH)));
        this._app.set('views' ,express.static(path.join(__dirname, Utils.Constants.VIEWPATH)));
        this._app.use(webpackConfig());
    }

    private Start(): void {
        this.app.listen(this.port, () => {
            console.log('App Server listening on port:' + this.port);
        });
    }
}

export const AppServer = new appServer(3000);