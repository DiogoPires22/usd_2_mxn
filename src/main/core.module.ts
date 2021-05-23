import { Module } from '@nestjs/common';
import { AuthenticationServicePort } from 'src/core/ports/services/authentication.service';
import { GetExchangeRatePort } from 'src/core/ports/usecases/get.exchange.rate.port';
import { GetTokenUseCasePort } from 'src/core/ports/usecases/get.token.usecase.port';
import GetExchangeRate from 'src/core/usecases/get.exchange.rate.port';
import GetTokenUseCase from 'src/core/usecases/get.token.usecase';
import { InfraModule } from './infra.module';

@Module({
  imports: [InfraModule],
  providers: [
    {
      provide: GetTokenUseCasePort.TOKEN,
      useFactory: (authService) => new GetTokenUseCase(authService),
      inject: [AuthenticationServicePort.TOKEN],
    },
    {
      provide: GetExchangeRatePort.TOKEN,
      useFactory: (providers) => new GetExchangeRate(providers),
      inject: ['Providers'],
    },
  ],

  exports: [GetTokenUseCasePort.TOKEN, GetExchangeRatePort.TOKEN],
})
export class CoreModule {}
