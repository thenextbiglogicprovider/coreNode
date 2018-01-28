import {
    Request,
    Response,
    Router,
} from "express";

import * as path from "path";

import { Utils } from "../config/utils";
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
        this.ROUTER.get("/about", this.About("/about"));
        return this.ROUTER;
    }

    public GetViewPath(): string {
        return this.VIEW_PATH;
    }
    public Get(route: string): Router {
        return this.ROUTER.get("/", (req: Request, res: Response) => {
            this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
            res.render(this.CURRENT_VIEW_PATH, {locals: { title: "Home"}});
        });
    }
    public About(route: string) {
        return this.ROUTER.get("/about", (req: Request, res: Response) => {
            //this.CURRENT_VIEW = this.VIEW_PATH.replace("{0}", "home").replace("{1}", "index");
            //res.render(this.CURRENT_VIEW, {locals: { title: "Home"}});
            res.send("Hello from home");
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
