"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryStorage = require("memorystorage");
class CustomWebStoreStorage {
    /**
     *
     */
    constructor() {
        this.storage = new MemoryStorage("core-node-app");
        this.storage = new MemoryStorage("core-node-app");
    }
    getItem(key) {
        return this.storage.getItem(key);
    }
    setItem(key, value) {
        this.storage.setItem(key, value);
    }
    removeItem(key) {
        return this.storage.removeItem(key);
    }
    key(index) {
        return this.storage.key(index);
    }
}
exports.default = CustomWebStoreStorage;
