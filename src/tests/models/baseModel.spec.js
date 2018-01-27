"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {BaseModel} from "../../models/baseModel";
const chai_1 = require("chai");
const baseModel_1 = require("../../models/baseModel");
describe("Validate Base Model", () => {
    it("should return an object of type BaseModel", () => {
        const modelObject = new baseModel_1.BaseModel();
        chai_1.expect(modelObject.Active).to.equal(true);
    });
});
