import { HttpService } from '@nestjs/common';
import Rate from 'src/core/domain/rate';
import ExchangeRateService from 'src/core/ports/services/exchange.rate.service';

export default class FixerService implements ExchangeRateService {
  constructor(private readonly httpService: HttpService) {}
  getExchangeRate(): Promise<Rate> {
    throw new Error('Method not implemented.');
  }
}
