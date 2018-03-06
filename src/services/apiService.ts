import * as httpClient from "http";

export default class ApiService {
    /**
     * Get
     */
    public Get(url: string) {
        return httpClient.get({});
    }
}
