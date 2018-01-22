import {AppServer} from "../dist/scripts/server";
import { HomeController } from "./controllers/homeController";

const appServer=AppServer;

appServer.app.get('/',HomeController.Get());
