import { expect } from "chai";
import { Utils } from "../../config/utils";
import * as accountControllerModule from "../../controllers/accountController";

describe("Validate Controller Module", () => {
    const controller = new accountControllerModule.Controllers.AccountController(null);
    it("Account Controller to be initialized", () => {
 expect(controller.NAME).to.equal("Account");
});
    it("Account Controller should respond to get call", () => {
    expect(controller.Get("/account")).to.not.equal("Response from Account Controller");
   });

    it("Account Controller should return it's view path", () => {
    expect(controller.GetViewPath()).to.contain(controller.NAME.toLowerCase());
   });
});
