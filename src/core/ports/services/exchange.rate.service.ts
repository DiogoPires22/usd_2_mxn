import Rate from 'src/core/domain/rate';

export default interface ExchangeRateService {
  getExchangeRate(): Promise<Rate>;
}
