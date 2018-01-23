"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../dist/scripts/server");
const homeController_1 = require("./controllers/homeController");
const appServer = server_1.AppServer;
appServer.app.get('/', homeController_1.HomeController.Get());
