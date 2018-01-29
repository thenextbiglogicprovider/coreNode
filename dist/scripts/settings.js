"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * name
     */
    AppSettings: {
        params: {
            port: 8181,
            host: "127.0.0.1",
            root: "/",
            open: true,
            ignore: "scss,my/templates",
            file: "index.html",
            wait: 1000,
            mount: [["/src", "./node_modules"]],
            logLevel: 2,
            middleware: [(req, res, next) => { next(); }],
        },
    },
};
