import { BaseModel } from "./baseModel";

// tslint:disable-next-line:no-namespace
export namespace UserModule {
export class UserModel extends BaseModel {

private firstName: string;
public get FirstName(): string {
    return this.firstName;
}
public set FirstName(v: string) {
    this.firstName = v;
}

private lastName: string;
public get LastName(): string {
    return this.lastName;
}
public set LastName(v: string) {
    this.lastName = v;
}

private userName: string;
public get UserName(): string {
    return this.userName;
}
public set UserName(v: string) {
    this.userName = v;
}

private email: string;
public get Email(): string {
    return this.email;
}
public set Email(v: string) {
    this.email = v;
}

private password: string;
public get Password(): string {
    return this.password;
}
public set Password(v: string) {
    this.password = v;
}

}
export const userModel = new UserModel();
}
