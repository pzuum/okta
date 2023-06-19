import { Response } from "express";
import { OauthResolver } from "src/oauth-resolver";
import { OAuthProvider } from "src/oauth.types";


export class OAuthRunnerService  {
    static login(authProvider: OAuthProvider, res: Response ): void {
        const loginPayload = OauthResolver[authProvider]?.getOAuthConfig();
        OauthResolver[authProvider].login(loginPayload, res);
    }
    static callback(authProvider: OAuthProvider, code?: string): void {
        OauthResolver[authProvider]?.callback(code);
    }
    static logout(authProvider: OAuthProvider): void {
        OauthResolver[authProvider]?.logout();
    }
}