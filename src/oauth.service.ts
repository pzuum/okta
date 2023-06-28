import { OauthResolver } from "src/oauth-resolver";
import { OAuthProvider, CallbackResponse } from "src/oauth.types";


export class OAuthRunnerService  {
    static login(authProvider: OAuthProvider, codeChallenge: string, state:string ): string {
        const loginPayload = OauthResolver[authProvider]?.getOAuthConfig();
        return OauthResolver[authProvider].login(loginPayload, codeChallenge, state);
    }
    

    static callbackAndEncrypt(authProvider: OAuthProvider, code?: string): CallbackResponse  {
        return OauthResolver[authProvider]?.callbackAndEncrypt(code);
    }

    

    static logout(authProvider: OAuthProvider): void {
        OauthResolver[authProvider]?.logout();
    }

    static async  token(authProvider: OAuthProvider, authorizationCode: string, code_verifier: string): Promise<string> {
        return OauthResolver[authProvider]?.token(authorizationCode, code_verifier);
        
    }

}