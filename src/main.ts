import * as fs from "fs";
import * as path from "path";
import {
    AppServer,
} from "../dist/scripts/server";
import {
    Utils,
} from "../src/config/utils";
import * as accountControllerModule from "./controllers/accountController";
import * as homeControllerModule from "./controllers/homeController";
const appServer = AppServer;
const bodyParser = require("body-parser");
const homeController = homeControllerModule.Controllers.homeController;
const accountController = accountControllerModule.Controllers.accountController;

//appServer.app.configure(() => {
// appServer.app.use(bodyParser.urlencoded({ extended: true }));
// appServer.app.use(bodyParser.json());
//   //});
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
