import * as baseModelModule from "./baseModel";

const baseModel = baseModelModule.BaseModel;
// tslint:disable-next-line:no-namespace
export namespace apiClients {
    export class APIClientModel extends baseModel {

     private clientId: string;
     private clientSecret: string;
     private originatingUrl: string;

     private redirectUrls: string[];
     public get RedirectUrls(): string[] {
         return this.redirectUrls;
     }
     public set RedirectUrls(v: string[]) {
         this.redirectUrls = v;
     }

     public get OriginatingUrl(): string {
         return this.originatingUrl;
     }

     public set OriginatingUrl(v: string) {
         this.originatingUrl = v;
     }

     public get ClientSecret(): string {
         return this.clientSecret;
     }

     public set ClientSecret(v: string) {
         this.clientSecret = v;
     }

     public get ClientId(): string {
         return this.clientId;
     }

     public set ClientId(v: string) {
         this.clientId = v;
     }
    }
}
