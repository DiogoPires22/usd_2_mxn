import { Post } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Body, Controller, Get, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetTokenUseCasePort } from 'src/core/ports/usecases/get.token.usecase.port';
import { GetTokenDTO } from '../dto/get.token.dto';
import { TokenResponseDTO } from '../dto/response/token.response.dto';
import { ErrorDTO } from '../dto/response/error.dto';

@Controller('')
export class TokenController {
  constructor(
    @Inject(GetTokenUseCasePort.TOKEN)
    private readonly getToken: GetTokenUseCasePort,
  ) {}

  @Post('/token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: TokenResponseDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorDTO,
  })
  async token(@Body() body: GetTokenDTO): Promise<TokenResponseDTO> {
    const accessToken = await this.getToken.execute(
      body.client_id,
      body.client_secret,
    );

    const response = TokenResponseDTO.create(accessToken);
    return response;
  }
}
