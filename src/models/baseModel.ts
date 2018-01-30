
import { IBaseModel } from "./IBaseModel";

export class BaseModel implements IBaseModel {
    public CreatedAt: Date;
    public UpdatedAt: Date;
    public Id: number;
    public SessionId: string;
    public Active: boolean;
    public Deleted: boolean;

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
