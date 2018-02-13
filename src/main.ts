import * as fs from "fs";
import * as path from "path";
import * as AppServer from "../dist/scripts/server";
import {
    Utils,
} from "../src/config/utils";
import * as authManagerModule from "./config/authManager";
import * as accountControllerModule from "./controllers/accountController";
import * as authenticationApiControllerModule from "./controllers/authenticationApiController";
import * as dashboardControllerModule from "./controllers/dashboardController";
import * as errorControllerModule from "./controllers/errorController";
import * as homeControllerModule from "./controllers/homeController";
const authPassport = require("passport");
const appServer = new AppServer.Server(3000, false, authPassport);
const bodyParser = require("body-parser");
const homeController = homeControllerModule.Controllers.homeController;
const authManager = new authManagerModule.Mannagers.AuthManager(appServer.app);
const accountController = new accountControllerModule.Controllers.AccountController(authManager);
const errorController = errorControllerModule.Controllers.errorController;
const dashboardController = dashboardControllerModule.Controllers.dashboardController;
// tslint:disable-next-line:max-line-length
const authenticationApiController = new authenticationApiControllerModule.ApiControllers.AuthenticationApiController(authManager, authPassport);
const cors = require("cors");
appServer.app.use(homeController.ProcessRequest());
appServer.app.use("/account", accountController.ProcessRequest());
appServer.app.use("/error", errorController.ProcessRequest());
appServer.app.use("/dashboard", (req, res, next) => {
    authManager.AuthenticateUser(next, req, res);
}, dashboardController.ProcessRequest());
appServer.app.use("/api/authenticate", cors(), authenticationApiController.ProcessRequest());
appServer.app.get("/testResults", (req, res) => {
    res.redirect("http://127.0.0.1:5500" + "/TestResults/mochawesome.html");
});
