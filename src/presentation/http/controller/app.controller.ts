import { Controller, Get, Inject } from '@nestjs/common';
import ExchangeRateService from 'src/core/ports/services/exchange.rate.service';

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
    return result.reduce((sum, item) => {
      // console.log('----', sum);
      if (item.status === 'rejected') return sum;
      console.log('xxxx', item);
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
