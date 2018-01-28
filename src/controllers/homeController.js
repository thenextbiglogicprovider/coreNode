"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseControllerModule = require("./baseController");
// tslint:disable-next-line:no-namespace
var Controllers;
(function (Controllers) {
    class HomeController extends baseControllerModule.Controllers.BaseController {
        /**
         *
         */
        constructor() {
            super("Home");
        }
        ProcessRequest() {
            this.ROUTER.route("/");
            this.ROUTER.get("/", this.Get("/"));
            this.ROUTER.get("/about", this.About("/about"));
            return this.ROUTER;
        }
        GetViewPath() {
            return this.VIEW_PATH;
        }
        Get(route) {
            return this.ROUTER.get("/", (req, res) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
                res.render(this.CURRENT_VIEW_PATH, { locals: { title: "Home" } });
            });
        }
        About(route) {
            return this.ROUTER.get("/about", (req, res) => {
                //this.CURRENT_VIEW = this.VIEW_PATH.replace("{0}", "home").replace("{1}", "index");
                //res.render(this.CURRENT_VIEW, {locals: { title: "Home"}});
                res.send("Hello from home");
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
    Controllers.homeController = new HomeController();
})(Controllers = exports.Controllers || (exports.Controllers = {}));
