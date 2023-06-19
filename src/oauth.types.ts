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
}


export interface AuthService {
    login(loginPayload: OAuthPayload, res: Response): void;
    callback(code?: string): void;
    getOAuthConfig(): OAuthPayload;
    logout?(): void;
}







export interface OAuthResolverInterface extends Record<OAuthProvidersEnum.Okta, AuthService> {}







