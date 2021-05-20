import { Controller, Get, Inject } from '@nestjs/common';
import BanxicoService from '../../../infra/adapters/banxico/banxico.service';

@Controller()
export class AppController {
  constructor(private readonly banxicoService: BanxicoService) {}

  @Get()
  async getHello() {
    return await this.banxicoService.getExchangeRate();
  }
}
