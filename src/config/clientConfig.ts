import { apiClients } from "../models/api-clientModel";
export default class ClientConfig {
private clientList: apiClients.APIClientModel[];
 /**
  * GetClients
  */
 public GetClients(): apiClients.APIClientModel[] {
     const tradebotClient  = new apiClients.APIClientModel();
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

export const clientConfig = new ClientConfig().GetClients();
