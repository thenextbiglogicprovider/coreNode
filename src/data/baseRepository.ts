import {IRepository} from "./iRepository";
// tslint:disable-next-line:no-namespace
export namespace Repository {
    export class BaseRepository<T> implements IRepository<T> {
      private list = Array <T>();
     private instance: BaseRepository<T>;
     public get Instance(): BaseRepository<T> {
         return this.instance;
     }

      constructor() {
         if (!this.instance) {
             this.instance = this;
             this.instance.list = [];
         }
         return this.Instance;
      }
       public Get(): T[] {
       return new Array();
       }
        // tslint:disable-next-line:no-namespace
       public GetSingle(id?: number): T {
           return  this.instance.list.find((item) => {
                return item.Id === id;
            });
            }
       public Add(entity: T): T {
            this.instance.list.push(entity);
            return entity;
        }
       public Update(entity: T): T {
            throw new Error("Method not implemented.");
        }
        // tslint:disable-next-line:no-namespace
       public Delete(id: number): boolean {
           return true;
       }
       public Count(): number {
        return this.instance.list.length;
    }
    }

    export const baseRepository = new BaseRepository();
}
