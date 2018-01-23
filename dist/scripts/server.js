"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./config");
const path = require("path");
const utils_1 = require("../../src/config/utils");
const engine = require("mustache-express"), open = require("open");
class appServer {
    /**
     *
     */
    constructor(port) {
        this._app = express();
        this._port = port || 3000;
        this.Start();
    }
    get port() {
        return this._port = this._port || 3000;
    }
    set port(v) {
        this._port = v;
    }
    get app() {
        return this._app;
    }
    Configure() {
        //this._app.engine('html',engine());
        this._app.set('view engine', utils_1.Utils.Constants.VIEWENGINE);
        this._app.use(express.static(path.join(__dirname, utils_1.Utils.Constants.VIEWPATH)));
        this._app.set('views', express.static(path.join(__dirname, utils_1.Utils.Constants.VIEWPATH)));
        this._app.use(config_1.default());
    }
    Start() {
        this.app.listen(this.port, (err) => {
            if (err) {
                console.log(err); /*eslint-disable-line-no-console */
            }
            else {
                console.log('App Server listening on port:' + this.port); /*eslint-disable-line-no-console */
                open('http://localhost:' + this.port);
            }
        });
    }
}
exports.AppServer = new appServer(3000);
