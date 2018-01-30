import { Request } from "express";

//import * as session from "client-sessions";
const session = require("cookie-session");
class SessionManager {

    private session = session;
    public get Session(): object {
        return this.session;
    }

    /**
     * ConfigureSession
     */
    // tslint:disable-next-line:no-any
    public ConfigureSession(app: any) {
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
    public Get(req: Request, key: object) {
        return req.session.key;
    }

    /**
     * Set
     */
    public Set(req: Request, key: string, data: object) {
        req.session.key = data;
    }

    /**
     * Reset
     */
    public Reset(req: Request) {
        req.session = null;
    }
}

export const sessionManager = new SessionManager();
