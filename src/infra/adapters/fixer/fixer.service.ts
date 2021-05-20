import { Cache } from 'cache-manager';
import { HttpService, Injectable } from '@nestjs/common';
import Rate from 'src/core/domain/rate';
import ExchangeRateService from 'src/core/ports/services/exchange.rate.service';
import IntegrationError from 'src/core/error/integration.error';
import moment from 'moment';

const FIXER_CACHE_KEY = 'fixer';
@Injectable()
export default class FixerService implements ExchangeRateService {
  constructor(
    private readonly httpService: HttpService,
    private cacheManager: Cache,
    private readonly token: string = process.env.FIXER_TOKEN,
  ) {}
  async getExchangeRate(): Promise<Rate> {
    try {
      const localRate = await this.getLocal();

      if (localRate) return localRate;

      const remoteRate = await this.getRemote();
      this.cacheManager.set(FIXER_CACHE_KEY, remoteRate);

      return remoteRate;
    } catch (e) {
      console.error('Fixer Integration Error');
      throw new IntegrationError('Fixer Integration');
    }
  }

  private async getRemote(): Promise<Rate> {
    const result = await this.httpService
      .get(
        `http://data.fixer.io/api/latest?symbols=USD,MXN&format=1&access_key=${this.token}`,
      )
      .toPromise();

    if (result.data && result.data.success) {
      const date = result.data.timestamp;
      const { USD, MXN } = result.data.rates;
      const value = parseFloat((MXN / USD).toFixed(4));

      return new Rate('fixer', value, new Date(date * 1000));
    }
  }
  private async getLocal(): Promise<Rate> {
    try {
      return this.cacheManager.get<Rate>(FIXER_CACHE_KEY);
    } catch (ex) {
      console.log('Failed to retrieve local cache:', ex.message);
      return null;
    }
  }
}
