import { IsEnum } from 'class-validator';
import { OAuthProvider, OAuthProvidersEnum } from "src/oauth.types";

export class OAuthParamDTO  {
    @IsEnum(OAuthProvidersEnum)
    provider: OAuthProvider;
}