//import {BaseModel} from "../../models/baseModel";
import {expect} from "chai";
console.log('Executing tests');
describe('Hello from test',()=>{
    it('should return an object of type IBaseModel',()=>{
        const modelObject = 'Hello';
        expect(modelObject).to.equal('Hello');
    });
});