import {
    Request,
    Response,
    Router,
} from "express";
import * as path from "path";

import * as util from "util";
import {
    Utils,
} from "../config/utils";
import * as baseControllerModule from "./baseController";
// tslint:disable-next-line:no-namespace
export namespace Controllers {
    class HomeController extends baseControllerModule.Controllers.BaseController {
        /**
         *
         */
        constructor() {
            super("Home");
        }
        public ProcessRequest(): Router {
            this.ROUTER.route("/");
            this.ROUTER.get("/", this.Get("/"));
            this.ROUTER.get("/about/:symbol", this.About("/about/:symbol"));
            return this.ROUTER;
        }

        public GetViewPath(): string {
            return this.VIEW_PATH;
        }
        public Get(route: string): Router {
            return this.ROUTER.get("/", (req: Request, res: Response) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
                res.render(this.CURRENT_VIEW_PATH, {
                    locals: {
                        title: "Home",
                        userData: "",
                    },
                });
            });
        }
        public About(route: string) {
            return this.ROUTER.get(route, (req: Request, res: Response) => {

                const request = require("request");
                const symbol = req.params.symbol;
                // tslint:disable-next-line:max-line-length
                const url = "https://www.quandl.com/api/v3/datasets/NSE/" + `${symbol}` + ".json?api_key=YbWHxp_V2AvLbqPPczx3";
                // tslint:disable-next-line:no-console
                console.log(url);
                request.get(url, {json: true}, (err, resp, body) => {
                    res.send(body);
                });
            });
        }
        public Put(route: string): Router {
            throw new Error("Method not implemented.");
        }
        public Post(route: string): Router {
            throw new Error("Method not implemented.");
        }
        public Delete(route: string): Router {
            throw new Error("Method not implemented.");
        }
    }
    export const homeController = new HomeController();
}
