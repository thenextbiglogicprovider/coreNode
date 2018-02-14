import {
    Router,
} from "express-serve-static-core";
import * as path from "path";
import * as util from "util";
import { authConfig } from "../config/auth.config";
import * as authManagerModule from "../config/authManager";
import {
    clientConfig,
} from "../config/clientConfig";
import {
    Utils,
} from "../config/utils";
import {
    UserModule,
} from "../models/userModel";
import * as ControllerModule from "./baseController";
// tslint:disable-next-line:no-namespace
export namespace ApiControllers {
    const controllerModule = ControllerModule.Controllers;
    const appConstants = Utils.Constants;
    const authPassport = require("passport");
    export class AuthenticationApiController extends controllerModule.BaseController {
        private message = "Provide credentials for login";
        private authManager: authManagerModule.Mannagers.AuthManager;
        private passport;
        /**
         *
         */
        constructor(manager: authManagerModule.Mannagers.AuthManager, passport) {
            super("Authentication");
            this.authManager = manager;
            this.passport = passport;
        }
        public ProcessRequest(): Router {
            this.ROUTER.route("/api/authenticate");
            this.ROUTER.post("/", this.Post("/"));
            this.ROUTER.post("/login", this.Post("/login"));
            this.ROUTER.get("/logout", this.Logout("/logout"));
            this.ROUTER.get("/callback", this.Put("/callback"));
            return this.ROUTER;
        }
        public GetViewPath(): string {
            throw new Error("Method not implemented.");
        }
        public Get(route: string): Router {
            return this.ROUTER.post(route, (req, res) => {
                const userModel = this.GetUserModel(req);
                // tslint:disable-next-line:no-console
                console.log(req.body);
                if (this.authManager.Login(req, userModel)) {
                    res.redirect("/dashboard/");
                } else {
                    res.redirect("/login");
                }
            });
        }
        public Put(route: string): Router {
            return this.ROUTER.get(route, this.passport.authenticate("openidconnect", {}), (req, res) => {
                const userModel = this.GetUserModel(req.user);
                if (this.authManager.Login(req, userModel)) {
                    res.redirect("/dashboard/");
                } else {
                    res.redirect("/logout");
                }
            });
        }
        public Post(route: string): Router {
            return this.ROUTER.post(route, (req, res) => {
                // tslint:disable-next-line:no-console
                console.log(req.body);
                if (req.body && (!req.body.returnurl || !req.body.client_id || !req.body.callback_url)) {
                    res.json({
                        status: 404,
                        message: "404- bad request",
                        success: false,
                    });
                } else {
                    res.json({
                        status: 301,
                        returnUrl: req.protocol + "://" + req.get("host") + "/account/login",
                        success: true,
                    });
                }
            });
        }
        public Delete(route: string): Router {
            throw new Error("Method not implemented.");
        }
        public Logout(route: string): Router {
            return this.ROUTER.get(route, (req, res) => {
                 // tslint:disable-next-line:no-console
                 console.log(req.session.userData);
                 let token = req.session.userData;
                 if (token) {
                    token = token.token;
                }
                 req.logout();
                 this.authManager.Logout(req);
                 const uri = appConstants.IDENTITY_SERVER_URL +
                    // tslint:disable-next-line:max-line-length
                    "/connect/endsession?id_token=token&id_token_hint=" + token + "&clientId=" + authConfig.authconfig.clientID + "&post_logout_redirect_uri=http://localhost:3000";
                 res.redirect(uri);
            });
        }
        private GetUserModel(req) {
            const userModel = UserModule.userModel;
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
}
