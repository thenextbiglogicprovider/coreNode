"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseModelModule = require("./baseModel");
const baseModel = baseModelModule.BaseModel;
// tslint:disable-next-line:no-namespace
var apiClients;
(function (apiClients) {
    class APIClientModel extends baseModel {
        get RedirectUrls() {
            return this.redirectUrls;
        }
        set RedirectUrls(v) {
            this.redirectUrls = v;
        }
        get OriginatingUrl() {
            return this.originatingUrl;
        }
        set OriginatingUrl(v) {
            this.originatingUrl = v;
        }
        get ClientSecret() {
            return this.clientSecret;
        }
        set ClientSecret(v) {
            this.clientSecret = v;
        }
        get ClientId() {
            return this.clientId;
        }
        set ClientId(v) {
            this.clientId = v;
        }
    }
    apiClients.APIClientModel = APIClientModel;
})(apiClients = exports.apiClients || (exports.apiClients = {}));
