import { BaseModel } from "./baseModel";
import {AppEnums} from "./enums";

export class LoggerModel extends BaseModel {
    private message: string;
    public get Message(): string {
        return this.message;
    }
    public set Message(v: string) {
        this.message = v;
    }

private type: AppEnums.LogType ;
public get Type(): AppEnums.LogType {
    return this.type;
}
public set Type(v: AppEnums.LogType) {
    this.type = v;
}

    /**
     *
     */
    constructor() {
        super();
        this.type = AppEnums.LogType.Info;
    }
}

export const loggerModel = new LoggerModel();
