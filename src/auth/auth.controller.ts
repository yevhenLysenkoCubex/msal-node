import { Controller, Get, Post, Query, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { MicrosoftService } from './microsoft.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly microsoftService: MicrosoftService,
  ) {}

  @Post('ms-login')
  async login() {
    return await this.microsoftService.getAuthUrl();
  }

  @Get('ms-redirect/callback')
  async redirect(@Query('code') code: string, @Res() res: Response) {
    const tokenResponse = await this.microsoftService.getTokenByCode(code);

    console.log('tokenResponse', tokenResponse);

    if (tokenResponse) {
      res.redirect('http://localhost:5173');
    }
  }
}
