"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const server_1 = require("../dist/scripts/server");
const accountControllerModule = require("./controllers/accountController");
const homeControllerModule = require("./controllers/homeController");
const appServer = server_1.AppServer;
const homeController = homeControllerModule.Controllers.homeController;
const accountController = accountControllerModule.Controllers.accountController;
appServer.app.use(homeController.ProcessRequest());
appServer.app.use("/account", accountController.ProcessRequest());
appServer.app.get("/testResults", (req, res) => {
    const reportFile = fs.readFile(path.join(__dirname, "../TestResults/mochawesome.html"), (err, resp) => {
        if (err) {
            res.write(404);
        }
        else {
            res.writeHead(200, {
                "Content-Type": "text/html",
            });
            res.write(resp);
        }
    });
});
