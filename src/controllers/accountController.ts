//import { Request, Response, Router } from "express";
import {
    Router,
} from "express-serve-static-core";
import * as path from "path";
import * as util from "util";
import {
    Utils,
} from "../config/utils";
import {
    UserModule,
} from "../models/userModel";
import * as ControllerModule from "./baseController";
// tslint:disable-next-line:no-namespace
export namespace Controllers {
    export class AccountController extends ControllerModule.Controllers.BaseController {
        private message = "Provide credentials for login";
        private authManager;
        /**
         *
         */
        constructor(manager) {
            super("Account");
            this.authManager = manager;
        }

        public ProcessRequest(): Router {
            this.ROUTER.route("/account");
            this.ROUTER.get("/login", this.Get("/login"));
            this.ROUTER.get("/logout", this.Logout("/logout"));
            this.ROUTER.get("/register", this.Register("/register"));
            this.ROUTER.post("/register", this.Post("/register"));
            this.ROUTER.post("/login", this.Put("/login"));
            return this.ROUTER;
        }
        public GetViewPath(): string {
            return this.VIEW_PATH;
        }
        public Get(route: string): Router {
            return this.ROUTER.get(route, (req, res) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
                if (this.authManager.IsAuthorizationvalid(req)) {
                    res.redirect("/dashboard/");
                } else {
                    res.redirect("../api/authenticate/authorize");
                }
            });
        }
        public Logout(route: string): Router {
            return this.ROUTER.get(route, (req, res) => {
                //this.authManager.Logout(req);
                res.redirect("../api/authenticate/logout");
            });
        }

        public Register(route: string): Router {
            return this.ROUTER.get(route, (req, res) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "register");
                res.render(this.CURRENT_VIEW_PATH, {
                    locals: {
                        title: "Account",
                    },
                });
            });
        }
        /**
         *
         *
         * @param {string} route
         * @returns {Router}
         * @memberof AccountController
         */
        public Put(route: string): Router {
            return this.ROUTER.post(route, (req, res) => {
                const userModel = this.GetUserModel(req);

                if (this.authManager.Login(req, userModel)) {
                    res.redirect("/dashboard/");
                } else {
                    res.redirect("/login");
                }
            });
        }
        public Post(route: string): Router {
            return this.ROUTER.post(route, (req, res) => {
                try {
                    const userModel = this.GetUserModel(req);

                    if (this.authManager.Login(req, userModel)) {
                        res.redirect("/dashboard/");
                    } else {
                        res.redirect("/login");
                    }
                } catch {
                    this.message = "Login Failed.";
                }
            });
        }

        public Delete(route: string): Router {
            throw new Error("Method not implemented.");
        }
        private GetUserModel(req) {
            const userModel = UserModule.userModel;
            userModel.Active = true;
            userModel.CreatedAt = new Date();
            userModel.UpdatedAt = new Date();
            userModel.Email = req.body.email;
            userModel.FirstName = req.body.firstname;
            userModel.LastName = req.body.lastname;
            userModel.Password = req.body.password;
            userModel.SessionId = new Date().toISOString();
            userModel.UserName = req.body.email;
            return userModel;
        }
    }
    //export const accountController = new AccountController();
}
