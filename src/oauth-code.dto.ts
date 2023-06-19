import { IsString } from "class-validator";

export class OAuthCodeDTO {
    @IsString()
    code: string;
}