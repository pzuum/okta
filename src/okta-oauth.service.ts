
import { BadRequestException, Injectable } from "@nestjs/common";
import { Response } from "express";
import { AuthService, OAuthPayload } from "src/oauth.types";
import { staticImplements } from "src/static-implements";

@staticImplements<AuthService>()
export class OktaOAuthService {
    static login(loginPayload: OAuthPayload, res: Response) {
        if (loginPayload) {
            res.redirect(loginPayload?.authProviderURI +
                `client_id=${loginPayload?.clientID}&` +
                'response_type=code&' +
                'response_mode=query&' +
                'scope=openid%20profile&' +
                `redirect_uri=${loginPayload?.redirectURI}&`);
        }

        throw new BadRequestException('No payload provided');
    };


    static callback(code?: string) {
        if (!code) {
            throw new BadRequestException('No code provided');
        }
        

    }

    static getOAuthConfig() {
        
        return {
            clientID: process.env.OKTA_CLIENT_ID,
            clientSecret: process.env.OKTA_CLIENT_SECRET,
            redirectURI: process.env.OKTA_REDIRECT_URI,
            authProviderURI: process.env.OKTA_AUTH_PROVIDER_URI,
        }
    }

    static logout() {
        console.log('logout');
    }

    
    

}


