"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseModel_1 = require("./baseModel");
const enums_1 = require("./enums");
class LoggerModel extends baseModel_1.BaseModel {
    get Message() {
        return this.message;
    }
    set Message(v) {
        this.message = v;
    }
    get Type() {
        return this.type;
    }
    set Type(v) {
        this.type = v;
    }
    /**
     *
     */
    constructor() {
        super();
        this.type = enums_1.AppEnums.LogType.Info;
    }
}
exports.LoggerModel = LoggerModel;
exports.loggerModel = new LoggerModel();
