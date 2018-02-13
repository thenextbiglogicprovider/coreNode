"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const homeControllerModule = require("../../controllers/homeController");
describe("Validate Controller Module", () => {
    const controller = homeControllerModule.Controllers.homeController;
    it("Home Controller to be initialized", () => {
        chai_1.expect(controller.NAME).to.equal("Home");
    });
    it("Home Controller should return it's view path", () => {
        chai_1.expect(controller.GetViewPath()).to.contain(controller.NAME.toLowerCase());
    });
});
