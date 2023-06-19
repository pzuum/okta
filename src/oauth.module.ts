import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthRunnerService } from 'src/oauth.service';
import { OktaOAuthService } from 'src/okta-oauth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
        ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
  ],
  controllers: [OAuthController],
  providers: [
    OAuthRunnerService,
    OktaOAuthService
  ],
})
export class AppModule {}
