import { expect } from "chai";
import { Utils } from "../../config/utils";
import * as homeControllerModule from "../../controllers/homeController";

describe("Validate Controller Module", () => {
const controller = homeControllerModule.Controllers.homeController;
it("Home Controller to be initialized", () => {
 expect(controller.NAME).to.equal("Home");
});
it("Home Controller should return it's view path", () => {
    expect(controller.GetViewPath()).to.contain(controller.NAME.toLowerCase());
   });
});
