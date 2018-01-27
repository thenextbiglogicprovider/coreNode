//import { Request, Response, Router } from "express";
import { Router } from "express-serve-static-core";
import * as path from "path";
import { Utils } from "../config/utils";
import * as ControllerModule from "./baseController";
// tslint:disable-next-line:no-namespace
export namespace Controllers {
export class AccountController extends ControllerModule.Controllers.BaseController {

        /**
         *
         */
        constructor() {
            super("Account");
        }
        public GetViewPath(): string {
            return this.VIEW_PATH;
        }
        public Get(route: string): Router {
           return this.ROUTER.get(route, (req, res) => {
             res.send("Response from Account Controller");
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
export const accountController = new AccountController();
}
