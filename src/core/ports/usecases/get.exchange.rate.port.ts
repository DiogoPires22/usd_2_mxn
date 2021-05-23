import Rate from 'src/core/domain/rate';

export interface GetExchangeRatePort {
  execute(): Promise<Array<Rate>>;
}

export namespace GetExchangeRatePort {
  export const TOKEN = 'GetExchangeRatePort';
}
