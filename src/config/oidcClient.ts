import {
    OidcClientSettings,
    StateStore,
    UserManager,
    WebStorageStateStore,
    WebStorageStateStoreSettings,
} from "oidc-client";
import CustomWebStoreStorage from "./customWebStoreStorage";
import Global from "./oidc-node-client-settings";
const settings: WebStorageStateStoreSettings = {
    prefix: "core-node-app",
    store: Global.sessionStorage,
};

const oidcClientSettings: OidcClientSettings = {
    stateStore : new WebStorageStateStore(settings),
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

export const oidcClient = new UserManager(config);
