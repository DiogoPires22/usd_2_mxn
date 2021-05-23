import { CacheModule } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common';
import { HttpModule, HttpService, Module } from '@nestjs/common';
import Auth0Service from 'src/infra/adapters/auth0/auth0.service';
import BanxicoService from 'src/infra/adapters/banxico/banxico.service';
import DiarioFederationService from 'src/infra/adapters/diarioFederacion/diario.service';
import FixerService from 'src/infra/adapters/fixer/fixer.service';
import { AuthenticationServicePort } from 'src/core/ports/services/authentication.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 86400,
    }),
  ],
  providers: [
    {
      provide: BanxicoService,
      useFactory: (http, cache) => new BanxicoService(http, cache),
      inject: [HttpService, CACHE_MANAGER],
    },
    {
      provide: DiarioFederationService,
      useFactory: (cache) => new DiarioFederationService(cache),
      inject: [CACHE_MANAGER],
    },
    {
      provide: FixerService,
      useFactory: (http, cache) => new FixerService(http, cache),
      inject: [HttpService, CACHE_MANAGER],
    },
    {
      provide: AuthenticationServicePort.TOKEN,
      useFactory: (http) => new Auth0Service(http, process.env.AUDIENCE_URL),
      inject: [HttpService],
    },
    {
      provide: 'Providers',
      useFactory: (banxico, diario, fixer) => [banxico, diario, fixer],
      inject: [BanxicoService, DiarioFederationService, FixerService],
    },
  ],
  exports: [
    BanxicoService,
    DiarioFederationService,
    FixerService,
    'Providers',
    AuthenticationServicePort.TOKEN,
  ],
})
export class InfraModule {}
