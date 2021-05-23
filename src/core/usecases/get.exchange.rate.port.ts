import ExchangeRateService from '../ports/services/exchange.rate.service';
import { GetExchangeRatePort } from '../ports/usecases/get.exchange.rate.port';

export default class GetExchangeRate implements GetExchangeRatePort {
  constructor(private readonly providers: Array<ExchangeRateService>) {}
  async execute(): Promise<any[]> {
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
