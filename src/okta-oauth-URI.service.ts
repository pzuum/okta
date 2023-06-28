import { log } from "console";
import { OAuthPayload, OAuthTokenResponse } from "src/oauth.types";

export class OktaOAuthURIService {
    static login = (loginPayload: OAuthPayload, codeChallenge: string, state: string ): string => {
        

        const url = new URL(loginPayload?.authProviderURI);
        
        url.searchParams.append('client_id', loginPayload?.clientID);
        url.searchParams.append('response_type', 'code');
        url.searchParams.append('response_mode', 'query');
        url.searchParams.append('scope', 'openid profile email');
        url.searchParams.append('code_challenge', codeChallenge);
        url.searchParams.append('redirect_uri', loginPayload?.redirectURI);
        url.searchParams.append('state', state);
        url.searchParams.append('code_challenge_method', 'S256');
        return url.toString()
    };

    

    private static createTokenUrl = (loginPayload: OAuthPayload ): string => {
        const url = new URL(loginPayload?.tokenURI);
        url.searchParams.append('code_verifier', loginPayload?.code_verifier)
        url.searchParams.append('grant_type', 'authorization_code');
        url.searchParams.append('code', loginPayload?.code);
        url.searchParams.append('redirect_uri', loginPayload?.redirectURI);
        url.searchParams.append('client_id', loginPayload?.clientID);
        url.searchParams.append('client_secret', loginPayload?.clientSecret);
        
        return url.toString()
    }

    private static createUserInfoUrl = (userInfoURI: string, token: string): string => {
        console.log(userInfoURI)
        const url = new URL(userInfoURI);
        
        return url.toString()
    }

    static getToken = async (loginPayload: OAuthPayload): Promise<OAuthTokenResponse> => {
        const url = this.createTokenUrl(loginPayload);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        })
        const data = await response.json();
        console.log(data)
        return data
    }

    static getUserInfo = async (userInfoURI: string, token: string): Promise<any> => {
        const url = this.createUserInfoUrl(userInfoURI, token);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        

        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            return data
        }


        
    }


}