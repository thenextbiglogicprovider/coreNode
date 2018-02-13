"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sessionManagerModules = require("./sessionManager");
// tslint:disable-next-line:no-namespace
var Mannagers;
(function (Mannagers) {
    const sessionManager = sessionManagerModules.sessionManager;
    class AuthManager {
        /**
         *
         */
        constructor(app) {
            sessionManager.ConfigureSession(app);
        }
        /**
         * AuthenticateUser
         */
        AuthenticateUser(next, req, res) {
            if (!this.IsAuthorizationvalid(req)) {
                res.redirect("/account/login");
            }
            else {
                next();
            }
        }
        /**
         * Login
         */
        Login(req, user) {
            let status = false;
            if (!user) {
                throw new Error("Login Failed. Null User data received");
            }
            else {
                user.Password = null;
                user.SessionId = user.CreatedAt.toString();
                user.LastLogin = new Date();
                sessionManager.Set(req, "user", user);
                req.session.userData = {
                    authenticated: true,
                    name: user.FirstName + " " + user.LastName,
                    username: user.UserName,
                    toke: user.SessionId,
                    user_id: user.Id,
                };
                status = true;
            }
            return status;
        }
        /**
         * Logout
         */
        Logout(req) {
            sessionManager.Reset(req);
        }
        /**
         * IsAuthorizationvalid
         */
        IsAuthorizationvalid(req) {
            return sessionManager.IsSessionValid(req);
        }
    }
    Mannagers.AuthManager = AuthManager;
})(Mannagers = exports.Mannagers || (exports.Mannagers = {}));
