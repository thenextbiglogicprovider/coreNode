import { Router } from "express";
import * as ControllerModule from "./baseController";

// tslint:disable-next-line:no-namespace
export namespace Controllers {
   class ErrorController extends ControllerModule.Controllers.BaseController {
      /**
       *
       */
      constructor() {
          super("Error");
      }
      public ProcessRequest(): Router {
          this.ROUTER.route("/error");
          this.ROUTER.get("/");
          return this.ROUTER;
      }
      public GetViewPath(): string {
          throw new Error("Method not implemented.");
      }
      public Get(route: string): Router {
        return this.ROUTER.get(route, (req, res) => {
            this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
            res.render(this.CURRENT_VIEW_PATH, {locals: { title: this.NAME, message: " Not Found. (Error: 404)"}});
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
   export const errorController = new ErrorController();
}
