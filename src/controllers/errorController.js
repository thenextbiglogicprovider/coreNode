"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerModule = require("./baseController");
// tslint:disable-next-line:no-namespace
var Controllers;
(function (Controllers) {
    class ErrorController extends ControllerModule.Controllers.BaseController {
        /**
         *
         */
        constructor() {
            super("Error");
        }
        ProcessRequest() {
            this.ROUTER.route("/error");
            this.ROUTER.get("/");
            return this.ROUTER;
        }
        GetViewPath() {
            throw new Error("Method not implemented.");
        }
        Get(route) {
            return this.ROUTER.get(route, (req, res) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
                res.render(this.CURRENT_VIEW_PATH, { locals: { title: this.NAME, message: " Not Found. (Error: 404)" } });
            });
        }
        Put(route) {
            throw new Error("Method not implemented.");
        }
        Post(route) {
            throw new Error("Method not implemented.");
        }
        Delete(route) {
            throw new Error("Method not implemented.");
        }
    }
    Controllers.errorController = new ErrorController();
})(Controllers = exports.Controllers || (exports.Controllers = {}));
