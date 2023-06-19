import { Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { OAuthParamDTO } from 'src/oauth-param.dto';
import { OAuthRunnerService
 } from 'src/oauth.service';

@Controller()
export class OAuthController {

  
  @Get('login/:provider')
  login(@Param() {provider}: OAuthParamDTO, @Res() res: Response): void {
    return OAuthRunnerService.login(provider, res);
}

  @Get('callback/:provider')
    callback(@Param() {provider}: OAuthParamDTO, @Query('code') code: string): void {
    return OAuthRunnerService.callback(provider, code);
}

    @Get('logout/:provider')
    logout(@Param() {provider}: OAuthParamDTO): void {
    return OAuthRunnerService.logout(provider);
}




}
