import { Response } from 'express';
export enum OAuthProvidersEnum {
  Okta = 'Okta',
//   Google = 'Google',
//   Microsoft = 'Microsoft',
//   Apple = 'Apple',
//   LDAP = 'LDAP',
}

export type OAuthProvider = `${OAuthProvidersEnum}`

export type LoginResponse = {
    accessToken: string;
}

export type OAuthPayload = Record<string, string> &  {
    redirectURI: string;
    clientID: string;
    authProviderURI: string;
    tokenURI: string;
    code_verifier?: string;
    userInfoURI: string;
}

export type OAuthAuthorizeQuery = {
    codeChallenge: string;
    state: string;
    code: string;
}

export type OAuthTokenPayload = {
    codeVerifier: string;
    authorizationCode: string;
    scope: string
    expires_in: number;
    token_type: string;

}

export type OAuthTokenResponse = {
    access_token: string;
    id_token: string;
}

export type OAuthCallbackQuery = {
    code?: string;
    state?: string;
    error_description?: string;
}



export type OAuthQueryPKCE = {
    code: string;
}

export type CallbackResponse = Promise<string> | string;


export interface AuthService {
    login(loginPayload: OAuthPayload, code: string, state: string): string;
    getOAuthConfig(): OAuthPayload;
    logout?(): void;
    token?(code: string, code_verifier: string): Promise<string>;
    callbackAndEncrypt?(code?: string): CallbackResponse;
}







export interface OAuthResolverInterface extends Record<OAuthProvidersEnum.Okta, AuthService> {}







