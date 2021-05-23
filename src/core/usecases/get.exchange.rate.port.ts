import { ExchangeRateResponse } from 'src/presentation/http/dto/response/exchange.rate.response';
import ExchangeRateService from '../ports/services/exchange.rate.service';
import { GetExchangeRatePort } from '../ports/usecases/get.exchange.rate.port';

export default class GetExchangeRate implements GetExchangeRatePort {
  constructor(private readonly providers: Array<ExchangeRateService>) {}
  async execute(): Promise<ExchangeRateResponse> {
    const result = await Promise.allSettled(
      this.providers.map((p) => p.getExchangeRate()),
    );
    return result.reduce<ExchangeRateResponse>((sum, item) => {
      if (item.status === 'rejected') return sum;
      console.log('xxxx', item);
      return {
        ...sum,
        [item.value.provider]: {
          value: item.value.value,
          last_updated: item.value.lastUpdated,
        },
      };
    }, new ExchangeRateResponse());
  }
}
