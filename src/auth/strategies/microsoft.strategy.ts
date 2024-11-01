import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(
  BearerStrategy,
  'microsoft',
) {
  constructor(configService: ConfigService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${configService.get<string>('AZURE_MICROSOFT_TENANT_ID')!}`,
      clientID: configService.get<string>('AZURE_MICROSOFT_CLIENT_ID')!,
      validateIssuer: false,
      passReqToCallback: false,
      loggingLevel: 'info',
    });
  }
}
