
import { IBaseModel } from "./IBaseModel";

export class BaseModel
{
   
   private _instance : BaseModel;
   public get Instance() : BaseModel {
       return this._instance;
   }
   public set Instance(v : BaseModel) {
       this._instance = v;
   }
   
    private _entity : IBaseModel;
    public get Entity() : IBaseModel {
        return this._entity;
    }
    public set Entity(v : IBaseModel) {
        this._entity = v;
    }
 /**
  *
  */
 constructor() {
     if(!this._entity)
     {
        this._entity.Active = true;
        this._entity.CreatedAt = new Date();
        this._entity.Deleted = false;
        this._entity.UpdatedAt = new Date();
     }
     this._instance._entity= this._entity;
     return this.Instance;
 }
}