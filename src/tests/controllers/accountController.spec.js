"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const accountControllerModule = require("../../controllers/accountController");
describe("Validate Controller Module", () => {
    const controller = accountControllerModule.Controllers.accountController;
    it("Account Controller to be initialized", () => {
        chai_1.expect(controller.NAME).to.equal("Account");
    });
    it("Account Controller should respond to get call", () => {
        chai_1.expect(controller.Get("/account")).to.not.equal("Response from Account Controller");
    });
    it("Account Controller should return it's view path", () => {
        chai_1.expect(controller.GetViewPath()).to.contain(controller.NAME.toLowerCase());
    });
});
