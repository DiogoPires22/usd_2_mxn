import { ExchangeRateResponse } from 'src/presentation/http/dto/response/exchange.rate.response';

export interface GetExchangeRatePort {
  execute(): Promise<ExchangeRateResponse>;
}

export namespace GetExchangeRatePort {
  export const TOKEN = 'GetExchangeRatePort';
}
