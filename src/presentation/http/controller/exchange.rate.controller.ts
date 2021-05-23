import { UseGuards } from '@nestjs/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { GetExchangeRatePort } from 'src/core/ports/usecases/get.exchange.rate.port';
import { AuthGuard } from '@nestjs/passport';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiHeaders,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { ErrorDTO } from '../dto/response/error.dto';
import { ExchangeRateResponseDTO } from '../dto/response/exchange.rate.response.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ThrottleStrategy } from '../strategies/throttleStrategy';

@Controller('api/v1')
@ApiBearerAuth()
export class ExchangeRateController {
  constructor(
    @Inject(GetExchangeRatePort.TOKEN)
    private readonly getExchangeRate: GetExchangeRatePort,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(ThrottleStrategy)
  @Throttle(5, 60)
  @Get('rate')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ExchangeRateResponseDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: ErrorDTO,
  })
  async get() {
    return await this.getExchangeRate.execute();
  }
}
