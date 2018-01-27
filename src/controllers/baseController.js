"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = require("path");
const utils_1 = require("../config/utils");
// tslint:disable-next-line:no-namespace
var Controllers;
(function (Controllers) {
    class BaseController {
        /**
         *
         */
        constructor(name, viewPath) {
            this.name = name;
            this.viewPath = viewPath
                || path.join(__dirname, utils_1.Utils.Constants.VIEW_PATH.replace("{0}", name.toLowerCase()));
            this.router = express_1.Router();
            return this;
        }
        get NAME() {
            return this.name;
        }
        get ROUTER() {
            return this.router;
        }
        get VIEW_PATH() {
            return this.viewPath;
        }
        get CURRENT_VIEW_PATH() {
            return this.currentViewPath;
        }
        set CURRENT_VIEW_PATH(v) {
            this.currentViewPath = v;
        }
        get CURRENT_ROUTE() {
            return this.currentRoute;
        }
        get CURRENT_REQUEST() {
            return this.currentRequest;
        }
    }
    Controllers.BaseController = BaseController;
})(Controllers = exports.Controllers || (exports.Controllers = {}));
