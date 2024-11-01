import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MicrosoftStrategy } from './strategies/microsoft.strategy';
import { MicrosoftService } from './microsoft.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, MicrosoftStrategy, MicrosoftService],
  exports: [AuthService],
})
export class AuthModule {}
