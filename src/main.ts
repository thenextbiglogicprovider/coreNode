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
const homeController = homeControllerModule.Controllers.homeController;
const accountController = accountControllerModule.Controllers.accountController;
appServer.app.get("/", homeController.Get("/"));
appServer.app.get("/about", homeController.About("/about"));
appServer.app.get("/account", accountController.Get("/account/login"));
appServer.app.get("/account/register", accountController.Register("/account/register"));
appServer.app.post("/account/register", accountController.Post("/account/register"));
appServer.app.get("/account/login", accountController.Get("/account/login"));
appServer.app.get("/testResults", (req, res) => {
    const reportFile = fs.readFile(path.join(__dirname, "../TestResults/mochawesome.html"), (err, resp) => {
        if (err) {
            res.write(404);
        } else {
            res.writeHead(200, {
                "Content-Type": "text/html",
            });
            res.write(resp);
        }
    });
});
