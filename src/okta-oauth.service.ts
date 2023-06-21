
import { BadRequestException, Injectable } from "@nestjs/common";
import { Response } from "express";
import { AuthService, OAuthPayload } from "src/oauth.types";
import { OktaOAuthURIService } from "src/okta-oauth-URI.service";
import { staticImplements } from "src/static-implements";

@staticImplements<AuthService>()
export class OktaOAuthService {
    static login(loginPayload: OAuthPayload, res: Response) {
        if (loginPayload) {
            const url = OktaOAuthURIService.createUrl(loginPayload);            
            res.redirect(url);
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


