"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerModule = require("./baseController");
// tslint:disable-next-line:no-namespace
var Controllers;
(function (Controllers) {
    class AccountController extends ControllerModule.Controllers.BaseController {
        /**
         *
         */
        constructor() {
            super("Account");
        }
        ProcessRequest() {
            this.ROUTER.route("/account");
            this.ROUTER.get("/login", this.Get("/login"));
            this.ROUTER.get("/logout", this.Logout("/logout"));
            this.ROUTER.get("/register", this.Register("/register"));
            this.ROUTER.post("/register", this.Post("/register"));
            return this.ROUTER;
        }
        GetViewPath() {
            return this.VIEW_PATH;
        }
        Get(route) {
            return this.ROUTER.get(route, (req, res) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
                if (req.session && req.session.user) {
                    res.send(req.session);
                }
                else {
                    res.render(this.CURRENT_VIEW_PATH, { locals: { title: "Account" } });
                }
            });
        }
        Logout(route) {
            return this.ROUTER.get(route, (req, res) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "index");
                if (req.session) {
                    req.session = null;
                }
                res.redirect("/account/login");
            });
        }
        Register(route) {
            return this.ROUTER.get(route, (req, res) => {
                this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "register");
                res.render(this.CURRENT_VIEW_PATH, { locals: { title: "Account" } });
            });
        }
        Put(route) {
            throw new Error("Method not implemented.");
        }
        Post(route) {
            return this.ROUTER.post(route, (req, res) => {
                //this.CURRENT_VIEW_PATH = this.VIEW_PATH.replace("{1}", "register");
                //res.render(this.CURRENT_VIEW_PATH, {locals: { title: "Account"}});
                req.session.user = req.body;
                // tslint:disable-next-line:no-console
                res.send(req.session);
            });
        }
        Delete(route) {
            throw new Error("Method not implemented.");
        }
    }
    Controllers.AccountController = AccountController;
    Controllers.accountController = new AccountController();
})(Controllers = exports.Controllers || (exports.Controllers = {}));
