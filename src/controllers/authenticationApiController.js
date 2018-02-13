"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../config/utils");
const userModel_1 = require("../models/userModel");
const ControllerModule = require("./baseController");
// tslint:disable-next-line:no-namespace
var ApiControllers;
(function (ApiControllers) {
    const controllerModule = ControllerModule.Controllers;
    const appConstants = utils_1.Utils.Constants;
    const authPassport = require("passport");
    class AuthenticationApiController extends controllerModule.BaseController {
        /**
         *
         */
        constructor(manager, passport) {
            super("Authentication");
            this.message = "Provide credentials for login";
            this.authManager = manager;
            this.passport = passport;
        }
        ProcessRequest() {
            this.ROUTER.route("/api/authenticate");
            this.ROUTER.post("/", this.Post("/"));
            this.ROUTER.post("/login", this.Post("/login"));
            this.ROUTER.get("/logout", this.Logout("/logout"));
            this.ROUTER.get("/callback", this.Put("/callback"));
            return this.ROUTER;
        }
        GetViewPath() {
            throw new Error("Method not implemented.");
        }
        Get(route) {
            return this.ROUTER.post(route, (req, res) => {
                const userModel = this.GetUserModel(req);
                // tslint:disable-next-line:no-console
                console.log(req.body);
                if (this.authManager.Login(req, userModel)) {
                    res.redirect("/dashboard/");
                }
                else {
                    res.redirect("/login");
                }
            });
        }
        Put(route) {
            return this.ROUTER.get(route, this.passport.authenticate("openidconnect", {}), (req, res) => {
                // tslint:disable-next-line:no-console
                console.log(req.user);
                const userModel = this.GetUserModel(req.user);
                if (this.authManager.Login(req, userModel)) {
                    res.redirect("/dashboard/");
                }
                else {
                    res.redirect("/logout");
                }
            });
        }
        Post(route) {
            return this.ROUTER.post(route, (req, res) => {
                // tslint:disable-next-line:no-console
                console.log(req.body);
                if (req.body && (!req.body.returnurl || !req.body.client_id || !req.body.callback_url)) {
                    res.json({ status: 404, message: "404- bad request", success: false });
                }
                else {
                    res.json({ status: 301,
                        returnUrl: req.protocol + "://" + req.get("host") + "/account/login",
                        success: true });
                }
            });
        }
        Delete(route) {
            throw new Error("Method not implemented.");
        }
        Logout(route) {
            return this.ROUTER.get(route, (req, res) => {
                // tslint:disable-next-line:no-console
                console.log(req.user);
                // tslint:disable-next-line:no-console
                console.log(req.session.userData);
                let token = req.user;
                if (token) {
                    token = token.token;
                }
                req.logout();
                this.authManager.Logout(req);
                const uri = appConstants.IDENTITY_SERVER_URL +
                    // tslint:disable-next-line:max-line-length
                    "/connect/endsession?id_token=token&post_logout_redirect_uri=https://localhost:3000";
                res.redirect(uri);
            });
        }
        GetUserModel(req) {
            const userModel = userModel_1.UserModule.userModel;
            userModel.Active = true;
            userModel.CreatedAt = new Date();
            userModel.UpdatedAt = new Date();
            userModel.Email = req.email;
            userModel.FirstName = req.name.givenName;
            userModel.LastName = req.name.familyName;
            //userModel.Password = req.body.password;
            userModel.SessionId = req.token;
            userModel.Id = req.sid;
            userModel.UserName = req.email;
            return userModel;
        }
    }
    ApiControllers.AuthenticationApiController = AuthenticationApiController;
})(ApiControllers = exports.ApiControllers || (exports.ApiControllers = {}));
