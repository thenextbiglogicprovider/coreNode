
// tslint:disable-next-line:no-namespace
//export namespace Repository.Contract {
    export interface IRepository<T> {
      Get(): T[];
      GetSingle(id?: number): T;
      Add(entity: T): T;
      Update(entity: T): T;
      Delete(id: number): boolean;
      Count(): number;
    }
//}
