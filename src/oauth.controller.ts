import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { EncryptService } from 'src/encrypt.service';
import { OAuthParamDTO } from 'src/oauth-param.dto';
import { OAuthRunnerService
 } from 'src/oauth.service';
import { OAuthAuthorizeQuery, OAuthCallbackQuery, OAuthTokenPayload } from 'src/oauth.types';

@Controller()
export class OAuthController {

  
@Get('login/:provider')
    login(@Param() {provider}: OAuthParamDTO, @Query() {codeChallenge, state}: OAuthAuthorizeQuery, @Res() res: Response): void {
    const url = OAuthRunnerService.login(provider, codeChallenge, state);
    res.redirect(url);
}



@Get('logout/:provider')
    logout(@Param() {provider}: OAuthParamDTO): void {
    return OAuthRunnerService.logout(provider);
}



@Post('token/:provider')
    token(@Param() {provider}: OAuthParamDTO, @Body() payload: OAuthTokenPayload, @Res() res: Response): void {
    res.json(OAuthRunnerService.token(provider, payload.authorizationCode, payload.codeVerifier)).status(200);   
}



}
