"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const ControllerModule = require("./baseController");
// tslint:disable-next-line:no-namespace
var Controllers;
(function (Controllers) {
    class AccountController extends ControllerModule.Controllers.BaseController {
        /**
         *
         */
        constructor(manager) {
            super("Account");
            this.message = "Provide credentials for login";
            this.authManager = manager;
        }
        ProcessRequest() {
            this.ROUTER.route("/account");
            this.ROUTER.get("/login", this.Get("/login"));
            this.ROUTER.get("/logout", this.Logout("/logout"));
            this.ROUTER.get("/register", this.Register("/register"));
            this.ROUTER.post("/register", this.Post("/register"));
            this.ROUTER.post("/login", this.Put("/login"));
            return this.ROUTER;
        }
        GetViewPath() {
            return this.VIEW_PATH;
        }
        Get(route) {
            return this.ROUTER.get(route, (req, res) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
                if (this.authManager.IsAuthorizationvalid(req)) {
                    res.redirect("/dashboard/");
                }
                else {
                    // res.render(this.CURRENT_VIEW_PATH, {
                    //     locals: {
                    //         title: this.NAME,
                    //         message: this.message,
                    //     },
                    // });
                    res.redirect("../api/authenticate/authorize");
                }
            });
        }
        Logout(route) {
            return this.ROUTER.get(route, (req, res) => {
                //this.authManager.Logout(req);
                res.redirect("../api/authenticate/logout");
            });
        }
        Register(route) {
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
        Put(route) {
            return this.ROUTER.post(route, (req, res) => {
                const userModel = this.GetUserModel(req);
                if (this.authManager.Login(req, userModel)) {
                    res.redirect("/dashboard/");
                }
                else {
                    res.redirect("/login");
                }
            });
        }
        Post(route) {
            return this.ROUTER.post(route, (req, res) => {
                try {
                    const userModel = this.GetUserModel(req);
                    if (this.authManager.Login(req, userModel)) {
                        res.redirect("/dashboard/");
                    }
                    else {
                        res.redirect("/login");
                    }
                }
                catch (_a) {
                    this.message = "Login Failed.";
                }
            });
        }
        Delete(route) {
            throw new Error("Method not implemented.");
        }
        GetUserModel(req) {
            const userModel = userModel_1.UserModule.userModel;
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
    Controllers.AccountController = AccountController;
    //export const accountController = new AccountController();
})(Controllers = exports.Controllers || (exports.Controllers = {}));
