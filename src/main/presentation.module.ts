import { Module } from '@nestjs/common';
import { ExchangeRateController } from 'src/presentation/http/controller/exchange.rate.controller';
import { TokenController } from 'src/presentation/http/controller/token.controller';
import { SwaggerConfig } from 'src/presentation/http/swagger/swagger.config';
import { AuthzModule } from './authz.module';
import { CoreModule } from './core.module';

@Module({
  imports: [CoreModule, AuthzModule],
  providers: [SwaggerConfig],
  controllers: [TokenController, ExchangeRateController],
})
export class PresentationModule {}
