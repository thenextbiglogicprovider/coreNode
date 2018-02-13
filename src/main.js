"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppServer = require("../dist/scripts/server");
const authManagerModule = require("./config/authManager");
const accountControllerModule = require("./controllers/accountController");
const authenticationApiControllerModule = require("./controllers/authenticationApiController");
const dashboardControllerModule = require("./controllers/dashboardController");
const errorControllerModule = require("./controllers/errorController");
const homeControllerModule = require("./controllers/homeController");
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
