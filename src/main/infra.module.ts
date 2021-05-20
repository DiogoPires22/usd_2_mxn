import { CacheModule } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common';
import { HttpModule, HttpService, Module } from '@nestjs/common';
import BanxicoService from 'src/infra/adapters/banxico/banxico.service';
import DiarioFederationService from 'src/infra/adapters/diarioFederacion/diario.service';
import FixerService from 'src/infra/adapters/fixer/fixer.service';

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
      provide: 'Providers',
      useFactory: (banxico, diario, fixer) => [banxico, diario, fixer],
      inject: [BanxicoService, DiarioFederationService, FixerService],
    },
  ],
  exports: [BanxicoService, DiarioFederationService, FixerService, 'Providers'],
})
export class InfraModule {}
