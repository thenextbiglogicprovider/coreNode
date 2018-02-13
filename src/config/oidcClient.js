"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oidc_client_1 = require("oidc-client");
const oidc_node_client_settings_1 = require("./oidc-node-client-settings");
const settings = {
    prefix: "core-node-app",
    store: oidc_node_client_settings_1.default.sessionStorage,
};
const oidcClientSettings = {
    stateStore: new oidc_client_1.WebStorageStateStore(settings),
};
const config = {
    authority: "http://localhost:5000",
    client_id: "Maestro_API_Client",
    redirect_uri: "http://localhost:3000/api/authenticate/login",
    response_type: "id_token token",
    scope: "openid profile api1",
    post_logout_redirect_uri: "http://localhost:3000/api/authenticate/logout",
    filterProtocolClaims: true,
    loadUserInfo: true,
    userStore: oidcClientSettings.stateStore,
};
exports.oidcClient = new oidc_client_1.UserManager(config);
