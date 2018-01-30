//import {BaseModel} from "../../models/baseModel";
import {expect} from "chai";
import * as Utils from "../../config/utils";
import { BaseModel } from "../../models/baseModel";
import { AppEnums } from "../../models/enums";
import { LoggerModel } from "../../models/LoggerModel";

const appLogger = new Utils.Logger(new LoggerModel());
describe("Validate Base Model", () => {
    it("should return an object of type BaseModel", () => {
        const modelObject = new BaseModel();
        // tslint:disable-next-line:no-console
        appLogger.Log(JSON.stringify(modelObject), AppEnums.LogType.Object);
        expect(modelObject.Active).to.equal(true);
    });
});
