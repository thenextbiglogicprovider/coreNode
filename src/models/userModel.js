"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseModel_1 = require("./baseModel");
// tslint:disable-next-line:no-namespace
var UserModule;
(function (UserModule) {
    class UserModel extends baseModel_1.BaseModel {
        get FirstName() {
            return this.firstName;
        }
        set FirstName(v) {
            this.firstName = v;
        }
        get LastName() {
            return this.lastName;
        }
        set LastName(v) {
            this.lastName = v;
        }
        get UserName() {
            return this.userName;
        }
        set UserName(v) {
            this.userName = v;
        }
        get Email() {
            return this.email;
        }
        set Email(v) {
            this.email = v;
        }
        get Password() {
            return this.password;
        }
        set Password(v) {
            this.password = v;
        }
    }
    UserModule.UserModel = UserModel;
    UserModule.userModel = new UserModel();
})(UserModule = exports.UserModule || (exports.UserModule = {}));
