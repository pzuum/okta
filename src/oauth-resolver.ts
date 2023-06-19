import { OAuthProvidersEnum, OAuthResolverInterface } from "src/oauth.types";
import { OktaOAuthService } from "src/okta-oauth.service";

export const OauthResolver = {
    [OAuthProvidersEnum.Okta]:  OktaOAuthService,
}

