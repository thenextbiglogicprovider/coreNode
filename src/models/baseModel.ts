
import { IBaseModel } from "./IBaseModel";

export class BaseModel implements IBaseModel {
    public CreatedAt: Date;
    public UpdatedAt: Date;
    public Id: number;
    public SessionId: string;
    public Active: boolean;
    public Deleted: boolean;

   private instance: BaseModel;
   public get Instance(): BaseModel {
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
