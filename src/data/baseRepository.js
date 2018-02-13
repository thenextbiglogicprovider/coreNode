"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-namespace
var Repository;
(function (Repository) {
    class BaseRepository {
        constructor() {
            this.list = Array();
            if (!this.instance) {
                this.instance = this;
                this.instance.list = [];
            }
            return this.Instance;
        }
        get Instance() {
            return this.instance;
        }
        Get() {
            return new Array();
        }
        // tslint:disable-next-line:no-namespace
        GetSingle(id) {
            return this.instance.list.find((item) => {
                return item.Id === id;
            });
        }
        Add(entity) {
            this.instance.list.push(entity);
            return entity;
        }
        Update(entity) {
            throw new Error("Method not implemented.");
        }
        // tslint:disable-next-line:no-namespace
        Delete(id) {
            return true;
        }
        Count() {
            return this.instance.list.length;
        }
    }
    Repository.BaseRepository = BaseRepository;
    Repository.baseRepository = new BaseRepository();
})(Repository = exports.Repository || (exports.Repository = {}));
