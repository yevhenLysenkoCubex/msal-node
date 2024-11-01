import { Injectable } from '@nestjs/common';
import * as msal from '@azure/msal-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MicrosoftService {
  private readonly msalInstance: msal.ConfidentialClientApplication;
  private readonly redirectUri: string;
  private readonly scopes: string[];

  constructor(private configService: ConfigService) {
    this.redirectUri = this.configService.get<string>(
      'AZURE_MICROSOFT_REDIRECT_URI',
    )!;
    // this.scopes = ['User.Read'];
    this.scopes = ['https://graph.microsoft.com/.default'];

    this.msalInstance = new msal.ConfidentialClientApplication({
      auth: {
        clientId: this.configService.get<string>('AZURE_MICROSOFT_CLIENT_ID')!,
        authority: `https://login.microsoftonline.com/${this.configService.get<string>('AZURE_MICROSOFT_TENANT_ID')!}`,
        clientSecret: this.configService.get<string>(
          'AZURE_MICROSOFT_CLIENT_SECRET_VALUE',
        )!,
      },
      system: {
        // loggerOptions: {
        //   loggerCallback(loglevel, message, containsPii) {
        //     console.log('loglevel', loglevel);
        //     console.log('containsPii', containsPii);
        //     console.log('message', message);
        //   },
        //   piiLoggingEnabled: false,
        //   logLevel: 3,
        // },
      },
    });
  }

  async getAuthUrl(): Promise<string> {
    const authCodeUrlParameters = {
      scopes: this.scopes,
      redirectUri: this.redirectUri,
    };

    return this.msalInstance.getAuthCodeUrl(authCodeUrlParameters);
  }

  async getTokenByCode(code: string) {
    const tokenRequest: msal.AuthorizationCodeRequest = {
      code,
      scopes: this.scopes,
      redirectUri: this.redirectUri,
    };

    return await this.msalInstance.acquireTokenByCode(tokenRequest);
  }
}
