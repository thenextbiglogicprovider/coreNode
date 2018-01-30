"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    /**
     *
     */
    constructor() {
        //if (!this) {
        this.Active = true;
        this.CreatedAt = new Date();
        this.Deleted = false;
        this.UpdatedAt = new Date();
        //}
        //return this;
    }
}
exports.BaseModel = BaseModel;
