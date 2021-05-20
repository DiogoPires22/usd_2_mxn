import { Injectable } from '@nestjs/common';
import Rate from 'src/core/domain/rate';
import ExchangeRateService from 'src/core/ports/services/exchange.rate.service';
import { Cache } from 'cache-manager';
import { scrape } from 'scrape-brrr';
import * as moment from 'moment';
import IntegrationError from 'src/core/error/integration.error';

const DIARIO_FEDERATION_CACHE_KEY = 'diarioFederation';
@Injectable()
export default class DiarioFederationService implements ExchangeRateService {
  constructor(private cacheManager: Cache) {}
  async getExchangeRate(): Promise<Rate> {
    try {
      const localRate = await this.getLocal();

      if (localRate) return localRate;
      const data = await scrape(
        'https://www.banxico.org.mx/tipcamb/tipCamMIAction.do',
        '.renglonTituloColumnas + tr td',
      );

      const remoteRate = this.prepareData(data);

      this.cacheManager.set(DIARIO_FEDERATION_CACHE_KEY, remoteRate);
      return remoteRate;
    } catch (e) {
      console.error('Diario Federation Integration Error');
      console.error(e.message);
      throw new IntegrationError('Diario Federation Integration');
    }
  }
  private prepareData(data: Array<string>): Rate {
    const date = moment(this.cleanValue(data[0]), 'DD/MM/yyyy').toDate();

    const value = parseFloat(this.cleanValue(data[2]));
    console.log('---------------------------', data);
    return new Rate('diarioFederation', value, date);
  }

  private cleanValue(value: string): string {
    return (value || '').trim().replace(/\\n/g, '');
  }
  private async getLocal(): Promise<Rate> {
    try {
      return this.cacheManager.get<Rate>(DIARIO_FEDERATION_CACHE_KEY);
    } catch (ex) {
      console.log('Failed to retrieve local cache:', ex.message);
      return null;
    }
  }
}
