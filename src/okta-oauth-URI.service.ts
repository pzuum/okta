import { OAuthPayload } from "src/oauth.types";

export class OktaOAuthURIService {
    static run = (loginPayload: OAuthPayload ): string => {
        

        const url = new URL(loginPayload?.authProviderURI);
        url.searchParams.append('client_id', loginPayload?.clientID);
        url.searchParams.append('response_type', 'code');
        url.searchParams.append('response_mode', 'query');
        url.searchParams.append('scope', 'openid profile');
        return url.toString()
    };
}