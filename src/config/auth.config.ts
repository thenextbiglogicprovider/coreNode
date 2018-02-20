import {
    Utils,
} from "./utils";
const appConstants = Utils.Constants;
const AuthConfig = {
    authorizationURL: appConstants.IDENTITY_SERVER_URL + "/connect/authorize",
    tokenURL: appConstants.IDENTITY_SERVER_URL + "/connect/token",
    userInfoURL: appConstants.IDENTITY_SERVER_URL + "/connect/userinfo",
    clientID: "node_js_api",
    clientSecret: "maestro",
    callbackURL: "/api/authenticate/callback",
    issuer: appConstants.TOKEN_ISSUER_URL,
    grant_type: "refresh_token",
    scope: "profile",
};
module.exports.configure = function configure(app, passport) {
    app.get("/api/authenticate/authorize", passport.authenticate("openidconnect", {}));
    app.post("/api/authenticate/authorize", passport.authenticate("openidconnect", {}),
        (req, res) => {
            // tslint:disable-next-line:no-console
            console.log("from passport auth method");
            if (!req.user) {
                throw new Error("user null");
            }
        });
    //     app.get("/api/authenticate/callback", passport.authenticate("openidconnect", {}),
    //    (req, res) => {
    //        // tslint:disable-next-line:no-console
    //        console.log("from passport auth method");
    //        if (!req.user) {
    //           throw new Error("user null");
    //       }
    //         // tslint:disable-next-line:no-console
    //        console.log(req.user);
    //        res.send(req.user);
    //   });

};

export const authConfig = {
    authconfig: AuthConfig,
    config: this.configure,
};
