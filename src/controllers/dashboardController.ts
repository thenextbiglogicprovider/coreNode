import { Router } from "express";
import * as baseControllerModule from "./baseController";
// tslint:disable-next-line:no-namespace
export namespace Controllers {
 class DashboardController extends baseControllerModule.Controllers.BaseController {

    /**
     *
     */
    constructor() {
        super("Dashboard");

    }
     public ProcessRequest(): Router {
        this.ROUTER.route("/dashboard");
        this.ROUTER.get("/", this.Get("/"));
        return this.ROUTER;
     }
     public GetViewPath(): string {
         return this.VIEW_PATH;
     }
     public Get(route: string): Router {
         this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
         return this.ROUTER.get(route, (req , res) => {
        res.render(this.CURRENT_VIEW_PATH,  {locals: {
             title: this.NAME, message: "User Dashboard", userData: req.session.userData}});
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

 export const dashboardController = new DashboardController();
}
