"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = require("path");
const utils_1 = require("../config/utils");
class homeController {
    /**
     *
     */
    constructor() {
        this._router = express_1.Router();
        this._viewPath = path.join(__dirname, utils_1.Utils.Constants.VIEWPATH);
    }
    get router() {
        return this._router;
    }
    get viewPath() {
        return this._viewPath;
    }
    /**
     * Get
     */
    Get() {
        return this._router.get('/', (req, res) => {
            this._currentView = this._viewPath.replace('{0}', 'home').replace('{1}', 'index');
            res.render(this._currentView, { locals: { title: 'Home' } });
        });
    }
}
exports.HomeController = new homeController();
