"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chalk = require("chalk");
const Constants = {
    APP_PATH: "/",
    VIEW_ROOT: "../views/",
    VIEW_PATH: "../views/{0}/{1}.ejs",
    LAYOUT_PATH: {
        HEADER: "../views/shared/_header.ejs",
        FOOTER: "../views/shared/_footer.ejs",
        LAYOUT: "../views/shared/_layout.ejs",
    },
    VIEW_ENGINE: "ejs",
    TEST_REPORT_PATH: "../../TestResults/mochawesome.html",
};
const log = console.log;
const chalk = Chalk.default;
const level = 3 /* TrueColor */;
class Logger {
    /**
     *
     */
    constructor(model) {
        this.instance = model;
    }
    get Instance() {
        return this.instance;
    }
    set Instance(v) {
        this.instance = v;
    }
    /**
     * name
     */
    // tslint:disable-next-line:no-empty
    Log(message, type) {
        const messageFormat = `[${message}, UTC Date-Time:${new Date().toUTCString()}]`;
        log(chalk.bold(chalk.yellow(`System Log:${messageFormat}`)));
        log(chalk.yellow(`message:${message}, type:${type}`));
        switch (type) {
            case 0:
                log(chalk.blue(message));
                break;
            case 1:
                log(chalk.red(message));
                break;
            case 2:
                log(chalk.green(message));
                break;
            case 3:
                log(message);
                break;
            default:
                log(chalk.whiteBright("Undefined"));
                break;
        }
    }
}
exports.Logger = Logger;
exports.Utils = {
    Constants,
    Logger,
};
