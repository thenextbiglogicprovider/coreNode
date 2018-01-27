"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerModule = require("./baseController");
// tslint:disable-next-line:no-namespace
var Controllers;
(function (Controllers) {
    class AccountController extends ControllerModule.Controllers.BaseController {
        /**
         *
         */
        constructor() {
            super("Account");
        }
        GetViewPath() {
            return this.VIEW_PATH;
        }
        Get(route) {
            return this.ROUTER.get(route, (req, res) => {
                res.send("Response from Account Controller");
            });
        }
        Put(route) {
            throw new Error("Method not implemented.");
        }
        Post(route) {
            throw new Error("Method not implemented.");
        }
        Delete(route) {
            throw new Error("Method not implemented.");
        }
    }
    Controllers.AccountController = AccountController;
    Controllers.accountController = new AccountController();
})(Controllers = exports.Controllers || (exports.Controllers = {}));
