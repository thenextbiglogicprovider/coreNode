import MemoryStorage from "memorystorage";
import { InMemoryWebStorage } from "oidc-client";

const MemoryStorage = require("memorystorage");
export default class CustomWebStoreStorage implements InMemoryWebStorage {
    public length?: number;
    private storage = new MemoryStorage("core-node-app");
   /**
    *
    */
   constructor() {
    this.storage = new MemoryStorage("core-node-app");
   }
   public getItem(key: string) {
        return this.storage.getItem(key);
    }
   public setItem(key: string, value: string) {
       this.storage.setItem(key, value);
    }
   public removeItem(key: string) {
        return this.storage.removeItem(key);
    }
   public key(index: number) {
       return this.storage.key(index);
    }
}
