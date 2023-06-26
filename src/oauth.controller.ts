import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { EncryptService } from 'src/encrypt.service';
import { OAuthParamDTO } from 'src/oauth-param.dto';
import { OAuthRunnerService
 } from 'src/oauth.service';
import { OAuthCallbackQuery, OAuthTokenPayload } from 'src/oauth.types';

@Controller()
export class OAuthController {

  
@Get('login/:provider')
    login(@Param() {provider}: OAuthParamDTO, @Query() { codeChallenge }, @Res() res: Response): void {
    const url = OAuthRunnerService.login(provider, codeChallenge);    
    res.redirect(url);
}

@Get('callback/:provider')
    async callback(@Param() {provider}: OAuthParamDTO, @Query() query: OAuthCallbackQuery, @Res() res: Response): Promise<void> {
    if (query?.error_description) {
        res.redirect(`${process.env.FRONTEND_URL}/?error=${query.error_description}&state=${query.state}&provider=${provider}`);
        return
    }
    
    const code = await EncryptService.DigestSHA256(query.code);
    
        
    res.redirect(`${process.env.FRONTEND_URL}/?code=${code}&state=${query.state}&provider=${provider}`);
    
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
