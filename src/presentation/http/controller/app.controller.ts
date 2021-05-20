import { Controller, Get, Inject } from '@nestjs/common';
import Rate from 'src/core/domain/rate';
import ExchangeRateService from 'src/core/ports/services/exchange.rate.service';
import DiarioFederationService from 'src/infra/adapters/diarioFederacion/diario.service';
import BanxicoService from '../../../infra/adapters/banxico/banxico.service';

@Controller()
export class AppController {
  constructor(
    @Inject('Providers') private readonly providers: Array<ExchangeRateService>,
  ) {}

  @Get()
  async getHello() {
    const result = await Promise.allSettled(
      this.providers.map((p) => p.getExchangeRate()),
    );

    console.log(result);

    return result.reduce((sum, item) => {
      console.log('----', sum);
      if (item.status === 'rejected') return null;
      return {
        ...sum,
        [item.value.provider]: {
          value: item.value.value,
          last_updated: item.value.lastUpdated,
        },
      };
    }, []);

    return result;
  }
}
