import { CacheModule } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common';
import { HttpModule, HttpService, Module } from '@nestjs/common';
import BanxicoService from 'src/infra/adapters/banxico/banxico.service';

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
  ],
  exports: [BanxicoService],
})
export class InfraModule {}
