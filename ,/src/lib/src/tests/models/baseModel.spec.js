"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {BaseModel} from "../../models/baseModel";
const chai_1 = require("chai");
console.log('Executing tests');
describe('Hello from test', () => {
    it('should return an object of type IBaseModel', () => {
        const modelObject = 'Hello';
        chai_1.expect(modelObject).to.equal('Hello');
    });
});
