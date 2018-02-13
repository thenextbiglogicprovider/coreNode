import { Utils} from "./utils";
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

const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

module.exports.configure = function configure(app, passport) {
    app.use(session({
            secret: "bleargh",
            resave: false,
            saveUninitialized: false,
            secure: true,
            store: new RedisStore({
                host: "127.0.0.1",
                port: 6379,
            }),
        },
    ));

    app.get("/api/authenticate/authorize", passport.authenticate("openidconnect", {}));
    app.post("/api/authenticate/authorize", passport.authenticate("openidconnect", {}),
    (req, res) => {
        // tslint:disable-next-line:no-console
        console.log("from passport auth method");
        if (!req.user) {
           throw new Error("user null");
       }
         // tslint:disable-next-line:no-console
        console.log(req.user);
        res.send(req.user);
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

export const authConfig = { authconfig: AuthConfig, config: this.configure};
