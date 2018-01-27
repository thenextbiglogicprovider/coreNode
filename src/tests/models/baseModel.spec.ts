//import {BaseModel} from "../../models/baseModel";
import {expect} from "chai";
import { BaseModel } from "../../models/baseModel";

describe("Validate Base Model", () => {
    it("should return an object of type BaseModel", () => {
        const modelObject = new BaseModel();
        expect(modelObject.Active).to.equal(true);
    });
});
