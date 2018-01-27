"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    get Instance() {
        return this.instance;
    }
    /**
     *
     */
    constructor() {
        if (!this.instance) {
            this.instance = this;
            this.instance.Active = true;
            this.instance.CreatedAt = new Date();
            this.instance.Deleted = false;
            this.instance.UpdatedAt = new Date();
        }
        return this.Instance;
    }
}
exports.BaseModel = BaseModel;
