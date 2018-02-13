"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_clientModel_1 = require("../models/api-clientModel");
class ClientConfig {
    /**
     * GetClients
     */
    GetClients() {
        const tradebotClient = new api_clientModel_1.apiClients.APIClientModel();
        tradebotClient.Active = true;
        tradebotClient.ClientId = "tradebot_client";
        tradebotClient.ClientSecret = "maestro";
        tradebotClient.Id = 1;
        tradebotClient.OriginatingUrl = "http://localhost:4200";
        tradebotClient.RedirectUrls = ["http://localhost:4200/", "http://localhost:4200/login"];
        tradebotClient.CreatedAt = new Date();
        tradebotClient.UpdatedAt = new Date();
        return this.clientList = [
            tradebotClient,
        ];
    }
}
exports.default = ClientConfig;
exports.clientConfig = new ClientConfig().GetClients();
