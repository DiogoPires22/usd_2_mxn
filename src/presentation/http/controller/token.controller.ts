import { Post } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Body, Controller, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetTokenUseCasePort } from 'src/core/ports/usecases/get.token.usecase.port';
import { GetTokenRequest } from '../dto/get.token.request';
import { GetTokenResponse } from '../dto/response/get.token.response';
import { ErrorDTO } from '../dto/response/error.dto';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('')
export class TokenController {
  constructor(
    @Inject(GetTokenUseCasePort.TOKEN)
    private readonly getToken: GetTokenUseCasePort,
  ) {}

  @Post('/token')
  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: GetTokenResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorDTO })
  @ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, type: ErrorDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorDTO,
  })
  async token(@Body() body: GetTokenRequest): Promise<GetTokenResponse> {
    const accessToken = await this.getToken.execute(
      body.client_id,
      body.client_secret,
    );

    const response = GetTokenResponse.create(accessToken);
    return response;
  }
}
