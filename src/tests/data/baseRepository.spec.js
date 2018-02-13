"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const appRepo = require("../../data/baseRepository");
const userModel_1 = require("../../models/userModel");
describe("Validate Base Repository", () => {
    const repository = new appRepo.Repository.BaseRepository();
    it("should return a base repository object", () => {
        chai_1.expect(repository.Delete(1)).to.equal(true);
    });
    it("should return a base repository object count", () => {
        chai_1.expect(repository.Count()).to.equal(0);
    });
    it("should add a user object to repository", () => {
        const userModel = new userModel_1.UserModule.UserModel();
        userModel.Id = 1;
        chai_1.expect(repository.Add(userModel)).to.equal(userModel);
    });
    it("should return a base repository object count of 1", () => {
        chai_1.expect(repository.Count()).to.equal(1);
    });
});
