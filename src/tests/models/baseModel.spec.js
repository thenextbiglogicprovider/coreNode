"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {BaseModel} from "../../models/baseModel";
const chai_1 = require("chai");
const Utils = require("../../config/utils");
const baseModel_1 = require("../../models/baseModel");
const enums_1 = require("../../models/enums");
const LoggerModel_1 = require("../../models/LoggerModel");
const appLogger = new Utils.Logger(new LoggerModel_1.LoggerModel());
describe("Validate Base Model", () => {
    it("should return an object of type BaseModel", () => {
        const modelObject = new baseModel_1.BaseModel();
        // tslint:disable-next-line:no-console
        appLogger.Log(JSON.stringify(modelObject), enums_1.AppEnums.LogType.Object);
        chai_1.expect(modelObject.Active).to.equal(true);
    });
});
