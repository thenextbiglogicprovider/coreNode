"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as session from "client-sessions";
const session = require("cookie-session");
class SessionManager {
    constructor() {
        this.session = session;
    }
    get Session() {
        return this.session;
    }
    /**
     * ConfigureSession
     */
    // tslint:disable-next-line:no-any
    ConfigureSession(app) {
        app.use(this.session({
            name: "Session_Cookie",
            secret: "abc*try",
            maxAge: 30 * 60 * 1000,
            activeDuration: 5 * 60 * 1000,
            httpOnly: true,
        }));
    }
    /**
     * Get
     */
    Get(req, key) {
        return req.session[key];
    }
    /**
     * Set
     */
    Set(req, key, data) {
        req.session[key] = data;
    }
    /**
     * Reset
     */
    Reset(req) {
        req.session = null;
    }
    /**
     * IsSessionValid
     */
    IsSessionValid(req) {
        return req.session && req.session.userData && req.session.userData.authenticated;
    }
}
exports.sessionManager = new SessionManager();
