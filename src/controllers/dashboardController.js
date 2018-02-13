"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseControllerModule = require("./baseController");
// tslint:disable-next-line:no-namespace
var Controllers;
(function (Controllers) {
    class DashboardController extends baseControllerModule.Controllers.BaseController {
        /**
         *
         */
        constructor() {
            super("Dashboard");
        }
        ProcessRequest() {
            this.ROUTER.route("/dashboard");
            this.ROUTER.get("/", this.Get("/"));
            return this.ROUTER;
        }
        GetViewPath() {
            return this.VIEW_PATH;
        }
        Get(route) {
            this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
            return this.ROUTER.get(route, (req, res) => {
                res.render(this.CURRENT_VIEW_PATH, { locals: {
                        title: this.NAME, message: "User Dashboard", userData: req.session.userData
                    } });
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
    Controllers.dashboardController = new DashboardController();
})(Controllers = exports.Controllers || (exports.Controllers = {}));
