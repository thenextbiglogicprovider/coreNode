"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-namespace
var AppEnums;
(function (AppEnums) {
    let LogType;
    (function (LogType) {
        LogType[LogType["Info"] = 0] = "Info";
        LogType[LogType["Error"] = 1] = "Error";
        LogType[LogType["Message"] = 2] = "Message";
        LogType[LogType["Object"] = 3] = "Object";
    })(LogType = AppEnums.LogType || (AppEnums.LogType = {}));
})(AppEnums = exports.AppEnums || (exports.AppEnums = {}));
