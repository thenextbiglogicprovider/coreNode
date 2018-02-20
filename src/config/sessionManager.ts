import {
    Request,
} from "express";

import * as util from "util";
//import * as session from "client-sessions";
///const session = require("express-session");
export class SessionManager {

    private session;
    public get Session(): object {
        return this.session;
    }

    /**
     * ConfigureSession
     */
    // tslint:disable-next-line:no-any
    public ConfigureSession(app: any, appSession) {
        // tslint:disable-next-line:no-console
        console.log("New Session Configured");
        app.use(appSession({
            name: "Session_Cookie",
            secret: "abc*try",
            resave: true,
            saveUninitialized: true,
        }));
        this.session = appSession;
        //app.use(appSession);
    }

    /**
     * Save
     */
    public Save(req: Request) {
        req.session.save();
    }

    /**
     * Get
     */
    public Get(req: Request, key: string) {
        return req.session[key];
    }

    /**
     * Set
     */
    public Set(req: Request, key: string, data: object) {
        req.session[key] = data;
        req.session.save();
    }

    /**
     * Reset
     */
    public Reset(req: Request) {
        req.session.destroy();
    }

    /**
     * IsSessionValid
     */
    public IsSessionValid(req: Request): boolean {
        return req.session && req.session.userData && req.session.userData.authenticated;
    }
}

//export const sessionManager = new SessionManager();
