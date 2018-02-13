"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spider = require("simplecrawler");
const baseControllerModule = require("./baseController");
// tslint:disable-next-line:no-namespace
var Controllers;
(function (Controllers) {
    const webSpider = spider;
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
            this.ROUTER.get("/about/:symbol", this.About("/about/:symbol"));
            return this.ROUTER;
        }
        GetViewPath() {
            return this.VIEW_PATH;
        }
        Get(route) {
            return this.ROUTER.get("/", (req, res) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
                res.render(this.CURRENT_VIEW_PATH, {
                    locals: {
                        title: "Home",
                        userData: req.session.userData,
                    },
                });
            });
        }
        About(route) {
            return this.ROUTER.get(route, (req, res) => {
                const request = require("request");
                const symbol = req.params.symbol;
                // tslint:disable-next-line:max-line-length
                const url = "https://www.quandl.com/api/v3/datasets/NSE/" + `${symbol}` + ".json?api_key=YbWHxp_V2AvLbqPPczx3";
                // tslint:disable-next-line:no-console
                console.log(url);
                request.get(url, { json: true }, (err, resp, body) => {
                    res.send(body);
                });
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
