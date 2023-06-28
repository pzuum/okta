
import { BadRequestException, Injectable } from "@nestjs/common";
import { EncryptService } from "src/encrypt.service";
import { AuthService, OAuthPayload } from "src/oauth.types";
import { OktaOAuthURIService } from "src/okta-oauth-URI.service";
import { staticImplements } from "src/static-implements";

@staticImplements<AuthService>()
export class OktaOAuthService {
    static login(loginPayload: OAuthPayload, codeChallenge: string, state: string) {
        if (loginPayload) {
            return OktaOAuthURIService.login(loginPayload, codeChallenge, state);            
        }

        throw new BadRequestException('No payload provided');
    };


    
    static callbackAndEncrypt(code?: string) {
        
        return EncryptService.DigestSHA256(code);
    }

    

    static getOAuthConfig() {        
        return {
            clientID: process.env.OKTA_CLIENT_ID,
            clientSecret: process.env.OKTA_CLIENT_SECRET,
            redirectURI: process.env.OKTA_REDIRECT_URI,
            authProviderURI: process.env.OKTA_AUTH_PROVIDER_URI,
            tokenURI: process.env.OKTA_AUTH_TOKEN_URI,
            userInfoURI: `${process.env.OKTA_BASE_URI}/oauth2/v1/userinfo`
        }
    }

    static logout() {
        console.log('logout');
    }

    static async token(code: string, code_verifier: string): Promise<string> {
        const config = this.getOAuthConfig();
        console.log({code, code_verifier})
        const data = await OktaOAuthURIService.getToken({code, code_verifier, ...config});
        const userInfo  = await OktaOAuthURIService.getUserInfo(config.userInfoURI, data.access_token);
        return userInfo;

 
    }


    
    

}


