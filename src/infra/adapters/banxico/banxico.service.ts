import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import Rate from 'src/core/domain/rate';
import ExchangeRateService from 'src/core/ports/services/exchange.rate.service';
import IntegrationError from 'src/core/error/integration.error';

//
const BANXICO_CACHE_KEY = 'banxico';
@Injectable()
export default class BanxicoService implements ExchangeRateService {
  constructor(
    private readonly httpService: HttpService,
    private cacheManager: Cache,
    private token: string = process.env.BANXICO_API_KEY,
  ) {}
  async getExchangeRate(): Promise<Rate> {
    try {
      const localRate = await this.getLocal();

      if (localRate) return localRate;

      const remoteRate = await this.getRemote();
      this.cacheManager.set(BANXICO_CACHE_KEY, remoteRate);

      return remoteRate;
    } catch (e) {
      console.error('Banxico Integration Error');
      console.error(e.message);
      throw new IntegrationError('Banxico Integration');
    }
  }

  private async getRemote(): Promise<Rate> {
    const result = await this.httpService
      .get(
        `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=${this.token}`,
      )
      .toPromise();
    if (
      result.data &&
      result.data.bmx.series.length > 0 &&
      result.data.bmx.series[0].datos.length > 0
    ) {
      const datos = result.data.bmx.series[0].datos[0];
      const dateString = datos.fecha;
      return new Rate('banxico', datos.dato, this.convertDate(dateString));
    }
  }
  private async getLocal(): Promise<Rate> {
    try {
      return this.cacheManager.get<Rate>(BANXICO_CACHE_KEY);
    } catch (ex) {
      console.log('Failed to retrieve local cache:', ex.message);
      return null;
    }
  }
  private convertDate(dateString: string): Date {
    const dateParts = dateString.split('/');
    return new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0]);
  }
}
