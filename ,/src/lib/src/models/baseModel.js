"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    get Instance() {
        return this._instance;
    }
    set Instance(v) {
        this._instance = v;
    }
    get Entity() {
        return this._entity;
    }
    set Entity(v) {
        this._entity = v;
    }
    /**
     *
     */
    constructor() {
        if (!this._entity) {
            this._entity.Active = true;
            this._entity.CreatedAt = new Date();
            this._entity.Deleted = false;
            this._entity.UpdatedAt = new Date();
        }
        this._instance._entity = this._entity;
        return this.Instance;
    }
}
exports.BaseModel = BaseModel;
