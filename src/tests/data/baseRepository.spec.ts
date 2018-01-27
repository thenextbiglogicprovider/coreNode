import { expect } from "chai";
import * as appRepo from "../../data/baseRepository";
import { UserModule } from "../../models/userModel";
describe("Validate Base Repository", () => {
const repository = new appRepo.Repository.BaseRepository<UserModule.UserModel>();
it("should return a base repository object", () => {
expect(repository.Delete(1)).to.equal(true);
 });
it("should return a base repository object count", () => {
    expect(repository.Count()).to.equal(0);
     });

it("should add a user object to repository", () => {
        const userModel = new UserModule.UserModel();
        userModel.Id = 1;
        expect(repository.Add(userModel)).to.equal(userModel);
         });

it("should return a base repository object count of 1", () => {
            expect(repository.Count()).to.equal(1);
             });
});
