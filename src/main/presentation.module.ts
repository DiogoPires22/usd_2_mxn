import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ExchangeRateController } from 'src/presentation/http/controller/exchange.rate.controller';
import { TokenController } from 'src/presentation/http/controller/token.controller';
import { SwaggerConfig } from 'src/presentation/http/swagger/swagger.config';
import { AuthzModule } from './authz.module';
import { CoreModule } from './core.module';

@Module({
  imports: [
    CoreModule,
    AuthzModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  providers: [SwaggerConfig],
  controllers: [TokenController, ExchangeRateController],
})
export class PresentationModule {}
