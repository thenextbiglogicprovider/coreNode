import { Request } from "express";
import * as util from "util";
import * as userModule from "../models/userModel";
// tslint:disable-next-line:no-namespace
export namespace Mannagers {
    //const sessionManager = sessionManagerModules;
    export class AuthManager  {
        private sessionManager;
        /**
         *
         */
        constructor(sessionManager) {
           this.sessionManager = sessionManager;
        }
        /**
         * AuthenticateUser
         */
        public AuthenticateUser(next, req, res) {
            if (!this.IsAuthorizationvalid(req)) {
                res.redirect("/account/login");
            } else {
                next();
            }
        }
        /**
         * Login
         */
        public Login(req, user: userModule.UserModule.UserModel): boolean {
            let status = false;
            if (!user) {
                throw new Error("Login Failed. Null User data received");
            } else {
                user.Password = null;
                //user.SessionId = user.CreatedAt.toString();
                user.LastLogin = new Date();
                this.sessionManager.Set(req, "userData", {
                    authenticated: true,
                    name : user.FirstName + " " + user.LastName,
                    username: user.UserName,
                    token: user.SessionId,
                    user_id: user.Id,
                });
                status = true;
            }
            // tslint:disable-next-line:no-console
            console.log("User Data: -" + util.inspect(req.session.userData));
            return status;
        }

        /**
         * Logout
         */
        public Logout(req: Request) {
            this.sessionManager.Reset(req);
             // tslint:disable-next-line:no-console
            console.log("User Data: -" + util.inspect(req.session));
        }

        /**
         * IsAuthorizationvalid
         */
        public IsAuthorizationvalid(req: Request) {
            return this.sessionManager.IsSessionValid(req);
        }

        /**
         * SetCurrentClient
         */
        public SetCurrentClient(req: Request) {
            req.currentClient = {
                sessionId: req.sessionId,
                clientId: req.body.client_id,
                returnUrl: req.body.returnurl,
                callbackUrl: req.body.callback_url,
                };
            // tslint:disable-next-line:no-console
            console.log("Setting up current client." + util.inspect(req.currentClient));
            //this.sessionManager.Set(req, "currentClient", req.currentClient );
        }

        /**
         * GetCurrentClient
         */
        public GetCurrentClient(req: Request) {
           return this.sessionManager.Get(req, "currentClient");
        }

        /**
         * name
         */
        public SaveSession(req: Request) {
            this.sessionManager.Save();
        }
    }
}
