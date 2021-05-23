import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDTO {
  @ApiProperty()
  access_token: string;

  static create(accessToken: string): TokenResponseDTO {
    const t = new TokenResponseDTO();
    t.access_token = accessToken;
    return t;
  }
}
