import {
    Request,
    Response,
    Router,
} from "express";
import * as path from "path";
import { Utils } from "../config/utils";
import {
    IAppController,
} from "./iAppController";
// tslint:disable-next-line:no-namespace
export namespace Controllers {
    export abstract class BaseController implements IAppController {
        private name: string;
        public get NAME(): string {
            return this.name;
        }
        private router: Router;
        public get ROUTER(): Router {
            return this.router;
        }
        private viewPath: string;
        public get VIEW_PATH(): string {
            return this.viewPath;
        }
        private currentViewPath: string;
        public get CURRENT_VIEW_PATH(): string {
            return this.currentViewPath;
        }
        public set CURRENT_VIEW_PATH(v: string) {
             this.currentViewPath = v;
        }
        private currentRoute: string;
        public get CURRENT_ROUTE(): string {
            return this.currentRoute;
        }
        private currentRequest: Request;
        public get CURRENT_REQUEST(): Request {
            return this.currentRequest;
        }

        /**
         *
         */
        constructor(name: string, viewPath?: string) {
            this.name = name;
            this.viewPath = viewPath
            || path.join(__dirname, Utils.Constants.VIEW_PATH.replace("{0}", name.toLowerCase()));
            this.router = Router();
            return this;
        }
        public abstract GetViewPath(): string;
        public abstract Get(route: string): Router ;
        public abstract Put(route: string): Router ;
        public abstract Post(route: string): Router ;
        public abstract Delete(route: string): Router ;
    }
}
