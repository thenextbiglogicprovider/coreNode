//import { Request, Response, Router } from "express";
import { Router } from "express-serve-static-core";
import * as path from "path";
import * as util from "util";
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
        public ProcessRequest(): Router {
            this.ROUTER.route("/account");
            this.ROUTER.get("/login", this.Get("/login"));
            this.ROUTER.get("/logout", this.Logout("/logout"));
            this.ROUTER.get("/register", this.Register("/register"));
            this.ROUTER.post("/register", this.Post("/register"));
            return this.ROUTER;
        }
        public GetViewPath(): string {
            return this.VIEW_PATH;
        }
        public Get(route: string): Router {
           return this.ROUTER.get(route, (req, res) => {
            this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
            if (req.session && req.session.user) {
            res.send(req.session);
            } else {
            res.render(this.CURRENT_VIEW_PATH, {locals: { title: "Account"}});
            }
            });
        }
        public Logout(route: string): Router {
            return this.ROUTER.get(route, (req, res) => {
             this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
             if (req.session) {
                req.session = null;
             }
             res.redirect("/account/login");
             });
         }

        public Register(route: string): Router {
            return this.ROUTER.get(route, (req, res) => {
             this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "register");
             res.render(this.CURRENT_VIEW_PATH, {locals: { title: "Account"}});
             });
         }
        public Put(route: string): Router {
            throw new Error("Method not implemented.");
        }
        public Post(route: string): Router {
            return this.ROUTER.post(route, (req, res) => {
                //this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "register");
                //res.render(this.CURRENT_VIEW_PATH, {locals: { title: "Account"}});
                req.session.user = req.body;
                // tslint:disable-next-line:no-console
                res.send(req.session);
                });
        }
        public Delete(route: string): Router {
            throw new Error("Method not implemented.");
        }
    }
export const accountController = new AccountController();
}
