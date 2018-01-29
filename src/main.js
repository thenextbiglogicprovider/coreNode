"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../dist/scripts/server");
const accountControllerModule = require("./controllers/accountController");
const homeControllerModule = require("./controllers/homeController");
const appServer = server_1.AppServer;
const bodyParser = require("body-parser");
const homeController = homeControllerModule.Controllers.homeController;
const accountController = accountControllerModule.Controllers.accountController;
//appServer.app.configure(() => {
appServer.app.use(bodyParser.urlencoded({ extended: true }));
appServer.app.use(bodyParser.json());
//});
appServer.app.use(homeController.ProcessRequest());
appServer.app.use("/account", accountController.ProcessRequest());
// appServer.app.post("/account/register", (req, res) => {
//     // tslint:disable-next-line:no-console
//     console.log("Request received");
//     res.send(req.body);
// });
appServer.app.get("/testResults", (req, res) => {
    res.redirect("http://127.0.0.1:5500" + "/TestResults/mochawesome.html");
});
