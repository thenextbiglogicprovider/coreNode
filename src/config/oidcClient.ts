export default class CurrentClient {
    private clientId: string;
    public get ClientId(): string {
        return this.clientId;
    }
    public set ClientId(v: string) {
        this.clientId = v;
    }

    private callbackUrl: string;
    public get CallbackUrl(): string {
        return this.callbackUrl;
    }
    public set CallbackUrl(v: string) {
        this.callbackUrl = v;
    }

    private returnUrl: string;
    public get ReturnUrl(): string {
        return this.returnUrl;
    }
    public set ReturnUrl(v: string) {
        this.returnUrl = v;
    }
}
