import { Request } from "express";
import * as userModule from "../models/userModel";
import * as sessionManagerModules from "./sessionManager";

// tslint:disable-next-line:no-namespace
export namespace Mannagers {
    const sessionManager = sessionManagerModules.sessionManager;
    export class AuthManager  {
        /**
         *
         */
        constructor(app) {
            sessionManager.ConfigureSession(app);
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
                user.SessionId = user.CreatedAt.toString();
                user.LastLogin = new Date();
                sessionManager.Set(req, "user", user);
                req.session.userData = {
                    authenticated: true,
                    name : user.FirstName + " " + user.LastName,
                    username: user.UserName,
                };
                status = true;
            }
            return status;
        }

        /**
         * Logout
         */
        public Logout(req: Request) {
            sessionManager.Reset(req);
        }

        /**
         * IsAuthorizationvalid
         */
        public IsAuthorizationvalid(req: Request) {
            return sessionManager.IsSessionValid(req);
        }
    }
}
