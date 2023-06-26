import OktaAuth, {crypto} from "@okta/okta-auth-js";
import { OAuthPayload } from "src/oauth.types";
import { createHash } from "crypto";

export class OktaOAuthURIService {
    static login = (loginPayload: OAuthPayload, codeChallenge: string ): string => {
        

        const url = new URL(loginPayload?.authProviderURI);
        
        url.searchParams.append('client_id', loginPayload?.clientID);
        url.searchParams.append('response_type', 'code');
        url.searchParams.append('response_mode', 'query');
        url.searchParams.append('scope', 'openid profile');
        url.searchParams.append('code_challenge', codeChallenge);
        url.searchParams.append('redirect_uri', loginPayload?.redirectURI);
        
        url.searchParams.append('code_challenge_method', 'S256');
        return url.toString()
    };

    

    static createTokenUrl = (loginPayload: OAuthPayload ): string => {
        const url = new URL(loginPayload?.tokenURI);
        url.searchParams.append('code_verifier', loginPayload?.code_verifier)
        url.searchParams.append('grant_type', 'authorization_code');
        url.searchParams.append('code', loginPayload?.code);
        url.searchParams.append('redirect_uri', loginPayload?.redirectURI);
        url.searchParams.append('client_id', loginPayload?.clientID);
        url.searchParams.append('client_secret', loginPayload?.clientSecret);
        
        return url.toString()
    }

    static getToken = async (loginPayload: OAuthPayload ): Promise<unknown> => {
        const url = OktaOAuthURIService.createTokenUrl(loginPayload);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        })
        const data = await response.json();
        return data
    }
}